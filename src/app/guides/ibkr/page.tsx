import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function IBKRGuidePage() {
  return (
    <main className="flex flex-col items-center justify-between px-4 pt-16 pb-6 bg-gradient-to-tr from-blue-400 via-blue-300 to-blue-200 text-gray-900">
      <h1 className="flex text-4xl font-bold mb-6 text-center">📘 Інструкція: Як відкрити рахунок у IBKR</h1>
      <p className="text-lg text-gray-700 mb-10 text-justify">
        Покроковий гайд для артистів, фрілансерів та всіх, хто хоче інвестувати за кордоном через
        надійного міжнародного брокера — Interactive Brokers.
      </p>

      <section className="w-full max-w-3xl bg-white/20 rounded-2xl shadow-lg p-8 mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">🔍 Що таке IBKR?</h2>
        <p className="text-gray-700">
          Interactive Brokers — один із найнадійніших брокерів у світі з доступом до акцій, ETF,
          облігацій та інших інструментів. Працює з нерезидентами та дозволяє відкривати рахунок онлайн.
        </p>
      </section>

      <section className="w-full max-w-3xl bg-white/20 rounded-2xl shadow-lg p-8 mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">📑 Що потрібно для реєстрації?</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Паспорт або ID-карта</li>
          <li>Адреса проживання за кордоном (можна тимчасова)</li>
          <li>Підтвердження джерела доходу (контракт, довідка або банківський рух)</li>
          <li>Податковий номер (за потреби)</li>
        </ul>
      </section>

      <section className="w-full max-w-3xl bg-white/20 rounded-2xl shadow-lg p-8 mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">🧭 Покрокова інструкція</h2>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Перейдіть на сайт <Link href="https://www.interactivebrokers.com/" target="_blank" className="text-blue-600 underline">interactivebrokers.com</Link></li>
          <li>Натисніть “Open Account” та створіть логін</li>
          <li>Заповніть анкету (особисті дані, досвід, джерела коштів)</li>
          <li>Завантажте документи для верифікації</li>
          <li>Після активації — поповніть рахунок через Wise або SEPA</li>
        </ol>
      </section>

      <section className="w-full max-w-3xl bg-white/20 rounded-2xl shadow-lg p-8 mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">💡 Поради</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Підготуйте всі документи заздалегідь (PDF або фото)</li>
          <li>Використовуйте англійську мову в анкеті</li>
          <li>Рекомендую поповнювати через Wise (низька комісія і швидкість)</li>
          <li>Не лякайтесь великої анкети — це нормально для європейських брокерів</li>
        </ul>
      </section>

      <Footer />
    </main>
  );
}