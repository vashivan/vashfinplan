// app/api/financial-plan/route.ts

import fontkit from '@pdf-lib/fontkit';
import { readFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';
import { PDFDocument, rgb } from 'pdf-lib';
import nodemailer from 'nodemailer';

type FormData = {
  bufferAmount: number;
  bufferMonths: number;
  expenses: number;
  monthlyInvestment: number;
  riskTolerance: string;
  investmentExperience: string;
  income: number;
  debt?: number;
  debtTerm?: number;
  goalReason?: string;
  country?: string;
  housing: number;
  entertainment: number;
  budgetingExperience?: string;
};


export async function POST(req: Request) {
  try {
    const formData = await req.json();
    console.log('📥 Отримано дані:', formData);

    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);

    const emojiFontPath = path.resolve(process.cwd(), 'public/fonts/Symbola.ttf');

    const emojiFontBytes = await readFile(emojiFontPath);

    const emojiCustomFont = await pdfDoc.embedFont(emojiFontBytes);

    const blue = rgb(0.2, 0.4, 0.8);
    const black = rgb(0.1, 0.1, 0.1);

    function wrapText(
      text: string,
      font = emojiCustomFont,
      fontSize: number,
      maxWidth: number
    ): string[] {
      const words = text.split(' ');
      const lines: string[] = [];
      let currentLine = '';

      for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const width = font.widthOfTextAtSize(testLine, fontSize);
        if (width < maxWidth) {
          currentLine = testLine;
        } else {
          if (currentLine) lines.push(currentLine);
          currentLine = word;
        }
      }

      if (currentLine) lines.push(currentLine);
      return lines;
    }

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
      font: emojiCustomFont,
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
      font: emojiCustomFont,
      color: black,
    });
    page.drawText(`Email: ${formData.email ?? ''}`, {
      x: 50,
      y: 630,
      size: 12,
      font: emojiCustomFont,
      color: black,
    });
    page.drawText(`Телефон: ${formData.phone ?? ''}`, {
      x: 50,
      y: 610,
      size: 12,
      font: emojiCustomFont,
      color: black,
    });
    page.drawText(`Дата: ${new Date().toLocaleDateString()}`, {
      x: 50,
      y: 590,
      size: 12,
      font: emojiCustomFont,
      color: black,
    });
    page.drawText('Фінплан від @vash_ivan', {
      x: 420,
      y: 30,
      size: 10,
      font: emojiCustomFont,
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
      page.drawText(text, { x: 50, y, size: 16, font: emojiCustomFont, color: blue });
      y -= 10;
      page.drawLine({
        start: { x: 50, y },
        end: { x: 545, y },
        thickness: 0.5,
        color: rgb(0.7, 0.7, 0.9),
      });
      y -= 40;
    };

    const drawText = (
      label: string,
      value: string | number,
      font = emojiCustomFont,
      fontSize = 12,
      maxWidth = 480,
      x = 50
    ) => {
      const outputValue =
        value || value === 0 ? value.toString() : 'Немає даних';

      const text = `${label} ${outputValue}`.trim();
      const lines = wrapText(text, font, fontSize, maxWidth);

      lines.forEach(line => {
        if (y < 80) y = newPage();
        page.drawText(line, { x, y, size: fontSize, font, color: black });
        y -= 20;
      });

      y -= 10;
    };


    function drawWrappedText(
      text: string,
      font = emojiCustomFont,
      fontSize = 12,
      maxWidth = 480,
      x = 50
    ) {
      const lines = wrapText(text, font, fontSize, maxWidth);
      for (const line of lines) {
        if (y < 80) y = newPage();
        page.drawText(line, { x, y, size: fontSize, font, color: black });
        y -= 20;
      }
    }


    drawHeading('1. Доходи та Витрати');
    drawText('Заробіток щомісяця:', `${formData.income} ${formData.currency}`);
    drawText('Постійні витрати:', `${formData.expenses} ${formData.currency}`);
    drawText('Залишається після витрат:', `${formData.income - formData.expenses} ${formData.currency}`);

    const totalDebt = formData.debt && formData.debtTerm
      ? Number(formData.debt) * Number(formData.debtTerm)
      : 0;

    const afterDebt = formData.income - formData.expenses - (formData.debt ?? 0);

    drawHeading('2. Борги');
    if (formData.hasDebt) {
      drawText('Загальна сума боргу:', `${totalDebt} ${formData.currency}`);
      drawText('Борг щомісяця:', `${formData.debt ?? 0} ${formData.currency}`);
      drawText('Залишається після сплати місячної частки боргу:', `${afterDebt} ${formData.currency}`);
    } else {
      drawText('Немає', 'боргів');
      drawText('Залишається після витрат:', `${formData.income - formData.expenses} ${formData.currency}`);
    }

    drawHeading('3. Резервний фонд');
    drawText('Ціль подушки (міс.):', formData.bufferMonths);
    drawText('Потрібна сума подушки:',
      `${formData.bufferMonths * formData.expenses} ${formData.currency}`)
    if (formData.hasBuffer) {
      drawText('Вже є в подушці:', `${formData.bufferAmount} ${formData.currency}`);
      drawText('Потрібно дозбирати:',
        `${(formData.bufferMonths * formData.expenses) - formData.bufferAmount} ${formData.currency}`)
    }

    drawHeading('4. Бажані інвестиції');
    drawText('Щомісячне відкладання:', `${formData.monthlyInvestment} ${formData.currency}`);
    drawText('Тип внесків:', formData.investmentType === 'regular' ? 'Регулярно' : 'Залежить від контрактів');
    drawText('Результат при відкладанні/інвестуванні:',
      `~ ${formData.monthlyInvestment * formData.bufferMonths} ${formData.currency}`)

    drawHeading('5. Мета накопичення');
    drawText('Бажана сума за період без урахування подушки:', `${formData.goalYear} ${formData.currency}`);
    drawText('Бажана сума за період з урахуванням суми подушки:',
      `${formData.goalYear - formData.bufferAmount} ${formData.currency}`);
    drawText('Ціль:', formData.goalReason || '—');

    drawHeading('6. Прогноз');

    const periodMonths = Number(formData.periodMonths ?? 12);
    const income = Number(formData.income);
    const expenses = Number(formData.expenses);
    const debt = Number(formData.debt ?? 0);
    const debtTerm = Number(formData.debtTerm ?? 0);

    drawText('При умові використання всіх наявних коштів', 'результат буде виглядати так:');

    if (formData.hasDebt) {
      let totalForBuffer = 0;
      let totalForInvesting = 0;

      for (let i = 0; i < periodMonths; i++) {
        const isDebtActive = i < debtTerm;
        const monthlyFree = income - expenses - (isDebtActive ? debt : 0);
        const perBuffer = monthlyFree / 2;
        const perInvest = monthlyFree / 2;
        totalForBuffer += perBuffer;
        totalForInvesting += perInvest;
      }

      // Малюємо узагальнену оцінку (початкові умови)
      drawText('Період (міс.):', periodMonths);

      drawText('Очікувано на подушці:', `${Math.round(totalForBuffer)} ${formData.currency}`);
      drawText('Очікувано в інвестиціях:', `~ ${Math.round(totalForInvesting)} ${formData.currency}`);
      drawText('Загальна прогнозована сума:', `${Math.round(totalForBuffer + totalForInvesting)} ${formData.currency}`);

      // Додаємо спеціальну пораду, якщо строк боргу менший, ніж період
      if (debtTerm < periodMonths) {
        drawWrappedText(
          `Уже через ${debtTerm} міс. борг буде виплачено — твій щомісячний залишок зросте. Це хороший шанс збільшити внески або пришвидшити досягнення цілей.`,
          emojiCustomFont,
          12,
          480,
          50
        );
      }

    } else {
      // Простий варіант без боргів
      const available = income - expenses;
      const half = Math.max(available / 2, 0);

      drawText('Доступно щомісяця:', `${available} ${formData.currency}`);
      drawText('50% на подушку:', `${half} ${formData.currency}`);
      drawText('50% на інвестиції:', `${half} ${formData.currency}`);
      drawText('Період (міс.):', periodMonths);
      drawText('Очікувано на подушці:', `${Math.round(half * periodMonths)} ${formData.currency}`);
      drawText('Очікувано в інвестиціях:', `~ ${Math.round(half * periodMonths)} ${formData.currency}`);
      drawText('Загальна прогнозована сума:', `${Math.round(half * periodMonths) * 2} ${formData.currency}`);
    }


    drawHeading('7. Деталізація витрат');
    drawText('Житло:', `${formData.housing} ${formData.currency} `);
    drawText('Їжа:', `${formData.food} ${formData.currency} `);
    drawText('Кафе:', `${formData.cafes} ${formData.currency} `);
    drawText('Розваги:', `${formData.entertainment} ${formData.currency} `);
    drawText('Інше:', `${formData.otherExpenses} ${formData.currency} `);

    drawHeading('8. Заплановані витрати');
    drawText('Опис:', formData.plannedExpensesDesc);
    drawText('Сума:', `${formData.plannedExpensesAmount} ${formData.currency} `);

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
    drawText('Заощадження:', `${formData.currentSavings} ${formData.currency} `);
    drawText('Інвестиції:', `${formData.currentInvestments} ${formData.currency} `);

    drawHeading('14. Досвід та ризик');
    drawText('Толерантність до ризику:', formData.riskTolerance);
    drawText('Досвід інвестування:', formData.investmentExperience);

    drawHeading('15. Майбутні події');
    drawText('Очікувані зміни:', formData.futureEvents);

    const getPersonalAdvice = (formData: FormData) => {
      const advice = [];
      const {
        bufferAmount,
        bufferMonths,
        expenses,
        monthlyInvestment,
        riskTolerance,
        investmentExperience,
        income,
        debt,
        goalReason,
        country,
        housing,
        entertainment,
        budgetingExperience
      } = formData;

      const bufferTarget = bufferMonths * expenses;
      const freeCash = income - expenses - (debt ?? 0);

      if (bufferAmount < bufferTarget) {
        advice.push('Почни з фінансової подушки. Це твоя основа безпеки. 3–6 місяців витрат у валюті — must have.');
      } else {
        advice.push('У тебе вже є резерв — це круто. Наступний крок: почни інвестувати те, що не знадобиться в найближчі 1–2 роки.');
      }

      if (monthlyInvestment > 0) {
        advice.push('Розглянь ETF на індекс S&P 500 або глобальний ринок (наприклад, VOO або IWDA). Це надійна і пасивна стратегія.');
      }

      if (riskTolerance === 'низький') {
        advice.push('Обирай консервативні фонди з широким покриттям. Уникай високих ризиків і “гарячих” ідей з TikTok 🙂');
      }

      if (investmentExperience === 'новачок') {
        advice.push('Починай з малого. ETF — це хороший перший крок. Не поспішай — стабільність важливіша за прибутки.');
      }

      if (freeCash > 400) {
        advice.push('Твій фінансовий профіцит дозволяє серйозно інвестувати. Регулярність — ключ до результату.');
      }

      if (goalReason?.toLowerCase().includes('навчання')) {
        advice.push('Якщо ціль — навчання, рекомендую розділити накопичення на короткострокові та довгострокові: частина в валюті, частина — у фондах.');
      }

      if (country?.toLowerCase().includes('ua') || country?.toLowerCase().includes('ukraine')) {
        advice.push('Якщо ти громадянин України, зверни увагу на податкові особливості. ETF на європейських біржах (CSPX, IWDA) часто зручніші.');
      }

      if (debt) {
        if (debt > 0) {
          advice.push('Оціни свої борги: якщо ставка висока — можливо, краще спочатку погасити їх, перш ніж інвестувати.');
        }
      }

      if (totalDebt > 5000) {
        advice.push('Загальна сума боргу суттєва. Варто розглянути пріоритетне погашення перед інвестуванням.');
      }
      if (formData.debtTerm && Number(formData.debtTerm) > 24) {
        advice.push('Тривалий строк виплати боргу може створювати фінансовий тиск. Обміркуй, як скоротити цей термін.');
      }

      if (housing > income * 0.4) {
        advice.push('Витрати на житло забирають велику частину доходу. Можливо, є сенс оптимізувати цю категорію.');
      }

      if (entertainment > income * 0.25) {
        advice.push('Витрати на розваги високі. Можна зберегти баланс між задоволенням і майбутніми цілями.');
      }

      if (budgetingExperience === 'немає') {
        advice.push('Спробуй вести облік витрат хоча б 1 місяць. Це дасть глибше розуміння, куди йдуть гроші.');
      }

      advice.push(
        'Не забувай: фінанси — це не про обмеження, а про свободу вибору. План = впевненість.',
        'Став собі фінансові цілі з чіткими сумами й термінами. Це допоможе приймати рішення більш усвідомлено.',
        'Використовуй автоматичне відкладання — налаштуй регулярний переказ частини доходу на інвестрахунок або подушку.',
        'Не бійся починати з малого. Навіть 50–100 доларів щомісяця мають значення на дистанції.',
        'Знайди комфортний баланс між теперішніми бажаннями й майбутніми планами. Фінанси — це інструмент, а не обмеження.');

      return advice;
    };

    drawHeading('16. Поради для тебе');
    const personalAdvice = getPersonalAdvice(formData);
    personalAdvice.forEach((tip, index) => {
      drawWrappedText(`${index + 1}. ${tip}`, emojiCustomFont, 12, 480, 50);
    });

    if (y < 100) y = newPage();
    y -= 20;
    page.drawLine({
      start: { x: 50, y },
      end: { x: 545, y },
      thickness: 0.5,
      color: rgb(0.7, 0.7, 0.9),
    });
    y -= 30;

    const finalNote = `Якщо тобі цікаво не просто зберігати, а використовувати гроші ефективно — я можу допомогти. Проведу консультацію та складу персональний фінплан з урахуванням твоїх цілей, пріоритетів та бажаного терміну. Вартість — символічні $25. Напиши в Instagram @vash_ivan — домовимось.`;

    const finalNoteLines = wrapText(finalNote, emojiCustomFont, 12, 480);
    finalNoteLines.forEach(line => {
      if (y < 80) y = newPage();
      page.drawText(line, {
        x: 50,
        y,
        size: 12,
        font: emojiCustomFont,
        color: blue, // можна зробити сірим або курсивом
      });
      y -= 20;
    });


    const pdfBytes = await pdfDoc.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Фінплан" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // надсилаєш самому собі
      subject: `Новий фінплан: ${formData.name || 'Без імені'}`,
      html: `
        <h3>Новий фінансовий план</h3>
        <p><strong>Ім’я:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Контакт:</strong> ${formData.contact}</p>
        <p><strong>Дата:</strong> ${new Date().toLocaleDateString()}</p>
      `,
      attachments: [
        {
          filename: 'finplan.pdf',
          content: Buffer.from(pdfBytes),
        },
      ],
    });

    await transporter.sendMail({
      from: `"Ваш фінплан. Він вже готовий." <${process.env.EMAIL_USER}>`,
      to: `${formData.email}`, // надсилаєш самому собі
      subject: `Новий фінплан: ${formData.name || 'Без імені'}`,
      html: `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
    <h2 style="color: #205295;">Ваш фінансовий план готовий 🎉</h2>

    <p>Привіт${formData.name ? `, <strong>${formData.name}</strong>` : ''}!</p>

    <p>До цього листа прикріплено твій персональний фінансовий план у форматі PDF. 
    У ньому — вся твоя базова фінансова картина, пріоритети, цілі, прогнози, а також персональні поради саме для тебе.</p>

    <hr style="border: none; border-top: 1px solid #ccc; margin: 24px 0;" />

    <h3 style="color: #205295;">Що далі?</h3>

    <p>Якщо тобі цікаво не просто зберігати, а ефективно <strong>використовувати гроші</strong> — я можу допомогти.</p>
    <p>Пропоную <strong>персональну консультацію</strong> і деталізований фінплан, орієнтований на твої цілі й бажані терміни — усього за <strong>$25</strong>.</p>
    
    <p>Напиши мені в Instagram: <a href="https://instagram.com/vash_ivan" target="_blank">@vash_ivan</a></p>

    <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />

    <p style="font-size: 14px; color: #666;">Дата запиту: ${new Date().toLocaleDateString()}</p>
    <p style="font-size: 14px; color: #666;">Email: ${formData.email}</p>
    <p style="font-size: 14px; color: #666;">Контакт: ${formData.contact || '—'}</p>
  </div>
`,
      attachments: [
        {
          filename: 'finplan.pdf',
          content: Buffer.from(pdfBytes),
        },
      ],
    });


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
