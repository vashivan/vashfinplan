'use client';

import { CheckCircle, Instagram, MessageCircle } from 'lucide-react';
import React from 'react';


export default function WhyMe() {
  return (
    <section id="about" className="relative px-4 sm:px-8 lg:px-10 py-20">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Ліва колонка */}
        <div>
          <h2 className="text-3xl text-orange-950 md:text-4xl font-semibold">Про мене</h2>
          <p className="mt-5 text-lg text-orange-950 leading-relaxed">
            Я фінансовий радник та інвестор. Мій підхід — <span className="font-medium">без складної термінології</span> і з практичними кроками:
            розберемо ваші доходи, витрати, цілі, побудуємо <span className="font-medium">персональний фінплан</span> і підберемо інструменти
            (ETF, облігації, індекси).
          </p>

          <ul className="mt-7 space-y-3 text-orange-950">
            <li className="flex gap-3">
              <CheckCircle size={18} className="mt-1 text-orange-950" />
              1:1 консультації — стратегія, ризик-профіль, старт інвестицій
            </li>
            <li className="flex gap-3">
              <CheckCircle size={18} className="mt-1 text-orange-950" />
              Навчальні матеріали, воркшопи та сесії
            </li>
            <li className="flex gap-3">
              <CheckCircle size={18} className="mt-1 text-orange-950" />
              Супровід за потреби — від відкриття брокера до першого повноцінного портфеля
            </li>
          </ul>

          <div className="mt-8 flex items-center gap-5 text-sm">
            <a
              href="https://instagram.com/vash_ivan"
              target="_blank"
              rel="noopener"
              className="inline-flex text-orange-950 items-center gap-2 hover:text-orange-700 transition"
            >
              <Instagram size={16} /> Instagram
            </a>
            <a
              href="#"
              className="inline-flex text-orange-950 items-center gap-2 hover:text-orange-700 transition"
            >
              <MessageCircle size={16} /> Telegram
            </a>
          </div>
        </div>

        {/* Права колонка */}
        <div className="border border-zinc-200 bg-white/40 p-6">
          <h3 className="text-xl text-center text-orange-950 md:text-2xl font-semibold">Що отримаєш після першої сесії</h3>
          <div className="mt-6 grid sm:grid-cols-2 gap-5">
            {[
              { title: 'Мапа цілей', desc: 'Чітке формулювання фінансових цілей та пріоритетів.' },
              { title: 'План дій', desc: 'Кроки на 1–3 місяці: брокер, інструменти, розмір внесків.' },
              { title: 'Розуміння інвестицій', desc: 'Як працює біржа, брокер та що таке акція.' },
              { title: 'Сесія питання-відповідь', desc: 'Час для кращого розуміння себе та своіх реальних можливостей.' },
            ].map((i) => (
              <div key={i.title} className="border border-zinc-200 bg-orange-950/10 p-4 text-center">
                <p className="font-bold text-orange-950">{i.title}</p>
                <p className="text-sm mt-1 text-zinc-600">{i.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
