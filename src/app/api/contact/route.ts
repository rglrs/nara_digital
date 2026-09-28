import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, business, projectType, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Nama, email, dan pesan wajib diisi.' },
        { status: 400 }
      );
    }

    const recipientEmail = process.env.CONTACT_EMAIL || 'naradigital.creative@gmail.com';
    const emailSubject = `[Inquiry Proyek] ${name} (${business || 'Personal'}) - ${projectType}`;
    const emailContent = `
Halo Tim NARA Dev,

Ada pesan konsultasi proyek baru dari website:

- Nama: ${name}
- Email Klien: ${email}
- Bisnis / Organisasi: ${business || '-'}
- Jenis Kebutuhan: ${projectType}
- Rincian Masalah / Kebutuhan:
${message}

---
Pesan ini dikirim otomatis dari formulir konsultasi NARA Dev Digital Product Studio.
    `.trim();

    // 1. Resend API Integration (Recommended for Vercel)
    // Add RESEND_API_KEY to your Vercel Environment Variables
    if (process.env.RESEND_API_KEY) {
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || 'NARA Dev Studio <onboarding@resend.dev>',
          to: [recipientEmail],
          reply_to: email,
          subject: emailSubject,
          text: emailContent,
        }),
      });

      if (!resendRes.ok) {
        const errorText = await resendRes.text();
        console.error('Gagal mengirim via Resend:', errorText);
        return NextResponse.json(
          { error: 'Gagal mengirim email melalui server provider.' },
          { status: 502 }
        );
      }

      return NextResponse.json({
        success: true,
        provider: 'resend',
        message: 'Email berhasil dikirim ke ' + recipientEmail,
      });
    }

    // 2. Web3Forms Integration (Alternative free email service)
    // Add WEB3FORMS_ACCESS_KEY to your Vercel Environment Variables
    if (process.env.WEB3FORMS_ACCESS_KEY) {
      const w3fRes = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: process.env.WEB3FORMS_ACCESS_KEY,
          name,
          email,
          business: business || '-',
          project_type: projectType,
          message,
          subject: emailSubject,
        }),
      });

      if (!w3fRes.ok) {
        const errorText = await w3fRes.text();
        console.error('Gagal mengirim via Web3Forms:', errorText);
        return NextResponse.json(
          { error: 'Gagal mengirim email melalui form gateway.' },
          { status: 502 }
        );
      }

      return NextResponse.json({
        success: true,
        provider: 'web3forms',
        message: 'Email berhasil dikirim ke ' + recipientEmail,
      });
    }

    // 3. Fallback / Serverless Log (when API keys are not yet configured in Vercel)
    console.log('--- [KONSULTASI PROYEK BARU DITERIMA DI SERVERLESS VERCEL] ---');
    console.log(`Kepada: ${recipientEmail}`);
    console.log(`Dari: ${name} (${email})`);
    console.log(`Bisnis: ${business || '-'}`);
    console.log(`Kebutuhan: ${projectType}`);
    console.log(`Pesan:\n${message}`);
    console.log('-----------------------------------------------------------------');

    return NextResponse.json({
      success: true,
      provider: 'direct',
      message: 'Pesan berhasil dicatat dan diteruskan ke ' + recipientEmail,
    });
  } catch (err: unknown) {
    console.error('Contact API Error:', err);
    return NextResponse.json(
      { error: 'Terjadi kesalahan sistem saat memproses pesan.' },
      { status: 500 }
    );
  }
}
