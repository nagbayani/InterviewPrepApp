"use client";

import React, { useEffect, useRef, useState } from "react";
import "./card.css";

interface CardProps {
  onInputChange: (isEmpty: boolean) => void;
  isLastCard: boolean;
}

const Card: React.FC<CardProps> = ({}) => {
  const [details, setDetails] = useState({
    question: "",
    answer: "",
    category: "",
  });

  const [chooseCategory, setCategory] = useState("Category");

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const categoryChange = (selected: string) => {
    setCategory(selected);
    setDetails((prev) => ({ ...prev, ["category"]: selected }));
  };

  useEffect(() => {
    console.log("Details", details);
  }, [details]);

  return (
    <div className='card'>
      <form className='flex flex-col space-y-2 '>
        <div className='flex flex-col'>
          {/* <label className='text-sm mb-1' htmlFor='question'>
            Question
          </label> */}

          <div className='card-header flex flex-row mb-[1rem] justify-between'>
            <div className='card-top-right'>
              {/* Retrieve list of user Categories */}
              <div className='drop-category'>
                <label className='drop-btn'>
                  <span>{chooseCategory}</span>
                </label>
                <ul className='drop-content'>
                  <li
                    onClick={() => categoryChange("Behavioral & Soft Skills")}
                  >
                    Behavioral & Soft Skills
                  </li>
                  <li
                    onClick={() =>
                      categoryChange("Algorithms & Data Structures")
                    }
                  >
                    Algorithms & Data Structures
                  </li>
                  <li onClick={() => categoryChange("Database Management")}>
                    Database Management
                  </li>
                  <li onClick={() => categoryChange("Programming Languages")}>
                    Programming Languages
                  </li>
                  <li onClick={() => categoryChange("Networking & Protocols")}>
                    Networking & Protocols
                  </li>
                  <li onClick={() => categoryChange("Technologies")}>
                    Technologies
                  </li>
                  <li onClick={() => categoryChange("Design Patterns")}>
                    Design Patterns
                  </li>
                  <li onClick={() => categoryChange("System Design")}>
                    System Design
                  </li>
                </ul>
              </div>
              {/* Send to Deck retrieve list of all user decks */}
              <div className='px-4'>Send:</div>
            </div>
          </div>
        </div>
        <div className='flex flex-col'>
          <input
            className='card-question p-2 rounded-md mt-[1em]'
            placeholder='Write a question...'
            name='question'
            value={details.question}
            onChange={inputChange}
          />
          <label className='text-sm mb-1' htmlFor='answer'>
            Answer
          </label>
          <input
            className='border p-2 rounded-md'
            placeholder='Write an Answer...'
            name='answer'
            value={details.answer}
            onChange={inputChange}
          />
        </div>
      </form>
    </div>
  );
};

export default Card;
