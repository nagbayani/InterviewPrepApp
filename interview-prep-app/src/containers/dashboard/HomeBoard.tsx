"use client";

import React, { FC } from "react";
import Image from "next/image";
import heroIcon from "../../../public/hero.svg";
import "../../styles/home.css";
// need to get list of all decks
import { Button, buttonVariants } from "@/components/ui/button";

const HomeBoard = () => {
  return (
    <section className='home-section'>
      <div className='home-section-grid'>
        <div className='home-text'>
          <h1>
            <span> Enhance your roadmap to success.</span>
          </h1>
          <p>
            Prepare confident responses onto question cards, enhancing your
            roadmap to interview success.
          </p>
          <Button className={buttonVariants()}>Create a Deck</Button>
        </div>
        {/* <div className='flex items-center justify-end'> */}
        <Image priority src={heroIcon} alt='home-icon' />
        {/* </div> */}
      </div>
    </section>
  );
};

export default HomeBoard;
