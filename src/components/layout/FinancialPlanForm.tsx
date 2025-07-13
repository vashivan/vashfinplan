'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import Link from 'next/link';

const currencies = ['USD', 'EUR', 'KRW', 'UAH'];

export default function FinancialPlanForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    income: '',
    currency: 'USD',
    expenses: '',
    hasDebt: false,
    debt: undefined,
    bufferMonths: '',
    hasBuffer: false,
    bufferAmount: undefined,
    monthlyInvestment: '',
    investmentType: 'regular',
    goalYear: '',
    goalReason: '',
    contact: '',
    periodMonths: '',
  });

  const handleChange = (key: string, value: number | string | boolean) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, steps.length));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

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
      };

      const res = await fetch('/api/financial-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsedData),
      });

      const result = await res.json();
      setPdfUrl(result.url);
      const BASE_URL = "https://vashfinplan.vercel.app/";
      const fileUrl = `${BASE_URL}${result.url}`;

      const emailData = {
        service_id: "service_4qzmcqt",
        template_id: "template_4tzi8uz",
        user_id: "JO5EenBZtLwYS-_-V",
        template_params: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          finplan: fileUrl,
          reply_to: formData.email,
        },
      };

      await axios.post('https://api.emailjs.com/api/v1.0/email/send', emailData);
    } catch (err) {
      console.error('Error submitting form or sending email', err);
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
      title: 'Готово!',
      content: (
        <>
          <p className="mb-4">Натисни кнопку, щоб створити персональний PDF з фінансовим планом на основі твоїх відповідей.</p>
          <button onClick={handleSubmit} disabled={loading} className="w-full rounded-xl bg-blue-500 px-6 py-3 text-white text-base font-semibold shadow-md hover:bg-blue-600 transition duration-300 ease-in-out">
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

  const progress = Math.round((step / steps.length) * 100);

  return (
    <section className="h-[100dvh] flex flex-col justify-center items-center px-4 py-12 bg-gradient-to-tr from-blue-100 via-blue-200 to-blue-300">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-6 mb-10">
        <div className="flex flex-col text-sm text-gray-500 mb-4 text-right">
          <span>Крок {step} з {steps.length}</span>
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
            <h2 className="text-xl font-bold text-gray-800 mb-4">{steps[step - 1].title}</h2>
            {steps[step - 1].content}
            {step === steps.length && pdfUrl && (
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block text-blue-600 underline"
              >
                📄 Переглянути мій PDF-фінплан
              </a>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-between items-center">
          {step > 1 ? (
            <button onClick={prevStep} className="text-blue-600 cursor-pointer">← Назад</button>
          ) : <div />}
          {step < steps.length && (
            <button onClick={nextStep} className="btn cursor-pointer">Далі →</button>
          )}
        </div>
      </div>

      <Link href="/" className="text-sm text-gray-600 hover:underline">Скасувати</Link>
    </section>
  );
}
