'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import axios from 'axios';

const currencies = ['USD', 'EUR', 'KRW', 'UAH'];

export default function FinancialPlanForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', income: '', currency: 'USD', expenses: '',
    hasDebt: false, debt: '', bufferMonths: '', hasBuffer: false, bufferAmount: '',
    monthlyInvestment: '', investmentType: 'regular', goalYear: '', goalReason: '',
    contact: '', periodMonths: '', housing: '', food: '', cafes: '',
    entertainment: '', otherExpenses: '', plannedExpensesDesc: '', plannedExpensesAmount: '',
    incomeSources: '', passiveIncome: '', country: '', taxStatus: '',
    tracksExpenses: '', emotionalSpending: '', budgetingExperience: '',
    lifePriorities: '', investmentStyle: '', currentSavings: '', currentInvestments: '',
    riskTolerance: '', investmentExperience: '', futureEvents: ''
  });

  const handleChange = (key: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const generateTemplateParams = (data: typeof formData) => {
    const params: { [key: string]: string } = {};
    Object.entries(data).forEach(([key, value]) => {
      params[key] = typeof value === 'boolean' ? (value ? 'Так' : 'Ні') : String(value ?? '');
    });
    return params;
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const parsedData = {
        ...formData,
        income: Number(formData.income),
        expenses: Number(formData.expenses),
        debt: Number(formData.debt),
        bufferMonths: Number(formData.bufferMonths),
        bufferAmount: Number(formData.bufferAmount),
        monthlyInvestment: Number(formData.monthlyInvestment),
        goalYear: Number(formData.goalYear),
        periodMonths: Number(formData.periodMonths),
        plannedExpensesAmount: Number(formData.plannedExpensesAmount),
      
        // Деталізація витрат
        housing: Number(formData.housing),
        food: Number(formData.food),
        cafes: Number(formData.cafes),
        entertainment: Number(formData.entertainment),
        otherExpenses: Number(formData.otherExpenses),
      
        // Поточні заощадження та інвестиції
        currentSavings: Number(formData.currentSavings),
        currentInvestments: Number(formData.currentInvestments),
      };

      const res = await fetch('/api/financial-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsedData),
      });

      const result = await res.json();
      setPdfUrl(result.url);

      const emailData = {
        service_id: "service_4qzmcqt",
        template_id: "template_4tzi8uz",
        user_id: "JO5EenBZtLwYS-_-V",
        template_params: {
          ...generateTemplateParams(formData),
          reply_to: formData.email,
        },
      };

      await axios.post('https://api.emailjs.com/api/v1.0/email/send', emailData);
    } catch (err) {
      console.error('Error submitting form', err);
    }
    setLoading(false);
  };

  const steps = [
    {
      title: 'Крок 1: Контактні дані',
      content: (
        <>
          <p className="text-sm text-gray-600 mb-5">Введи свої контактні дані — це потрібно, щоб надіслати тобі готовий фінплан і мати зв{'`'}язок.</p>
          <input
            type="text"
            placeholder="Ім’я"
            value={formData.name}
            onChange={e => handleChange('name', e.target.value)}
            className="input mb-3 border-b-1 border-b-blue-400"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={e => handleChange('email', e.target.value)}
            className="input mb-3 border-b-1 border-b-blue-400"
          />
          <input
            type="tel"
            placeholder="Номер телефону"
            value={formData.phone}
            onChange={e => handleChange('phone', e.target.value)}
            className="input mb-4 border-b-1 border-b-blue-400"
          />
        </>
      )
    },
    {
      title: 'Крок 2: Доходи',
      content: (
        <>
          <p className="text-sm text-gray-600 mb-5">Вкажи, скільки ти зазвичай заробляєш щомісяця. Це допоможе розрахувати, яку частину можна зберігати або інвестувати.</p>
          <input
            type="text"
            placeholder="Сума в місяць"
            value={formData.income}
            onChange={e => handleChange('income', e.target.value)}
            className="input mb-4 mr-3 border-b-1 border-b-blue-400"
          />
          <select
            value={formData.currency}
            onChange={e => handleChange('currency', e.target.value)}
            className="input"
          >
            {currencies.map(cur => (
              <option key={cur} value={cur}>{cur}</option>
            ))}
          </select>
        </>
      )
    },
    {
      title: 'Крок 3: Витрати',
      content: (
        <>
          <p className="text-sm text-gray-600 mb-5">Вкажи, скільки ти витрачаєш на життя щомісяця. Це дозволить зрозуміти, скільки коштів залишається.</p>
          <input
            type="text"
            placeholder="Сума витрат"
            value={formData.expenses}
            onChange={e => handleChange('expenses', e.target.value)}
            className="input mb-4 mr-3 border-b-1 border-b-blue-400"
          />
        </>
      )
    },
    {
      title: 'Крок 4: Борги',
      content: (
        <>
          <p className="text-sm text-gray-600 mb-5">Чи є у тебе щомісячні платежі по кредитах або боргах?</p>
          <div className="mb-2">
            <label className="mr-4">
              <input type="radio" name="debt" checked={formData.hasDebt} onChange={() => handleChange('hasDebt', true)} />
              <span className="ml-1">Так</span>
            </label>
            <label className="ml-4">
              <input type="radio" name="debt" checked={!formData.hasDebt} onChange={() => handleChange('hasDebt', false)} />
              <span className="ml-1">Ні</span>
            </label>
          </div>
          {formData.hasDebt && (
            <input
              type="text"
              placeholder="Сума щомісячно"
              value={formData.debt || ''}
              onChange={e => handleChange('debt', e.target.value)}
              className="input mb-4 mr-3 border-b-1 border-b-blue-400"
            />
          )}
        </>
      )
    },
    {
      title: 'Крок 5: Фінансова подушка',
      content: (
        <>
          <p className="text-sm text-gray-600 mb-5">Скільки місяців життя ти хочеш покрити резервним фондом (на випадок без роботи)?</p>
          <input
            type="text"
            placeholder="Кількість місяців"
            value={formData.bufferMonths}
            onChange={e => handleChange('bufferMonths', e.target.value)}
            className="input mb-4 mr-3 border-b-1 border-b-blue-400"
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.hasBuffer}
              onChange={e => handleChange('hasBuffer', e.target.checked)}
            />
            У мене вже є подушка
          </label>
          {formData.hasBuffer && (
            <input
              type="text"
              placeholder="Сума"
              value={formData.bufferAmount || ''}
              onChange={e => handleChange('bufferAmount', e.target.value)}
              className="input mb-4 mr-3 border-b-1 border-b-blue-400"
            />
          )}
        </>
      )
    },
    {
      title: 'Крок 6: Готовність інвестувати',
      content: (
        <>
          <p className="text-sm text-gray-600 mb-5">Скільки ти реально готовий(а) відкладати на інвестиції щомісяця?</p>
          <input
            type="text"
            placeholder="Сума щомісяця"
            value={formData.monthlyInvestment}
            onChange={e => handleChange('monthlyInvestment', e.target.value)}
            className="input mb-4 mr-3 border-b-1 border-b-blue-400"
          />
          <select
            value={formData.investmentType}
            onChange={e => handleChange('investmentType', e.target.value)}
            className="input"
          >
            <option value="regular">Регулярно</option>
            <option value="variable">Залежить від контрактів</option>
          </select>
        </>
      )
    },
    {
      title: 'Крок 7: Мета',
      content: (
        <>
          <p className="text-sm text-gray-600 mb-5">Яку суму хочеш накопичити за певний період? І яка твоя головна мета?</p>
          <input
            type="text"
            placeholder="Сума за період"
            value={formData.goalYear}
            onChange={e => handleChange('goalYear', e.target.value)}
            className="input mb-4 mr-3 border-b-1 border-b-blue-400"
          />
          <input
            type="text"
            placeholder="Мета (квартира, свобода від роботи...)"
            value={formData.goalReason}
            onChange={e => handleChange('goalReason', e.target.value)}
            className="input mb-4 mr-3 border-b-1 border-b-blue-400"
          />
        </>
      )
    },
    {
      title: 'Крок 8: Період плану',
      content: (
        <>
          <p className="text-sm text-gray-600 mb-5">На скільки місяців хочеш будувати фінансовий план?</p>
          <input
            type="text"
            placeholder="6, 12 або 24 місяці..."
            value={formData.periodMonths}
            onChange={e => handleChange('periodMonths', e.target.value)}
            className="input mb-4 mr-3 border-b-1 border-b-blue-400"
          />
        </>
      )
    },
    {
      title: 'Крок 9: Деталізація витрат',
      content: (
        <>
          <input type="text" placeholder="Житло (оренда, комуналка)" value={formData.housing} onChange={e => setFormData(prev => ({ ...prev, housing: e.target.value }))} className="input mb-3" />
          <input type="text" placeholder="Їжа (магазин, доставка)" value={formData.food} onChange={e => setFormData(prev => ({ ...prev, food: e.target.value }))} className="input mb-3" />
          <input type="text" placeholder="Кафе та ресторани" value={formData.cafes} onChange={e => setFormData(prev => ({ ...prev, cafes: e.target.value }))} className="input mb-3" />
          <input type="text" placeholder="Розваги, подорожі, хобі" value={formData.entertainment} onChange={e => setFormData(prev => ({ ...prev, entertainment: e.target.value }))} className="input mb-3" />
          <input type="text" placeholder="Інше (звʼязок, транспорт...)" value={formData.otherExpenses} onChange={e => setFormData(prev => ({ ...prev, otherExpenses: e.target.value }))} className="input mb-3" />
        </>
      )
    },
    {
      title: 'Крок 10: Заплановані великі витрати',
      content: (
        <>
          <input type="text" placeholder="Опис запланованих витрат" value={formData.plannedExpensesDesc} onChange={e => setFormData(prev => ({ ...prev, plannedExpensesDesc: e.target.value }))} className="input mb-3" />
          <input type="text" placeholder="Сума" value={formData.plannedExpensesAmount} onChange={e => setFormData(prev => ({ ...prev, plannedExpensesAmount: e.target.value }))} className="input mb-3" />
        </>
      )
    },
    {
      title: 'Крок 11: Податковий статус і країна',
      content: (
        <>
          <input type="text" placeholder="Країна проживання / роботи" value={formData.country} onChange={e => setFormData(prev => ({ ...prev, country: e.target.value }))} className="input mb-3" />
          <input type="text" placeholder="Податковий статус або ФОП" value={formData.taxStatus} onChange={e => setFormData(prev => ({ ...prev, taxStatus: e.target.value }))} className="input mb-3" />
        </>
      )
    },
    {
      title: 'Крок 12: Фінансова поведінка',
      content: (
        <>
          <input type="text" placeholder="Чи ведеш облік витрат?" value={formData.tracksExpenses} onChange={e => setFormData(prev => ({ ...prev, tracksExpenses: e.target.value }))} className="input mb-3" />
          <input type="text" placeholder="Чи бувають емоційні витрати?" value={formData.emotionalSpending} onChange={e => setFormData(prev => ({ ...prev, emotionalSpending: e.target.value }))} className="input mb-3" />
          <input type="text" placeholder="Досвід у веденні бюджету" value={formData.budgetingExperience} onChange={e => setFormData(prev => ({ ...prev, budgetingExperience: e.target.value }))} className="input mb-3" />
        </>
      )
    },
    {
      title: 'Крок 13: Пріоритети та стиль інвестування',
      content: (
        <>
          <input type="text" placeholder="Що для тебе найважливіше?" value={formData.lifePriorities} onChange={e => setFormData(prev => ({ ...prev, lifePriorities: e.target.value }))} className="input mb-3" />
          <input type="text" placeholder="Інвестуєш активно чи пасивно?" value={formData.investmentStyle} onChange={e => setFormData(prev => ({ ...prev, investmentStyle: e.target.value }))} className="input mb-3" />
        </>
      )
    },
    {
      title: 'Крок 14: Поточні заощадження та інвестиції',
      content: (
        <>
          <input type="text" placeholder="Де зберігаєш гроші?" value={formData.currentSavings} onChange={e => setFormData(prev => ({ ...prev, currentSavings: e.target.value }))} className="input mb-3" />
          <input type="text" placeholder="Які інвестиції вже маєш?" value={formData.currentInvestments} onChange={e => setFormData(prev => ({ ...prev, currentInvestments: e.target.value }))} className="input mb-3" />
        </>
      )
    },
    {
      title: 'Крок 15: Досвід та ризик',
      content: (
        <>
          <input type="text" placeholder="Рівень толерантності до ризику" value={formData.riskTolerance} onChange={e => setFormData(prev => ({ ...prev, riskTolerance: e.target.value }))} className="input mb-3" />
          <input type="text" placeholder="Чи є досвід інвестування?" value={formData.investmentExperience} onChange={e => setFormData(prev => ({ ...prev, investmentExperience: e.target.value }))} className="input mb-3" />
        </>
      )
    },
    {
      title: 'Крок 16: Майбутні події',
      content: (
        <>
          <input type="text" placeholder="Наприклад: переїзд, навчання, дитина..." value={formData.futureEvents} onChange={e => setFormData(prev => ({ ...prev, futureEvents: e.target.value }))} className="input mb-3" />
        </>
      )
    },
    {
      title: 'Готово!',
      content: (
        <>
          <p className="mb-4">Натисни кнопку, щоб створити персональний PDF з фінансовим планом на основі твоїх відповідей.</p>
          <button onClick={handleSubmit} className="w-full rounded-xl bg-blue-500 px-6 py-3 text-white text-base font-semibold shadow-md hover:bg-blue-600 transition duration-300 ease-in-out">
            {loading ? (
              <p>Аналіз</p>
            ) : (
              <p>Створити мій фінансовий план</p>
            )}
          </button>
        </>
      )
    }
  ];

  const progress = Math.round((step / 17) * 100);

  return (
    <section className="h-[100dvh] flex flex-col justify-center items-center px-4 py-12 bg-gradient-to-tr from-blue-100 via-blue-200 to-blue-300">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-6 mb-10">
        <div className="flex flex-col text-sm text-gray-500 mb-4 text-right">
          <span>Крок {step} з 17</span>
          <span>{progress}%</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col"
          >
            {/* Кроки тут */}
            <h2 className="text-xl font-bold text-gray-800 mb-4">{steps[step - 1].title}</h2>
            {steps[step - 1].content}
            {step === steps.length && pdfUrl && (
              <div className="mt-6 flex flex-col items-center">
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-blue-600 underline text-base font-medium"
                >
                  📄 Переглянути мій PDF-фінплан
                </a>
                <p className="mt-3 text-sm text-justify text-gray-700">
                  🔐 Збережи цей файл, щоб мати доступ до свого фінансового плану й надалі. Якщо буде потрібна допомога — я поруч 💙
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-between items-center">
          {step > 1 ? (
            <button onClick={() => setStep(prev => prev - 1)} className="text-blue-600 cursor-pointer">← Назад</button>
          ) : <div />}
          {step < steps.length && (
            <button onClick={() => setStep(prev => prev + 1)} className="btn cursor-pointer">Далі →</button>
          )}
        </div>
      </div>
      <Link href="/" className="text-sm text-gray-600 hover:underline">Скасувати</Link>
    </section>
  );
}
