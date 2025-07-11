// app/guides/invest-portfolio/page.tsx
import Footer from "../../../components/layout/Footer";

export default function InvestPortfolioPage() {
  return (
    <main className="flex flex-col items-center justify-between px-4 pt-16 pb-6 bg-gradient-to-tr from-blue-400 via-blue-300 to-blue-200 text-gray-900">
      <h1 className="text-4xl font-bold mb-6 text-center">🧩 Як сформувати перший інвестпортфель</h1>
      <p className="text-lg text-gray-700 mb-10 text-justify">
        Хочеш інвестувати розумно і стабільно? Цей гайд допоможе сформувати базовий ETF-портфель, який підходить для більшості початківців і не вимагає щоденного контролю.
      </p>

      <section className="w-full max-w-3xl bg-white/20 rounded-2xl shadow-lg p-8 mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">📦 Чому варто мати інвестпортфель?</h2>
        <p className="text-gray-700">
          Портфель дозволяє розподілити гроші між різними активами, зменшити ризики та інвестувати системно. Це основа довгострокового зростання.
        </p>
      </section>

      <section className="w-full max-w-3xl bg-white/20 rounded-2xl shadow-lg p-8 mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">📊 Базова стратегія для новачків</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li><strong>70% – глобальний ETF</strong> (наприклад, VWCE)</li>
          <li><strong>20% – ринки, що розвиваються</strong> (наприклад, EMIM)</li>
          <li><strong>10% – облігації</strong> (наприклад, EUR Government Bond)</li>
        </ul>
        <p className="text-gray-700 mt-4">
          Така структура підходить для довгострокових інвесторів із середньою толерантністю до ризику.
        </p>
      </section>

      <section className="w-full max-w-3xl bg-white/20 rounded-2xl shadow-lg p-8 mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">🔄 Що таке ребалансування?</h2>
        <p className="text-gray-700">
          Ребалансування — це періодичне відновлення пропорцій у портфелі. Наприклад, якщо акції виросли й стали займати 80% замість 70%, частину можна продати й докупити облігацій, щоб повернути баланс.
        </p>
      </section>

      <section className="w-full max-w-3xl bg-white/20 rounded-2xl shadow-lg p-8 mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">🚫 Типові помилки початківців</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Інвестують все й одразу, без фінансової подушки</li>
          <li>Скупляють забагато ETF без розуміння</li>
          <li>Постійно змінюють портфель під новини</li>
          <li>Інвестують без цілі та стратегії</li>
        </ul>
      </section>

      <Footer />
    </main>
  );
}