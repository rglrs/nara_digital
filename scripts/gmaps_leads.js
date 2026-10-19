/**
 * NARA Dev - Google Maps Lead Scraper & Classifier
 * Author: NARA Dev Team
 * 
 * Usage:
 *   node scripts/gmaps_leads.js "catering surabaya"
 *   node scripts/gmaps_leads.js "dental care surabaya"
 *   node scripts/gmaps_leads.js "bengkel mobil surabaya"
 */

const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

function cleanText(str) {
  if (!str) return '';
  return str
    .replace(/[\uE000-\uF8FF]/g, '') // Hapus font glyphs aneh Google Maps
    .replace(/[·•]/g, ' - ')
    .replace(/[\r\n]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Auto-detect installed Chrome or Edge on Windows
const BROWSER_PATHS = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  process.env.CHROME_BIN,
  process.env.EDGE_BIN
].filter(Boolean);

function getExecutablePath() {
  for (const p of BROWSER_PATHS) {
    if (fs.existsSync(p)) return p;
  }
  throw new Error('Tidak ditemukan Google Chrome atau Microsoft Edge di komputer ini.');
}

function classifyWebsite(website) {
  if (!website || website === 'null' || website.trim() === '') {
    return {
      status: 'Tanpa Website',
      priority: '1 - TINGGI',
      badge: '🔴 Tanpa Website'
    };
  }

  const lower = website.toLowerCase();
  const lowTierDomains = [
    'blogspot.',
    'wordpress.com',
    'wixsite.com',
    'weebly.com',
    'linktr.ee',
    'taplink.cc',
    'carrd.co',
    'business.site',
    'sites.google.com',
    'drive.google.com',
    'instagram.com',
    'facebook.com',
    'tiktok.com'
  ];

  for (const dom of lowTierDomains) {
    if (lower.includes(dom)) {
      return {
        status: 'Perlu Perbaikan',
        priority: '2 - SEDANG',
        badge: '🟡 Perlu Upgrade (Link/Blog)'
      };
    }
  }

  return {
    status: 'Sudah Punya Website',
    priority: '3 - RENDAH',
    badge: '🟢 Sudah Ada Website'
  };
}

function formatWhatsApp(phone) {
  if (!phone || phone === '-') return { waNumber: '-', waLink: '-' };
  const clean = phone.replace(/[^0-9]/g, '');
  if (clean.startsWith('08')) {
    const formatted = `62${clean.slice(1)}`;
    return { waNumber: phone, waLink: `https://wa.me/${formatted}` };
  }
  if (clean.startsWith('628')) {
    return { waNumber: phone, waLink: `https://wa.me/${clean}` };
  }
  if (clean.startsWith('031') || clean.startsWith('31')) {
    return { waNumber: phone, waLink: 'Telepon Kantor (Bukan WA)' };
  }
  return { waNumber: phone, waLink: '-' };
}

function generatePitch(name, status, website) {
  if (status === 'Tanpa Website') {
    return `Halo Admin/Owner ${name}, salam kenal dari NARA Digital! Saya lihat ulasan dan reputasi ${name} di Google Maps sangat bagus, namun kami perhatikan belum ada website resmi untuk calon klien melihat pricelist & portfolio. Kami buatkan preview website modern khusus ${name} agar calon customer bisa langsung pesan via WhatsApp. Boleh kami kirimkan link demonya?`;
  }
  if (status === 'Perlu Perbaikan') {
    const platform = website.includes('blogspot') ? 'Blogspot' : (website.includes('linktr') || website.includes('taplink') ? 'Linktree' : 'website lama');
    return `Halo Admin/Owner ${name}, salam kenal dari NARA Digital! Reputasi ${name} di Google sudah sangat kuat. Kami perhatikan saat ini profilnya masih memakai ${platform}. Untuk meningkatkan kepercayaan klien premium, NARA Dev bisa bantu re-design menjadi website profesional ber-domain sendiri (.com / .id) dengan tampilan responsif & cepat di HP. Boleh kami kirimkan contoh demonya?`;
  }
  return `Halo Admin/Owner ${name}, ulasan di Google Maps sangat ramai. Kami dari NARA Digital Studio ingin menawarkan optimasi UI/UX & performa website agar konversi lead WhatsApp meningkat lebih tinggi.`;
}

function escapeCsv(val) {
  if (val === null || val === undefined) return '""';
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
}

async function scrapeLeads(query, options = {}) {
  const maxScrolls = options.maxScrolls || 6;
  const executablePath = getExecutablePath();
  
  console.log('='.repeat(65));
  console.log(`🚀 NARA DIGITAL - GOOGLE MAPS LEADS SCRAPER`);
  console.log(`🔍 Kata Kunci: "${query}"`);
  console.log(`🌐 Browser: ${path.basename(executablePath)}`);
  console.log('='.repeat(65));

  const browser = await puppeteer.launch({
    executablePath,
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled',
      '--lang=id-ID'
    ]
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    const searchUrl = `https://www.google.com/maps/search/${encodeURIComponent(query)}/@-7.2575,112.7521,12z?hl=id`;
    console.log(`\n⏳ Mengakses Google Maps...`);
    await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 35000 });

    console.log(`📜 Melakukan auto-scroll untuk memuat lebih banyak bisnis...`);
    await page.waitForSelector('div[role="feed"], div[role="main"]', { timeout: 15000 }).catch(() => {});

    // Scroll down multiple times
    await page.evaluate(async (scrollCount) => {
      const feed = document.querySelector('div[role="feed"]');
      if (feed) {
        for (let i = 0; i < scrollCount; i++) {
          feed.scrollTop = feed.scrollHeight;
          await new Promise(r => setTimeout(r, 1200));
        }
      }
    }, maxScrolls);

    // Extract raw listings
    const rawPlaces = await page.evaluate(() => {
      const links = document.querySelectorAll('a.hfpxzc');
      const items = [];

      links.forEach(link => {
        const name = link.getAttribute('aria-label');
        if (!name) return;

        const mapsUrl = link.getAttribute('href');
        const container = link.closest('div[role="article"]') || link.parentElement;
        const text = container ? container.innerText : '';
        const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

        // Rating
        const ratingMatch = text.match(/([1-5][,\.][0-9])/);
        const rating = ratingMatch ? ratingMatch[1].replace(',', '.') : '-';

        // Reviews
        const reviewsMatch = text.match(/\(([0-9.,]+)\)/);
        const reviews = reviewsMatch ? parseInt(reviewsMatch[1].replace(/\D/g, ''), 10) : 0;

        // Website extraction
        let website = null;
        if (container) {
          const allLinks = Array.from(container.querySelectorAll('a'));
          for (const a of allLinks) {
            const h = a.href || '';
            const label = a.getAttribute('aria-label') || '';
            const t = a.innerText || '';
            if (
              label.includes('Situs') || 
              label.includes('Website') || 
              t.includes('Situs') || 
              t.includes('Website')
            ) {
              if (h && !h.includes('google.com/maps')) {
                website = h;
                break;
              }
            }
          }
        }

        // Phone extraction (Indonesian patterns)
        const phoneMatch = text.match(/(\+62[0-9- ]{8,15}|08[0-9- ]{8,13}|031-[0-9]{6,8}|\(031\)[0-9- ]{6,8})/);
        const phone = phoneMatch ? phoneMatch[0].trim() : '-';

        // Address / snippet extraction
        let address = '-';
        for (const line of lines) {
          if (
            line.includes('Jl.') || 
            line.includes('Jalan') || 
            line.includes('Kec.') || 
            line.includes('Surabaya') || 
            line.includes('Sidoarjo')
          ) {
            address = line;
            break;
          }
        }

        items.push({
          name,
          rating,
          reviews,
          phone,
          website,
          address,
          mapsUrl
        });
      });

      return items;
    });

    // Deduplicate by name
    const seen = new Set();
    const places = [];
    for (const p of rawPlaces) {
      if (!seen.has(p.name)) {
        seen.add(p.name);
        places.push(p);
      }
    }

    console.log(`\n✅ Berhasil mengekstrak ${places.length} bisnis! Menganalisis status website...`);

    // Process and classify
    const enriched = places.map((p, index) => {
      const cls = classifyWebsite(p.website);
      const wa = formatWhatsApp(p.phone);
      const cleanBizName = cleanText(p.name);
      const cleanAddr = cleanText(p.address);
      const pitch = cleanText(generatePitch(cleanBizName, cls.status, p.website || ''));

      return {
        id: index + 1,
        name: cleanBizName,
        category: cls.badge,
        status: cls.status,
        priority: cls.priority,
        rating: p.rating,
        reviews: p.reviews,
        phone: wa.waNumber,
        waLink: wa.waLink,
        website: p.website || '-',
        address: cleanAddr,
        mapsUrl: p.mapsUrl,
        pitch
      };
    });

    // Sort: Priority 1 (Tanpa Website) first, then Priority 2 (Perlu Perbaikan), then Priority 3
    enriched.sort((a, b) => {
      if (a.priority !== b.priority) {
        return a.priority.localeCompare(b.priority);
      }
      return b.reviews - a.reviews; // Highest reviews first within same category
    });

    // Re-index
    enriched.forEach((item, idx) => item.id = idx + 1);

    // Summary counts
    const noWeb = enriched.filter(e => e.status === 'Tanpa Website');
    const needFix = enriched.filter(e => e.status === 'Perlu Perbaikan');
    const hasWeb = enriched.filter(e => e.status === 'Sudah Punya Website');

    console.log('\n' + '='.repeat(65));
    console.log(`📊 RINGKASAN PROSPEK KLIEN:`);
    console.log(`🔴 Tanpa Website (Prioritas #1 Emas)    : ${noWeb.length} bisnis`);
    console.log(`🟡 Perlu Perbaikan (Linktree/Blogspot)  : ${needFix.length} bisnis`);
    console.log(`🟢 Sudah Ada Website Resmi              : ${hasWeb.length} bisnis`);
    console.log(`📋 Total Prospek Siap Follow-up        : ${enriched.length} bisnis`);
    console.log('='.repeat(65));

    // Print Top 10 High Priority Leads
    console.log(`\n🎯 TOP LEADS TERBAIK UNTUK DITAWARI HARI INI:`);
    const topLeads = [...noWeb, ...needFix].slice(0, 10);
    topLeads.forEach(lead => {
      console.log(`\n[#${lead.id}] ${lead.category} -> ${lead.name}`);
      console.log(`    ⭐ Rating   : ${lead.rating} (${lead.reviews} ulasan)`);
      console.log(`    📞 Kontak   : ${lead.phone}`);
      console.log(`    💬 Link WA  : ${lead.waLink}`);
      console.log(`    🌐 Website  : ${lead.website}`);
      console.log(`    📍 Alamat   : ${lead.address}`);
    });

    const safeKeyword = query.toLowerCase().replace(/[^a-z0-9]+/g, '_');

    // 1. Export Native EXCEL (.xlsx)
    const excelData = [
      [
        'ID',
        'Nama Bisnis',
        'Kategori',
        'Status Website',
        'Prioritas',
        'Rating',
        'Jumlah Ulasan',
        'Nomor Kontak',
        'Direct WhatsApp',
        'Website Saat Ini',
        'Alamat',
        'Draft Chat WhatsApp (Pitch Hook)'
      ],
      ...enriched.map(r => [
        r.id,
        r.name,
        r.category,
        r.status,
        r.priority,
        parseFloat(r.rating) || '-',
        r.reviews,
        r.phone,
        r.waLink,
        r.website,
        r.address,
        r.pitch
      ])
    ];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(excelData);

    ws['!cols'] = [
      { wch: 6 },   // ID
      { wch: 32 },  // Nama Bisnis
      { wch: 22 },  // Kategori
      { wch: 18 },  // Status
      { wch: 14 },  // Prioritas
      { wch: 8 },   // Rating
      { wch: 12 },  // Ulasan
      { wch: 18 },  // Kontak
      { wch: 32 },  // Link WA
      { wch: 30 },  // Website
      { wch: 40 },  // Alamat
      { wch: 70 }   // Draft Chat
    ];

    XLSX.utils.book_append_sheet(wb, ws, 'Daftar Leads NARA');
    
    try {
      const xlsxFileName = `leads_${safeKeyword}.xlsx`;
      const defaultXlsxName = `leads.xlsx`;
      XLSX.writeFile(wb, xlsxFileName);
      XLSX.writeFile(wb, defaultXlsxName);
      console.log(`\n💾 FILE EXCEL DISIMPAN:`);
      console.log(`   ✨ [${defaultXlsxName}] & [${xlsxFileName}]`);
    } catch (e) {
      console.warn(`⚠️ Tidak dapat menulis file Excel (mungkin sedang dibuka di Excel).`);
    }

    // 2. Export CSV (pakai sep=; dan delimiter titik-koma agar Excel Windows tidak berantakan)
    const csvHeader = [
      'ID',
      'Nama Bisnis',
      'Kategori',
      'Status Website',
      'Prioritas',
      'Rating',
      'Jumlah Ulasan',
      'Nomor Telepon',
      'Link WA Direct',
      'Website Saat Ini',
      'Alamat',
      'Link Google Maps',
      'Draft Pesan WA (Pitch Hook)'
    ];

    const csvRows = ['sep=;', csvHeader.join(';')];
    enriched.forEach(row => {
      csvRows.push([
        escapeCsv(row.id),
        escapeCsv(row.name),
        escapeCsv(row.category),
        escapeCsv(row.status),
        escapeCsv(row.priority),
        escapeCsv(row.rating),
        escapeCsv(row.reviews),
        escapeCsv(row.phone),
        escapeCsv(row.waLink),
        escapeCsv(row.website),
        escapeCsv(row.address),
        escapeCsv(row.mapsUrl),
        escapeCsv(row.pitch)
      ].join(';'));
    });

    const csvFileName = `leads_${safeKeyword}.csv`;
    const defaultCsvName = `leads.csv`;

    try {
      fs.writeFileSync(csvFileName, '\uFEFF' + csvRows.join('\r\n'), 'utf8');
      fs.writeFileSync(defaultCsvName, '\uFEFF' + csvRows.join('\r\n'), 'utf8');
      console.log(`\n💾 FILE CSV DISIMPAN:`);
      console.log(`   📄 [${defaultCsvName}] & [${csvFileName}]`);
    } catch (e) {
      console.warn(`⚠️ File CSV sedang dibuka di program lain. Silakan tutup dulu jika ingin memperbarui CSV.`);
    }

    console.log('\n💡 TIPS: Buka file [leads.xlsx] langsung di Microsoft Excel, dijamin kolom langsung rapi tanpa perlu di-split!');

    return enriched;

  } finally {
    await browser.close();
  }
}

// Command Line Handler
const queryArg = process.argv.slice(2).join(' ') || 'catering surabaya';
scrapeLeads(queryArg).catch(err => {
  console.error('\n❌ Terjadi kesalahan saat scraping:', err.message);
});
