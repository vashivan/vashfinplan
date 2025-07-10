// ОНОВЛЕНО: підтримка емодзі через NotoColorEmoji або Symbola
import { NextResponse } from 'next/server';
import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { readFile } from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
  try {
    const formData = await req.json();
    console.log('📥 Отримано дані:', formData);

    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);

    const fontPath = path.resolve(process.cwd(), 'public/fonts/Symbola.ttf');
    const emojiFontPath = path.resolve(process.cwd(), 'public/fonts/Symbola.ttf');

    const fontBytes = await readFile(fontPath);
    const emojiFontBytes = await readFile(emojiFontPath);

    const customFont = await pdfDoc.embedFont(fontBytes);
    const emojiCustomFont = await pdfDoc.embedFont(emojiFontBytes);

    const blue = rgb(0.2, 0.4, 0.8);
    const black = rgb(0.1, 0.1, 0.1);

    // --- Сторінка 1: Обкладинка ---
    let page = pdfDoc.addPage([595, 842]);
    page.drawText('Персональний фінансовий план', {
      x: 50,
      y: 750,
      size: 32,
      font: customFont,
      color: blue,
    });
    page.drawText('💡 Плануй, щоб бути вільним', {
      x: 50,
      y: 650,
      size: 22,
      font: emojiCustomFont,
      color: black,
    });
    page.drawText(`Для: ${formData.contact}`, {
      x: 50,
      y: 550,
      size: 16,
      font: customFont,
      color: black,
    });
    page.drawText(`Дата: ${new Date().toLocaleDateString()}`, {
      x: 50,
      y: 450,
      size: 16,
      font: customFont,
      color: black,
    });
    page.drawText('@vash_ivan', {
      x: 480,
      y: 30,
      size: 10,
      font: customFont,
      color: rgb(0.4, 0.4, 0.4),
    });

    // --- Сторінка 2: Доходи / Витрати / Подушка ---
    page = pdfDoc.addPage([595, 842]);
    let y = 790;
    const drawHeading = (text: string) => {
      page.drawText(text, { x: 50, y, size: 16, font: customFont, color: blue });
      y -= 30;
    };
    const drawText = (label: string, value: string | number, font = customFont) => {
      page.drawText(`${label} ${value}`, { x: 50, y, size: 12, font, color: black });
      y -= 75;
    };

    drawHeading('1. Доходи та Витрати');
    drawText('Заробіток щомісяця:', `${formData.income} ${formData.currency}`);
    drawText('Постійні витрати:', `${formData.expenses} ${formData.currency}`);
    drawText('Залишається після витрат:', `${formData.income - formData.expenses} ${formData.currency}`);

    drawHeading('2. Борги');
    if (formData.hasDebt) {
      drawText('Борг щомісяця:', `${formData.debt ?? 0} ${formData.currency}`);
    } else {
      drawText('Немає боргів', '');
    }

    drawHeading('3. Резервний фонд');
    drawText('Ціль подушки (міс.):', formData.bufferMonths);
    if (formData.hasBuffer) drawText('Вже є в подушці:', `${formData.bufferAmount} ${formData.currency}`);

    // --- Сторінка 3: Інвестиції та цілі ---
    page = pdfDoc.addPage([595, 842]);
    y = 790;
    drawHeading('4. Інвестиції');
    drawText('Щомісячне відкладання:', `${formData.monthlyInvestment} ${formData.currency}`);
    drawText('Тип внесків:', formData.investmentType === 'regular' ? 'Регулярно' : 'Залежить від контрактів');

    drawHeading('5. Мета накопичення');
    drawText('Бажана сума за період:', `${formData.goalYear} ${formData.currency}`);
    if (formData.goalReason) drawText('Причина:', formData.goalReason);

    drawHeading('6. Прогноз');
    const periodMonths = Number(formData.periodMonths ?? 12);
    const available = formData.income - formData.expenses;
    const half = Math.max(available / 2, 0);
    drawText('Доступно щомісяця:', `${available} ${formData.currency}`);
    drawText('50% на подушку:', `${half} ${formData.currency}`);
    drawText('50% на інвестиції:', `${half} ${formData.currency}`);
    drawText('Період (міс.):', periodMonths);

    const bufferTotal = Math.round(half * periodMonths);
    const investTotal = Math.round(half * periodMonths);
    drawText('⬇️ Очікувано на подушці:', `${bufferTotal} ${formData.currency}`, emojiCustomFont);
    drawText('⬇️ Очікувано в інвестиціях:', `${investTotal} ${formData.currency}`, emojiCustomFont);

    // --- Сторінка 4: Поради ---
    page = pdfDoc.addPage([595, 842]);
    y = 790;
    drawHeading('7. Рекомендації');
    const tips = [
      '🔹 Облік витрат = контроль грошей.',
      '🔹 Резерв на 3–6 міс. — перед інвестиціями.',
      '🔹 Автоматичне відкладання = стабільність.',
      '🔹 Почни з ETF: VWRA, CSPX, SCHD, VOO тощо.',
      '🔹 Інвестуй у себе: знання, зв’язки, досвід.',
    ];
    tips.forEach(t => { page.drawText(t, { x: 50, y, size: 12, font: emojiCustomFont, color: black }); y -= 25; });

    page.drawText('@vash_ivan', {
      x: 480,
      y: 30,
      size: 10,
      font: customFont,
      color: rgb(0.4, 0.4, 0.4),
    });

    const pdfBytes = await pdfDoc.save();
    return new NextResponse(new Uint8Array(pdfBytes), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="finplan.pdf"',
      },
    });
  } catch (err) {
    console.error('❌ PDF generation failed:', err);
    return NextResponse.json({ error: 'Error generating PDF' }, { status: 500 });
  }
}
