'use client';

import { ArrowRight, Shield, Target, CalendarClock } from 'lucide-react';
import React from 'react';
import styles from "../../styles/AboutMe.module.scss";

type Props = {
  buttonclick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export const AboutMe = React.forwardRef<HTMLDivElement, Props>(
  ( props, ref )=>{
  return (
    <section ref={ref} className={`${styles.aboutme} relative overflow-hidden`}>
      <div className={styles.aboutme_image}></div>
      <div className="m-3 px-4 sm:px-8 lg:px-5 py-5">
        {/* <div className="grid md:grid-cols-2"> */}
          {/* Ліва колонка */}
          <h2 className="text-3xl md:text-5xl col-2 font-semibold leading-tight text-yellow-950 mb-5 text-right">
            Мене звати Іван
          </h2>

          <p className="text-lg text-right text-zinc-700 leading-relaxed col-2">
            і я допомагаю людям стартувати в інвестиціях простими словами: від першого брокерського рахунку до персонального фінансового плану.
          </p>

          {/* бейджі довіри */}
          <div className="mt-6 col-2 flex flex-wrap gap-3 text-sm justify-end">
            <span className="inline-flex items-center gap-2 border border-zinc-300/70 px-3 py-1 text-zinc-800">
              <Shield size={16} /> Прозоро та відповідально
            </span>
            <span className="inline-flex items-center gap-2 border border-zinc-300/70 px-3 py-1 text-zinc-800">
              <Target size={16} /> План під твої цілі
            </span>
            <span className="inline-flex items-center gap-2 border border-zinc-300/70 px-3 py-1 text-zinc-800">
              <CalendarClock size={16} /> Онлайн / офлайн
            </span>
          </div>

          {/* CTA */}
          <div className="mt-8 flex gap-3 col-2 justify-end">
            <a
              className="inline-flex items-center gap-2 text-slate-100 bg-orange-950 px-5 py-3 font-semibold shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={props.buttonclick}
              role="button"
              tabIndex={0}
            >
              Забронювати «fit-check» <ArrowRight size={18} />
            </a>
          </div>
        {/* </div> */}
      </div>
    </section>
  );
}
);

AboutMe.displayName = 'AboutMe';

