'use client'

import React from "react";
import styles from "../../styles/LearnMore.module.scss";

export const LearnMore = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  (props, ref) => {
    return (
      <div ref={ref} className={`${styles.learnmore} learnmore`} {...props}>
        <div className={styles.learnmore_background}></div>
        <div className={styles.learnmore_container}>
          {/* Ліва колонка */}
          <div className={styles.learnmore_content}>
            <h1 className={styles.learnmore_title}>
              Ти працюєш, подорожуєш і насолоджуєшся життям.
              <br />
              Але коли мова заходить про гроші — чи впевнений ти, що все робиш правильно?
            </h1>
            <h3 className={styles.learnmore_text}>
              Я допомагаю амбітним людям жити на повну сьогодні
              й бути впевненими у завтрашньому дні.
            </h3>
            {/* <button className={styles.learnmore_button}>
              Дізнатися більше
            </button> */}
          </div>

          {/* Права колонка (фото) */}
          <div className={styles.learnmore_image}></div>
        </div>
      </div>
    );
  }
);

LearnMore.displayName = "LearnMore";
