'use client';

// import styles from "../../styles/HomePage.module.scss";
// import { useState } from 'react';
// import { CheckCircle, ArrowRight, Shield, CalendarClock, Mail, Phone, Instagram, User, Target, MessageCircle } from 'lucide-react';
// import { motion } from 'framer-motion';
import { LearnMore } from "./LearnMore";
import { useRef } from 'react';
import Header from "./Header";
import { BlackComponent } from "./BlackComponent";
import { AboutMe } from "./AboutMe";
import WhyMe from "./WhyMe";
import { FitCheckForm } from "./Form";


export default function HomePage() {
  const aboutmeRef = useRef<HTMLDivElement>(null);
  const checkRef = useRef<HTMLDivElement>(null);

  const scrollToAdvantages = () => {
    if (aboutmeRef.current) {
      aboutmeRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  const scrollToFitCheck = () => {
    if (checkRef.current) {
      checkRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }


  return (
    <main>
      <Header buttonClick={scrollToAdvantages} />
      <BlackComponent props={'Насолоджуйся сьогоднішнім днем без шкоди для завтрашнього'} />
      <AboutMe buttonclick={scrollToFitCheck} ref={aboutmeRef} />
      {/* <BlackComponent props={'Свобода — це не про гроші, це про відсутність паніки всередині'} /> */}
      <LearnMore />
      <BlackComponent
        props={`Життя на повну починається з розумних фінансових кроків`}
      />
      <WhyMe />
      <BlackComponent props={'Перший крок до фінансової впевненості — це просто'} />
      <FitCheckForm ref={checkRef} />
      <BlackComponent props={'Інвестиції — це шлях, а не миттєвий результат'} />
    </main>
  );
}