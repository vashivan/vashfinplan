// app/api/financial-plan/route.ts

import fontkit from '@pdf-lib/fontkit';
import { mkdir, readFile, writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';
import { PDFDocument, rgb } from 'pdf-lib';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
  try {
    const formData = await req.json();
    console.log('📥 Отримано дані:', formData);

    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);

    const fontPath = path.resolve(process.cwd(), 'public/fonts/Roboto-Regular.ttf');
    const emojiFontPath = path.resolve(process.cwd(), 'public/fonts/Symbola.ttf');

    const fontBytes = await readFile(fontPath);
    const emojiFontBytes = await readFile(emojiFontPath);

    const customFont = await pdfDoc.embedFont(fontBytes);
    const emojiCustomFont = await pdfDoc.embedFont(emojiFontBytes);

    const blue = rgb(0.2, 0.4, 0.8);
    const black = rgb(0.1, 0.1, 0.1);

    // Обкладинка
    let page = pdfDoc.addPage([595, 842]);
    page.drawRectangle({
      x: 40,
      y: 40,
      width: 515,
      height: 760,
      borderWidth: 1,
      borderColor: rgb(0.8, 0.85, 0.95),
      color: rgb(1, 1, 1),
    });
    page.drawText('Персональний фінансовий план', {
      x: 50,
      y: 720,
      size: 28,
      font: customFont,
      color: blue,
    });
    page.drawText('Плануй, щоб бути вільним', {
      x: 50,
      y: 690,
      size: 18,
      font: emojiCustomFont,
      color: black,
    });
    page.drawText(`Ім’я: ${formData.name ?? ''}`.trim(), {
      x: 50,
      y: 650,
      size: 14,
      font: customFont,
      color: black,
    });
    page.drawText(`Email: ${formData.email ?? ''}`, {
      x: 50,
      y: 630,
      size: 12,
      font: customFont,
      color: black,
    });
    page.drawText(`Телефон: ${formData.phone ?? ''}`, {
      x: 50,
      y: 610,
      size: 12,
      font: customFont,
      color: black,
    });
    page.drawText(`Instagram або контакт: ${formData.contact ?? ''}`, {
      x: 50,
      y: 590,
      size: 12,
      font: customFont,
      color: black,
    });
    page.drawText(`Дата: ${new Date().toLocaleDateString()}`, {
      x: 50,
      y: 570,
      size: 12,
      font: customFont,
      color: black,
    });

    page.drawText('Фінплан від @vash_ivan', {
      x: 420,
      y: 30,
      size: 10,
      font: customFont,
      color: rgb(0.4, 0.4, 0.4),
    });

    // Додаткові сторінки
    const newPage = () => {
      page = pdfDoc.addPage([595, 842]);
      return 790;
    };

    let y = newPage();

    const drawHeading = (text: string) => {
  if (y < 100) y = newPage();
  y -= 20;
  page.drawText(text, { x: 50, y, size: 16, font: customFont, color: blue });
  y -= 10;
  page.drawLine({
    start: { x: 50, y },
    end: { x: 545, y },
    thickness: 0.5,
    color: rgb(0.7, 0.7, 0.9),
  });
  y -= 40;
};

    const drawText = (label: string, value: string | number, font = customFont) => {
      if (y < 80) y = newPage();
      page.drawText(`${label} ${value}`, { x: 50, y, size: 12, font, color: black });
      y -= 30;
    };

    drawHeading('1. Доходи та Витрати');
    drawText('Заробіток щомісяця:', `${formData.income} ${formData.currency}`);
    drawText('Постійні витрати:', `${formData.expenses} ${formData.currency}`);
    drawText('Залишається після витрат:', `${formData.income - formData.expenses} ${formData.currency}`);

    drawHeading('💳 2. Борги');
    if (formData.hasDebt) {
      drawText('Борг щомісяця:', `${formData.debt ?? 0} ${formData.currency}`);
    } else {
      drawText('Немає боргів', '');
    }

    drawHeading('3. Резервний фонд');
    drawText('Ціль подушки (міс.):', formData.bufferMonths);
    if (formData.hasBuffer)
      drawText('Вже є в подушці:', `${formData.bufferAmount} ${formData.currency}`);

    drawHeading('4. Інвестиції');
    drawText('Щомісячне відкладання:', `${formData.monthlyInvestment} ${formData.currency}`);
    drawText('Тип внесків:', formData.investmentType === 'regular' ? 'Регулярно' : 'Залежить від контрактів');

    drawHeading('5. Мета накопичення');
    drawText('Бажана сума за період:', `${formData.goalYear} ${formData.currency}`);
    drawText('Причина:', formData.goalReason || '—');

    drawHeading('6. Прогноз');
    const periodMonths = Number(formData.periodMonths ?? 12);
    const available = formData.income - formData.expenses;
    const half = Math.max(available / 2, 0);
    drawText('Доступно щомісяця:', `${available} ${formData.currency}`);
    drawText('50% на подушку:', `${half} ${formData.currency}`);
    drawText('50% на інвестиції:', `${half} ${formData.currency}`);
    drawText('Період (міс.):', periodMonths);
    drawText('⬇️ Очікувано на подушці:', `${Math.round(half * periodMonths)} ${formData.currency}`, emojiCustomFont);
    drawText('⬇️ Очікувано в інвестиціях:', `${Math.round(half * periodMonths)} ${formData.currency}`, emojiCustomFont);

    drawHeading('7. Деталізація витрат');
    drawText('Житло:', `${formData.housing} ${formData.currency}`);
    drawText('Їжа:', `${formData.food} ${formData.currency}`);
    drawText('Кафе:', `${formData.cafes} ${formData.currency}`);
    drawText('Розваги:', `${formData.entertainment} ${formData.currency}`);
    drawText('Інше:', `${formData.otherExpenses} ${formData.currency}`);

    drawHeading('8. Заплановані витрати');
    drawText('Опис:', formData.plannedExpensesDesc);
    drawText('Сума:', `${formData.plannedExpensesAmount} ${formData.currency}`);

    drawHeading('9. Джерела доходу');
    drawText('Активні доходи:', formData.incomeSources);
    drawText('Пасивні доходи:', formData.passiveIncome);

    drawHeading('10. Податковий статус');
    drawText('Країна:', formData.country);
    drawText('Статус:', formData.taxStatus);

    drawHeading('11. Фінансова поведінка');
    drawText('Облік витрат:', formData.tracksExpenses);
    drawText('Емоційні витрати:', formData.emotionalSpending);
    drawText('Досвід бюджету:', formData.budgetingExperience);

    drawHeading('12. Пріоритети та стиль');
    drawText('Пріоритети:', formData.lifePriorities);
    drawText('Інвестування:', formData.investmentStyle);

    drawHeading('13. Поточні активи');
    drawText('Заощадження:', `${formData.currentSavings} ${formData.currency}`);
    drawText('Інвестиції:', `${formData.currentInvestments} ${formData.currency}`);

    drawHeading('14. Досвід та ризик');
    drawText('Толерантність до ризику:', formData.riskTolerance);
    drawText('Досвід інвестування:', formData.investmentExperience);

    drawHeading('15. Майбутні події');
    drawText('Очікувані зміни:', formData.futureEvents);

    // Рекомендації
    page = pdfDoc.addPage([595, 842]);
    y = 790;
    drawHeading('16. Рекомендації');
    const tips = [
      '🔹 Облік витрат = контроль грошей.',
      '🔹 Резерв на 3–6 міс. — перед інвестиціями.',
      '🔹 Автоматичне відкладання = стабільність.',
      '🔹 Почни з ETF: VWRA, CSPX, SCHD, VOO тощо.',
      '🔹 Інвестуй у себе: знання, зв’язки, досвід.',
    ];
    tips.forEach(t => { page.drawText(t, { x: 50, y, size: 12, font: emojiCustomFont, color: black }); y -= 28; });

    page.drawText('@vash_ivan', {
      x: 480,
      y: 30,
      size: 10,
      font: customFont,
      color: rgb(0.4, 0.4, 0.4),
    });

    // Особисті нотатки
    page = pdfDoc.addPage([595, 842]);
    y = 790;
    page.drawText('Особисті нотатки', {
      x: 50,
      y,
      size: 18,
      font: customFont,
      color: blue,
    });
    y -= 40;
    y -= 40;
    page.drawText('Ця сторінка призначена для твоїх власних роздумів, ідей та фінансових рішень.', {
      x: 50,
      y,
      size: 12,
      font: customFont,
      color: black,
    });
    y -= 50;
    page.drawText('(Тут можна занотувати свої думки після заповнення фінплану...)', {
      x: 50,
      y,
      size: 11,
      font: customFont,
      color: black,
    });
    for (let i = 0; i < 15; i++) {
      y -= 35;
      page.drawLine({
        start: { x: 50, y },
        end: { x: 545, y },
        thickness: 0.3,
        color: rgb(0.85, 0.85, 0.85),
      });
    }

    const pdfBytes = await pdfDoc.save();
    const fileId = uuidv4();
    const fileName = `finplan-${fileId}.pdf`;
    const outputPath = path.resolve(process.cwd(), 'public/tmp', fileName);
    await mkdir(path.resolve(process.cwd(), 'public/tmp'), { recursive: true });
    await writeFile(outputPath, pdfBytes);

    const fileUrl = `/tmp/${fileName}`;
    return NextResponse.json({ url: fileUrl });
  } catch (err) {
    console.error('❌ PDF generation failed:', err);
    return NextResponse.json({ error: 'Error generating PDF' }, { status: 500 });
  }
}
