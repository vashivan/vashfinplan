'use client';

// import styles from "../../styles/HomePage.module.scss";
// import { useState } from 'react';
// import { CheckCircle, ArrowRight, Shield, CalendarClock, Mail, Phone, Instagram, User, Target, MessageCircle } from 'lucide-react';
// import { motion } from 'framer-motion';
import { LearnMore } from "./LearnMore";
import { useRef } from 'react';
import Header from "./Header";
import { BlackComponent } from "./BlackComponent";
import AboutMe from "./AboutMe";
import WhyMe from "./WhyMe";
import { FitCheckForm } from "./Form";

// ⚠️ Стилізація — Tailwind CSS. Компонент розрахований на Next.js App Router.
// За бажанням, заміни <section> блоки на власні компоненти. 

export default function HomePage() {
  // const [loading, setLoading] = useState(false);
  // const [success, setSuccess] = useState<string | null>(null);
  // const [error, setError] = useState<string | null>(null);

  // const [form, setForm] = useState({
  //   name: '',
  //   email: '',
  //   phone: '',
  //   instagram: '',
  //   contactMethod: 'email',
  //   topic: 'Фінансовий план',
  //   message: '',
  //   consent: true,
  // });

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  //   const { name, value, type } = e.target as HTMLInputElement;
  //   if (type === 'checkbox') {
  //     setForm((s) => ({ ...s, [name]: (e.target as HTMLInputElement).checked }));
  //   } else {
  //     setForm((s) => ({ ...s, [name]: value }));
  //   }
  // };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError(null);
  //   setSuccess(null);

  //   // Прості перевірки
  //   if (!form.name || !form.email || !form.message) {
  //     setError('Будь ласка, заповніть Ім’я, Email і Коротко про запит.');
  //     return;
  //   }

  //   try {
  //     setLoading(true);
  //     // ⚠️ Замініть /api/consultation на свій реальний endpoint
  //     const res = await fetch('/api/consultation', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ ...form, source: 'homepage' }),
  //     });

  //     if (!res.ok) throw new Error('Помилка відправки форми');

  //     setSuccess('Дякую! Ми зв’яжемося з вами протягом 24 годин.');
  //     setForm({
  //       name: '',
  //       email: '',
  //       phone: '',
  //       instagram: '',
  //       contactMethod: 'email',
  //       topic: 'Фінансовий план',
  //       message: '',
  //       consent: true,
  //     });
  //   } catch (error) {
  //     console.error('Помилка при відправленні форми', error);
  //     setError('Сталася несподівана помилка. Спробуйте пізніше.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const learnmoreRef = useRef<HTMLDivElement>(null);
  const checkRef = useRef<HTMLDivElement>(null);

  const scrollToAdvantages = () => {
    if (learnmoreRef.current) {
      learnmoreRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  const scrollToFitCheck = () => {
    if (checkRef.current) {
      checkRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }


  return (
    <main className="mb-10">
      <Header buttonClick={scrollToAdvantages} />
      <BlackComponent props={'Насолоджуйся сьогоднішнім днем без шкоди для завтрашнього'} />
      <LearnMore ref={learnmoreRef} />
      <AboutMe buttonClick={scrollToFitCheck} />
      <BlackComponent
        props={`Життя на повну починається з розумних фінансових кроків.`}
      />
      <WhyMe />
      <FitCheckForm ref={checkRef} />
    </main>
    // <main className={`${styles.homepage} min-h-screen bg-transparent`}>


    //   <section className="mx-auto max-w-6xl px-4 sm:px-8 lg:px-10 py-12">
    //     <h3 className="text-xl text-center font-semibold mb-6">Мої компетенції</h3>
    //     <div className="grid md:grid-cols-3 gap-6">
    //       {[
    //         { title: 'Старт інвестицій', text: 'Відкриття брокера, перший портфель, дисципліна внесків.' },
    //         { title: 'Фінплан 360°', text: 'Бюджет, подушка, борги, інвестиції, цілі — в одну систему.' },
    //         { title: 'Освітні сесії', text: 'ETF, індекси, бонди, ризик — просто і на прикладах.' },
    //       ].map((s) => (
    //         <div key={s.title} className="rounded-3xl border border-orange-950 bg-white/50 p-6">
    //           <h3 className="text-lg font-semibold">{s.title}</h3>
    //           <p className="mt-2">{s.text}</p>
    //         </div>
    //       ))}
    //     </div>
    //   </section>

    //   <section id="offer" className="mx-auto max-w-6xl px-4 sm:px-8 lg:px-10 py-12">
    //     <div className="grid  gap-8 rounded-3xl border border-zinc-800/60 bg-zinc-900/20 p-6 md:p-8">
    //       {/* LEFT: summary */}
    //       <div>
    //         <h2 className="text-2xl md:text-3xl font-semibold">Пакет «Старт за $100»</h2>
    //         <p className="text-slate-100 mt-3">Повний супровід для швидкого і безболісного старту інвестування: <span className="font-medium">розбір фінансової ситуації</span>, <span className="font-medium">складання індивідуального плану</span>, <span className="font-medium">відкриття брокерського рахунку</span> та <span className="font-medium">підбір цінних паперів</span> у стартовий портфель.</p>

    //         <div className="mt-5 flex flex-col items-start gap-3">
    //           <div className="flex items-baseline gap-2">
    //             <span className="text-4xl font-semibold">$100</span>
    //             <span className="text-sm">разово</span>
    //           </div>
    //           <a href="#consult" className="inline-flex items-center gap-2 rounded-2xl bg-orange-950 text-slate-100 px-5 py-3 font-semibold shadow-md hover:shadow-lg transition">
    //             Записатися <ArrowRight size={18} />
    //           </a>
    //         </div>

    //         <div className="mt-5 text-sm text-orange-950">
    //           <p>Формат: онлайн (Zoom/Meet). Оплата до старту роботи, після першої зустрічі. Підтримка після сесії — 7 днів у чаті для уточнень.</p>
    //           <p className="mt-1">Партнерство: частина команди <span className="font-semibold">Brave Capital</span>.</p>
    //         </div>
    //       </div>

    //       {/* RIGHT: details */}
    //       <div className="grid gap-4 grid-cols-2">
    //         <div className="rounded-2xl border border-zinc-800/60 p-4 bg-zinc-950/40 col-span-2">
    //           <p className="font-medium text-slate-100">Що входить</p>
    //           <ul className="mt-2 space-y-2 text-zinc-300 text-sm">
    //             <li className="flex gap-2"><CheckCircle size={16} className="mt-0.5" /> Діагностика: дохід/витрати, подушка, борги, цілі (анкета + бріф-дзвінок 15–20 хв)</li>
    //             <li className="flex gap-2"><CheckCircle size={16} className="mt-0.5" /> Основна консультація 60–90 хв (стратегія, ризик-профіль, правила внесків)</li>
    //             <li className="flex gap-2"><CheckCircle size={16} className="mt-0.5" /> Персональний фінплан (PDF): структура бюджету, розмір внесків, таймлайн, правила ризик-менеджменту</li>
    //             <li className="flex gap-2"><CheckCircle size={16} className="mt-0.5" /> Відкриття брокерського рахунку: інструкції та супровід (KYC, депозити, верифікація)</li>
    //             <li className="flex gap-2"><CheckCircle size={16} className="mt-0.5" /> Базовий портфель: ETF/облігації за ризик-профілем + правила ребалансування</li>
    //             <li className="flex gap-2"><CheckCircle size={16} className="mt-0.5" /> Чек-лист дій і корисні матеріали (гайди, посилання)</li>
    //           </ul>
    //         </div>

    //         <div className="rounded-2xl border border-zinc-800/60 p-4 bg-zinc-950/40 col-span-2">
    //           <p className="font-medium text-slate-100">Результати / артефакти</p>
    //           <ul className="mt-2 space-y-2 text-zinc-300 text-sm">
    //             <li>PDF-фінплан із пріоритетами та сумами внесків</li>
    //             <li>Шаблон стартового портфеля (ETF/бонди) з розподілом %</li>
    //             <li>Покрокова інструкція до відкриття брокера</li>
    //             <li>Чек-лист: подушка безпеки, автоматизація внесків</li>
    //           </ul>
    //         </div>

    //         <div className="rounded-2xl border border-zinc-800/60 p-4 bg-zinc-950/40 col-span-2">
    //           <p className="font-medium text-slate-100">Процес і таймлайн</p>
    //           <ol className="mt-2 space-y-2 text-zinc-300 text-sm list-decimal list-inside">
    //             <li>Анкета + бріф (15–20 хв)</li>
    //             <li>3 основні сесії (60–90 хв)</li>
    //             <li>Матеріали протягом 24–48 год</li>
    //             <li>7 днів підтримки в чаті</li>
    //           </ol>
    //         </div>

    //         <div className="rounded-2xl border border-zinc-800/60 p-4 bg-zinc-950/40 col-span-2">
    //           <p className="font-medium text-slate-100">Бонуси</p>
    //           <ul className="mt-2 space-y-2 text-zinc-300 text-sm">
    //             <li>Список рекомендованих ETF за рівнями ризику</li>
    //             <li>Міні-гайд з податків і резидентства (базові принципи)</li>
    //             <li>Шаблон Google Sheet для обліку внесків</li>
    //           </ul>
    //         </div>

    //         <div className="rounded-2xl border border-zinc-800/60 p-4 bg-zinc-950/40 col-span-2">
    //           <p className="font-medium text-slate-100">Кому підходить</p>
    //           <ul className="mt-2 space-y-2 text-zinc-300 text-sm">
    //             <li>Новачкам, які хочуть стартувати без помилок</li>
    //             <li>Тим, хто потребує чітких правил і дисципліни внесків</li>
    //             <li>Фрілансерам/контрактникам зі змінним доходом</li>
    //           </ul>
    //         </div>

    //         <div className="rounded-2xl border border-zinc-800/60 p-4 bg-zinc-950/40 col-span-2">
    //           <p className="font-medium text-slate-100">Кому не підходить</p>
    //           <ul className="mt-2 space-y-2 text-zinc-300 text-sm">
    //             <li>Тим, хто очікує «швидких грошей» або гарантій доходності</li>
    //             <li>Тим, хто хоче глибокий сток-пікінг/трейдинг у цьому пакеті</li>
    //           </ul>
    //         </div>

    //         <div className="rounded-2xl border border-zinc-800/60 p-4 bg-zinc-950/40 col-span-2">
    //           <p className="font-medium text-slate-100">Що потрібно від вас</p>
    //           <ul className="mt-2 space-y-2 text-zinc-300 text-sm">
    //             <li>Заповнити коротку анкету (доходи/витрати/цілі)</li>
    //             <li>Підтвердити особу для брокера (паспорт/ID, адреса)</li>
    //             <li>Встановити зручний спосіб поповнення (картка/Revolut/Wise)</li>
    //           </ul>
    //         </div>

    //         <div className="rounded-2xl border border-zinc-800/60 p-4 bg-zinc-950/40 col-span-2">
    //           <p className="font-medium text-slate-100">Додаткові опції</p>
    //           <ul className="mt-2 space-y-2 text-zinc-300 text-sm">
    //             <li><span className="font-medium">Річний супровід</span> (+$150): відповіді в чаті, дзінки, корекції портфеля</li>
    //             <li><span className="font-medium">Поглиблений портфель</span> (+$50): детальні пояснення секторів/ETF, сесії 1:1 з розбору цінних паперів</li>
    //           </ul>
    //         </div>

    //         <div className="rounded-2xl border border-zinc-800/60 p-4 bg-zinc-950/40 col-span-2">
    //           <p className="font-medium text-slate-100">Умови та дисклеймер</p>
    //           <ul className="mt-2 space-y-2 text-zinc-300 text-sm">
    //             <li>Оплата: картка / Revolut / Wise (квитанція на email)</li>
    //             <li>Перенесення/скасування: за 24 год — безкоштовно</li>
    //             <li>Матеріали носять освітній характер і не є інвестрекомендацією. Інвестиції пов’язані з ризиком.</li>
    //           </ul>
    //         </div>
    //       </div>
    //     </div>
    //   </section>

    //   <section id="consult" className="mx-auto max-w-6xl px-4 sm:px-8 lg:px-10 py-14">
    //     <div className="rounded-3xl border bg-white/50  p-6 md:p-8">
    //       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    //         <div className="w-full">
    //           <h2 className="text-2xl md:text-3xl font-semibold text-center w-full">Запис на консультацію</h2>
    //           <p className="mt-2 text-center">Перший дзвінок — щоб познайомитися, окреслити цілі та кроки.</p>
    //         </div>
    //       </div>

    //       <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
    //         <div className="col-span-1">
    //           <label className="text-sm flex items-center gap-2"><User size={16} /> Ім’я</label>
    //           <input name="name" value={form.name} onChange={handleChange} placeholder="Ваше ім’я" className="mt-1 w-full rounded-2xl border border-zinc-800/60 px-4 py-3 outline-none focus:ring-2 focus:ring-amber-400" />
    //         </div>

    //         <div className="col-span-1">
    //           <label className="text-sm flex items-center gap-2"><Mail size={16} /> Email</label>
    //           <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@email.com" className="mt-1 w-full rounded-2xl border border-zinc-800/60 px-4 py-3 outline-none focus:ring-2 focus:ring-amber-400" />
    //         </div>

    //         <div className="col-span-1">
    //           <label className="text-sm flex items-center gap-2"><Phone size={16} /> Телефон / WhatsApp</label>
    //           <input name="phone" value={form.phone} onChange={handleChange} placeholder="+82 ... / +380 ..." className="mt-1 w-full rounded-2xl border border-zinc-800/60 px-4 py-3 outline-none focus:ring-2 focus:ring-amber-400" />
    //         </div>

    //         <div className="col-span-1">
    //           <label className="text-sm flex items-center gap-2"><Instagram size={16} /> Instagram</label>
    //           <input name="instagram" value={form.instagram} onChange={handleChange} placeholder="@vash_ivan" className="mt-1 w-full rounded-2xl border border-zinc-800/60 px-4 py-3 outline-none focus:ring-2 focus:ring-amber-400" />
    //         </div>

    //         <div className="col-span-1">
    //           <label className="text-sm flex items-center gap-2"><Target size={16} /> Тема</label>
    //           <select name="topic" value={form.topic} onChange={handleChange} className="mt-1 w-full rounded-2xl border border-zinc-800/60 px-4 py-3 outline-none focus:ring-2 focus:ring-amber-400">
    //             <option>Фінансовий план</option>
    //             <option>Старт інвестицій</option>
    //             <option>ETF / Портфель</option>
    //             <option>Облігації США</option>
    //             <option>Податки та статус</option>
    //             <option>Індивідуальне питання</option>
    //           </select>
    //         </div>

    //         <div className="col-span-1">
    //           <label className="text-sm  flex items-center gap-2">Зв’язок зручніше</label>
    //           <select name="contactMethod" value={form.contactMethod} onChange={handleChange} className="mt-1 w-full rounded-2xl border border-zinc-800/60 px-4 py-3 outline-none focus:ring-2 focus:ring-amber-400">
    //             <option value="email">Email</option>
    //             <option value="whatsapp">WhatsApp</option>
    //             <option value="instagram">Instagram DM</option>
    //             <option value="phone">Телефон</option>
    //           </select>
    //         </div>

    //         <div className="col-span-1 md:col-span-2">
    //           <label className="text-sm">Коротко про запит / цілі</label>
    //           <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Розкажіть, на якому ви етапі та що хочете досягти" className="mt-1 w-full rounded-2xl border border-zinc-800/60 px-4 py-3 outline-none focus:ring-2 focus:ring-amber-400" />
    //         </div>

    //         <div className="col-span-1 md:col-span-2 flex items-start gap-3 text-sm text-zinc-400">
    //           <input type="checkbox" id="consent" name="consent" checked={form.consent} onChange={handleChange} className="mt-1" />
    //           <label htmlFor="consent">Погоджуюсь на обробку контактних даних з метою організації консультації.</label>
    //         </div>

    //         {error && <div className="col-span-1 md:col-span-2 text-sm text-red-400">{error}</div>}
    //         {success && <div className="col-span-1 md:col-span-2 text-sm text-emerald-400">{success}</div>}

    //         <div className="col-span-1 md:col-span-2">
    //           <button type="submit" disabled={loading} className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-950 text-slate-100 px-6 py-3 font-semibold shadow-md hover:shadow-lg transition disabled:opacity-60 cursor-pointer">
    //             {loading ? 'Відправляємо…' : 'Надіслати заявку'} <ArrowRight size={18} />
    //           </button>
    //         </div>
    //       </form>
    //     </div>
    //   </section>

    //   <section className="mx-auto max-w-6xl px-4 sm:px-8 lg:px-10 pb-20">
    //     <h2 className="text-2xl md:text-3xl font-semibold text-center">Питання та відповіді</h2>
    //     <div className="mt-6 grid md:grid-cols-2 gap-4">
    //       {[
    //         { q: 'З чого почати, якщо я новачок?', a: 'З короткої зустрічі: визначимо цілі, підберемо брокера та перший ETF-портфель.' },
    //         { q: 'Чи є мінімальна сума?', a: 'Почати можна з невеликих сум (навіть 50–100$ на місяць), головне — регулярність.' },
    //         { q: 'Чи допомагаєш з податками?', a: 'Так, розбираємо базові питання з оподаткуванням та резидентством в різних країнах.' },
    //         { q: 'Як проходить консультація?', a: 'Онлайн у зручному форматі: відеодзвінок + короткі підсумки з кроками.' },
    //       ].map((f) => (
    //         <div key={f.q} className="rounded-2xl border border-zinc-800/60 p-4 bg-white/50">
    //           <p className="font-medium">{f.q}</p>
    //           <p className="text-sm mt-1">{f.a}</p>
    //         </div>
    //       ))}
    //     </div>
    //   </section>
    // </main>
  );
}
