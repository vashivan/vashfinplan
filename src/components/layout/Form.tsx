'use client';

import React, { useState, forwardRef } from "react";

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
  hpt: string; // honeypot
};

type FitCheckProps = React.HTMLAttributes<HTMLDivElement>;

export const FitCheckForm = forwardRef<HTMLDivElement, FitCheckProps>(
  (props, ref) => {
    const { className = "", ...rest } = props;

    const [formData, setFormData] = useState<FormData>({
      name: "",
      email: "",
      phone: "",
      message: "",
      hpt: "",
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      setStatus("idle");

      try {
        const res = await fetch("/api/fit-check", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message, // <-- під бекенд
            hpt: formData.hpt, // honeypot
          }),
        });

        if (!res.ok) throw new Error("Failed");

        setStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "", hpt: "" });
      } catch (err) {
        console.error("Error submitting form:", err);
        setStatus("error");
      } finally {
        setLoading(false);
      }
    };

    return (
      <div
        ref={ref}
        {...rest}
        className={`max-w-md mx-auto p-6 ${className}`}
      >
        <h2 className="text-3xl font-semibold mb-4 text-center text-orange-950">
          Запис на <span className="text-orange-800">Fit-Check</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* honeypot — приховане поле, має лишатися порожнім */}
          <input
            type="text"
            name="hpt"
            value={formData.hpt}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
          />

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium mb-1 text-orange-900"
            >
              Ім’я
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Введіть ваше ім’я"
              value={formData.name}
              onChange={handleChange}
              className="text-orange-900 w-full border border-amber-900 p-2 focus:ring-2 focus:ring-orange-800"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-1  text-orange-900"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleChange}
              className="text-orange-900 w-full border border-amber-900 p-2 focus:ring-2 focus:ring-orange-800"
              required
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium mb-1  text-orange-900"
            >
              Телефон
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              placeholder="+380..."
              value={formData.phone}
              onChange={handleChange}
              className="text-orange-900 w-full border border-amber-900 p-2 focus:ring-2 focus:ring-orange-800"
              required
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium mb-1 text-orange-900"
            >
              Коментар
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Ваші побажання..."
              value={formData.message}
              onChange={handleChange}
              className="text-orange-900 w-full border border-amber-900 p-2 focus:ring-2 focus:ring-orange-800"
              rows={3}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-2 hover:bg-orange-600 transition disabled:opacity-60 cursor-pointer"
          >
            {loading ? "Надсилаю..." : "Записатися"}
          </button>

          <p
            className="text-center text-sm text-orange-950"
            aria-live="polite"
            role="status"
          >
            {status === "success" &&
              "Дякую! Заявка прийнята. Я скоро зв’яжуся з вами."}
            {status === "error" && "Упс, щось пішло не так. Спробуйте ще раз."}
          </p>
        </form>
      </div>
    );
  }
);

FitCheckForm.displayName = "FitCheckForm";
