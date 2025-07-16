// app/api/save-client/route.ts

import { NextResponse } from 'next/server';
import { db } from '../../../lib/db'; // шляхи можуть бути адаптовані під твій проєкт
import { RowDataPacket } from 'mysql2';

export async function POST(req: Request) {
  let connection;

  try {
    const { name, email, phone, contact } = await req.json();

    connection = await db.getConnection();

    await connection.query(`
      CREATE TABLE IF NOT EXISTS clients (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE,
        phone VARCHAR(50),
        contact TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    const [existingRows] = await connection.query<RowDataPacket[]>(
      'SELECT id FROM clients WHERE email = ? LIMIT 1',
      [email]
    );

    if (existingRows.length > 0) {
      return NextResponse.json({ error: 'Цей email вже є в базі' }, { status: 409 });
    }

    await connection.query(
      'INSERT INTO clients (name, email, phone, contact) VALUES (?, ?, ?, ?)',
      [name, email, phone, contact]
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('❌ Error saving client:', err);
    return NextResponse.json({ error: 'Не вдалося зберегти клієнта' }, { status: 500 });
  } finally {
    if (connection) connection.release();
  }
}
