'use client'

import React from 'react';
import dynamic from 'next/dynamic';

const HomePage = dynamic(() => import('../components/layout/HomePage'));

export default function Home() {
  return (
    <HomePage />
  );
}
