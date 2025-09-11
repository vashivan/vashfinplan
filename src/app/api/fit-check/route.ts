// app/api/fit-check/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// ВАЖЛИВО: Nodemailer потребує Node.js runtime (не Edge)
export const runtime = 'nodejs';

type Body = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  hpt?: string; // honeypot (приховане поле, має бути порожнім)
};

const escapeHtml = (s = '') =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));

export async function POST(req: Request) {
  try {
    const { name, email, phone, message, hpt } = (await req.json()) as Body;

    // Honeypot: якщо бот заповнив — робимо вигляд, що все ок
    if (hpt) return NextResponse.json({ ok: true });

    if (!name || !email || !phone) {
      return NextResponse.json(
        { ok: false, error: 'Будь ласка, заповніть всі обов’язкові поля' },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT || 465),
      secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : true, // 465 — secure
      auth: {
        user: process.env.EMAIL_USER, // твоя адреса (логін)
        pass: process.env.EMAIL_PASS, // App Password для Gmail
      },
    });

    const fromName = process.env.EMAIL_FROM_NAME || 'Запис на Fit-Check';
    const fromAddr = process.env.EMAIL_FROM || process.env.EMAIL_USER!;
    const toAddr = process.env.EMAIL_TO || process.env.EMAIL_USER!;

    await transporter.sendMail({
      from: `${fromName} <${fromAddr}>`,
      to: toAddr, // надсилаєш собі
      replyTo: `${escapeHtml(name)} <${escapeHtml(email)}>`,
      subject: `Нова заявка на Fit-Check — ${escapeHtml(name)}`,
      text: `Ім’я: ${name}
Email: ${email}
Телефон: ${phone}
Повідомлення: ${message || ''}
Дата: ${new Date().toISOString()}`,
      html: `
        <h3>Нова заявка на Fit-Check</h3>
        <p><strong>Ім’я:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Телефон:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Повідомлення:</strong> ${escapeHtml(message || '')}</p>
        <p><strong>Дата:</strong> ${new Date().toLocaleString('uk-UA')}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return NextResponse.json(
      { ok: false, error: 'Не вдалося надіслати email' },
      { status: 500 }
    );
  }
}
