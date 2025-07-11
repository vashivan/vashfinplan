import Footer from "../../../components/layout/Footer";

export default function ETFComparisonPage() {
  return (
    <main className="flex flex-col items-center justify-between px-4 pt-16 pb-6 bg-gradient-to-tr from-blue-400 via-blue-300 to-blue-200 text-gray-900">
      <h1 className="text-4xl font-bold mb-6 text-center">📊 Порівняння ETF на S&P500</h1>
      <p className="text-lg text-gray-700 mb-10 text-justify">
        Якщо ти плануєш інвестувати в американський ринок, варто розглянути ETF, які відображають динаміку індексу S&P500. Ось кілька популярних варіантів і як їх обрати.
      </p>

      <section className="w-full max-w-3xl bg-white/20 rounded-2xl shadow-lg p-8 mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">🔍 Що таке ETF на S&P500?</h2>
        <p className="text-gray-700">
          ETF — це інвестиційний фонд, який можна купити як акцію. S&P500 — індекс 500 найбільших компаній США. ETF на цей індекс дає можливість вкластися одразу у всі ці компанії через один інструмент.
        </p>
      </section>

      <section className="w-full max-w-3xl bg-white/20 rounded-2xl shadow-lg p-8 mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">📊 Таблиця порівняння</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead>
              <tr className="border-b border-gray-400">
                <th className="py-2 px-2">Назва</th>
                <th className="px-2">Тікер</th>
                <th className="px-2">TER</th>
                <th className="px-2">Валюта</th>
                <th className="px-2">Тип виплат</th>
                <th className="px-2">Платформа</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-300">
                <td className="px-2 py-1">iShares Core S&P500</td>
                <td className="px-2">CSP1</td>
                <td className="px-2">0.07%</td>
                <td className="px-2">USD</td>
                <td className="px-2">Accumulating</td>
                <td className="px-2">IBKR</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="px-2 py-1">Vanguard S&P500</td>
                <td className="px-2">VUSA</td>
                <td className="px-2">0.07%</td>
                <td className="px-2">USD</td>
                <td className="px-2">Distributing</td>
                <td className="px-2">Trading212</td>
              </tr>
              <tr>
                <td className="px-2 py-1">SPDR S&P500</td>
                <td className="px-2">SPY</td>
                <td className="px-2">0.09%</td>
                <td className="px-2">USD</td>
                <td className="px-2">Distributing</td>
                <td className="px-2">eToro</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="w-full max-w-3xl bg-white/20 rounded-2xl shadow-lg p-8 mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">💡 Як обрати ETF?</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Хочеш автоматичне реінвестування — обирай <strong>Accumulating</strong> фонд</li>
          <li>Потрібен регулярний дохід — <strong>Distributing</strong> фонд з дивідендами</li>
          <li>Дивись на <strong>TER</strong> — чим нижче, тим краще</li>
          <li>Перевір, чи є фонд на твоїй платформі (IBKR, T212, eToro)</li>
        </ul>
      </section>

      <Footer />
    </main>
  );
}
