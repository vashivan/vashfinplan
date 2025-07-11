// app/brokers/page.tsx
import Link from "next/link";
import Footer from "./Footer";

export default function BrokersPage() {
  return (
    <main className="flex flex-col items-center justify-between px-4 pt-16 pb-6 bg-gradient-to-tr from-blue-400 via-blue-300 to-blue-200 text-gray-900">
      <h1 className="flex text-4xl font-bold mb-6 text-center">🧭 Брокери для інвесторів-початківців</h1>
      <p className="text-lg text-gray-700 mb-10 text-justify">
        Якщо ти хочеш нарешті взяти фінанси під контроль, почати інвестувати та створити капітал без страху за майбутнє — ця сторінка допоможе обрати надійного брокера та зробити перший крок.
      </p>

      {/* Рекомендації */}
      <section className="mb-10 flex flex-col text-center">
        <h2 className="text-2xl font-semibold mb-4">🔒 На що звертати увагу при виборі брокера:</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          <li>✅ Ліцензія та країна реєстрації</li>
          <li>💰 Мінімальний депозит</li>
          <li>📱 Зручний додаток або веб</li>
          <li>💳 Способи поповнення та виводу</li>
          <li>📦 Інструменти: ETF, акції, облігації</li>
          <li>🧾 Комісії та приховані платежі</li>
        </ul>
      </section>

      {/* Брокери */}
      <section className="space-y-12">
        {brokers.map((broker) => (
          <div key={broker.name} className="w-full max-w-3xl bg-white/20 rounded-2xl shadow-lg p-8 mb-12">
            <h3 className="text-2xl font-semibold mb-2 text-blue-600">{broker.name}</h3>
            <p className="text-gray-700 mb-4">{broker.description}</p>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              {broker.details.map((detail, i) => (
                <li key={i}>{detail}</li>
              ))}
            </ul>
            <div className="mt-4">
              <p className="text-green-700 font-medium">🟢 Плюси: {broker.pros}</p>
              <p className="text-red-600 font-medium">🔴 Мінуси: {broker.cons}</p>
              <p className="mt-2">👉 <span className="italic">Кому підходить:</span> {broker.target}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Бонусна секція */}
      <section className="mt-16">
        <h2 className="text-2xl text-center font-semibold mb-3">📥 Як поповнювати рахунок?</h2>
        <p className="text-justify text-gray-700">
          Для більшості брокерів зручно використовувати <strong>Wise</strong> — сервіс міжнародних переказів з
          низькими комісіями та локальними реквізитами. Підходить для переказів у Європу, США, Азію.
        </p>
      </section>

      {/* Посилання */}
      <section className="mt-16">
        <h2 className="text-2xl text-center font-semibold mb-6">📎 Що далі?</h2>
        <div className="grid gap-4 sm:grid-cols-1">
          {/* IBKR PDF */}
          <Link
            href="/guides/ibkr"
            target="_blank"
            className="flex flex-col items-center bg-white/20 rounded-2xl shadow-lg mb-5 p-4 hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-blue-700">📘 Інструкція: Як відкрити рахунок у IBKR</h3>
            <p className="text-gray-600 text-sm text-justify mt-1">
              Покроковий PDF-гайд для реєстрації та поповнення рахунку в Interactive Brokers.
            </p>
          </Link>

          {/* ETF порівняння */}
          <Link
            href="/guides/etfcomparison"
            target="_blank"
            className="flex flex-col items-center bg-white/20 rounded-2xl shadow-lg  mb-5 p-4 hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-blue-700">📊 Порівняння ETF на S&P500</h3>
            <p className="text-gray-600 text-sm text-justify mt-1">
              Зручна таблиця з популярними фондами, комісіями (TER) та відмінностями.
            </p>
          </Link>

          {/* Інвестпортфель */}
          <Link
            href="/guides/investportfolio"
            target="_blank"
            className="flex flex-col items-center bg-white/20 rounded-2xl shadow-lg mb-5 p-4 hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-blue-700">🧩 Як сформувати перший інвестпортфель</h3>
            <p className="text-gray-600 text-sm text-justify mt-1">
              Базовий підхід до побудови портфелю з ETF, приклади та пояснення.
            </p>
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}

const brokers = [
  {
    name: "Interactive Brokers (IBKR)",
    description: "Надійний міжнародний брокер зі США з доступом до глобальних ринків.",
    details: [
      "📍 Країна: США",
      "💰 Мін. депозит: $0",
      "📱 Додаток: iOS / Android",
      "💳 Поповнення: Wise, банківський переказ",
      "📦 Інструменти: ETF, акції, облігації, опціони"
    ],
    pros: "дуже надійний, низькі комісії, підтримка українців",
    cons: "складний інтерфейс",
    target: "довгостроковим інвесторам, які готові розібратись у функціоналі"
  },
  {
    name: "Trading212",
    description: "Європейський брокер із простим додатком і нульовими комісіями.",
    details: [
      "📍 Країна: Велика Британія",
      "💰 Мін. депозит: €1",
      "📱 Мобільний додаток та веб",
      "💳 Поповнення: банківська картка",
      "📦 Інструменти: ETF, акції, дробові частки"
    ],
    pros: "простий, підходить новачкам, дробові акції",
    cons: "не підтримує всі країни",
    target: "тим, хто хоче інвестувати легко і без комісій"
  },
  {
    name: "Freedom Finance Europe",
    description: "Брокер з доступом до IPO і підтримкою українців.",
    details: [
      "📍 Країна: Кіпр / Казахстан",
      "💰 Мін. депозит: €100",
      "📱 Додаток: є",
      "💳 Поповнення: SEPA / Swift",
      "📦 Інструменти: IPO, акції, облігації"
    ],
    pros: "доступ до IPO, локалізована підтримка",
    cons: "повільне виведення, комісії на обслуговування",
    target: "тим, хто хоче брати участь в IPO або купувати єврооблігації"
  },
  {
    name: "eToro",
    description: "Соцтрейдинг-платформа для ETF, акцій і крипти.",
    details: [
      "📍 Країна: Кіпр",
      "💰 Мін. депозит: $50",
      "📱 Зручний додаток",
      "💳 Поповнення: картка, PayPal",
      "📦 Інструменти: ETF, акції, крипта"
    ],
    pros: "простий, можливість копіювати інвесторів",
    cons: "високі спреди, комісії на вивід",
    target: "для тих, хто хоче все робити з мобільного"
  }
];
