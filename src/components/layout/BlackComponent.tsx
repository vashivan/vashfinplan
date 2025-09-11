'use client'

import React from "react";

type Props = {
  props: string;
}

export const BlackComponent: React.FC<Props> = ({ props }) => {
  return (
    <div className="flex items-center justify-center text-center h-[200px] bg-black md:h-[250px]">
      <h1 className="text-white text-2xl w-90 md:text-4xl md:w-150">{props}</h1>
    </div>
  )
}