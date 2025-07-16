// app/api/financial-plan/route.ts

import fontkit from '@pdf-lib/fontkit';
import { readFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';
import { PDFDocument, rgb } from 'pdf-lib';

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

    drawHeading('2. Борги');
    if (formData.hasDebt) {
      drawText('Борг щомісяця:', `${formData.debt ?? 0} ${formData.currency}`);
    } else {
      drawText('Немає боргів', '');
    }

    drawHeading('3. Резервний фонд');
    drawText('Ціль подушки (міс.):', formData.bufferMonths);
    if (formData.hasBuffer) {
      drawText('Вже є в подушці:', `${formData.bufferAmount} ${formData.currency}`);
    }

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

    drawHeading('16. Поради для тебе');

    drawText(
      '1.', 'Якщо в тебе довгостроковий контракт (6+ місяців), стабільний дохід і невисокі витрати — це ідеальний момент, щоб створити не лише подушку, а й почати інвестувати.'
    );

    drawText(
      '2.', 'Рекомендую розглянути ETF на широкі індекси, як-от S&P 500 (VOO, CSPX) або Nasdaq 100 (QQQ, QQQM). Вони не потребують щоденного контролю й історично дають 7–10% річного зростання.'
    );

    drawText(
      '3.', 'Якщо ти маєш вже зібрану подушку (3–6 місяців витрат), її надлишок може працювати: краще, ніж просто лежати на картці. Але інвестуй тільки те, що не знадобиться найближчі 1–2 роки.'
    );

    drawText(
      '4.', 'Якщо дохід нестабільний, або контракти короткі, або попереду перерва — зосередься на подушці. Мінімум 3 місяці витрат у валюті, яку ти реально використовуєш (EUR, USD тощо).'
    );

    drawText(
      '5.', 'Уникай інвестицій у щось незрозуміле або ризикове, особливо якщо це “заради більшого прибутку”. Спокій і гнучкість — твої кращі друзі.'
    );

    drawText(
      '6.', 'Якщо хочеш більше контролю й розуміння — розділи гроші: частина у валюті (на карті / готівка), частина — у брокера в ETF, частина — для коротких цілей (навчання, переїзд тощо).'
    );

    drawText(
      '7.', 'Регулярність важливіша за суму. Навіть 50$/міс у надійний фонд — це вже стратегія.'
    );

    drawText(
      '8.', 'Інвестиції — це не азарт. Це спосіб зберегти і примножити те, що заоблено важкою працею. Вони дають вибір. А вибір — це свобода.'
    );


    const pdfBytes = await pdfDoc.save();

    return new Response(pdfBytes, {
      status: 200,
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
