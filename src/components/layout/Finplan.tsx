'use client'

import Link from 'next/link';

export default function Finplan() {
  return (
    <main className="flex flex-col items-center justify-between px-4 pt-16 pb-6 bg-transparent text-gray-900">
      {/* HERO */}
      <section className="max-w-3xl text-center mb-12 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
          Твій перший <span className="text-blue-600">фінансовий план</span> 💸
        </h1>
        <p className="text-lg text-gray-700">
          Ти — артист, креативник або просто людина, що живе в ритмі проектів і контрактів?
          Пора взяти фінанси під контроль. Без нудної теорії, складних термінів і страхів за майбутнє.
          Почни з простого — свого персонального фінансового плану.
        </p>
      </section>

      {/* Що отримаєш */}
      <section className="w-full max-w-3xl bg-white/20 rounded-2xl shadow-lg p-8 mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Що ти отримаєш</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Персональний PDF-фінплан на основі твоїх відповідей</li>
          <li>Поради: як почати інвестувати без досвіду</li>
          <li>Рекомендовані ETF (для початківців)</li>
          <li>Прості розрахунки: дохід, витрати, подушка, інвестиції</li>
        </ul>
      </section>

      {/* CTA */}
      <section className="text-center mb-10">
        <p className="text-lg text-gray-700 mb-6">
          Всього декілька кроків — і ти отримаєш план, з якого можна реально почати.
        </p>
        <Link href="/form">
          <button className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-md text-lg font-semibold">
            Почати ➔
          </button>
        </Link>
      </section>
    </main>
  );
}
