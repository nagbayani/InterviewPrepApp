"use client";

import React, { FC } from "react";
import Deck from "@/components/deck/Deck";

const HeroSection = () => {
  return (
    <section className='ml-[160px] h-full w-[100%] flex relative'>
      <Deck />
    </section>
  );
};

export default HeroSection;
