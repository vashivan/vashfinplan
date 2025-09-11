'use client'

import Navbar from "./Navbar";
import styles from "../../styles/Header.module.scss";

type Props = {
  buttonClick: () => void;
}


export const Header: React.FC<Props> = ({ buttonClick }) => {
  return (
    <header className={styles.header}>
      <div className={styles.header_background}></div>
      <Navbar />
      <h1 className={`${styles.header_title1} text-xl md:text-4xl uppercase w-full text-center`}>
        фінанси під твої цілі, а не під чужі правила
      </h1>
      <h3 className={`${styles.header_title2} text-[12px] md:text-xl uppercase w-full text-center`}>працюй на максимум, живи на повну, плануй з розумом</h3>
      <button className={`${styles.header_button} uppercase text-sm md:w-60`}
        onClick={buttonClick}>
        дізнатися більше
      </button>
    </header>
  )
};

export default Header;