"use client";

import React, { useEffect, useRef, useState } from "react";

const Card = ({ key }) => {
  const [details, setDetails] = useState({
    question: "",
    answer: "",
  });
  return (
    <div className='w-[600px] h-[600px] border-black border-8'>
      <form>
        <div>
          <input
            placeholder='Write a question...'
            name='question'
            value={details.question}
          ></input>
        </div>
        <div>
          <input
            placeholder='Write an Answer...'
            name='answer'
            value={details.answer}
          ></input>
        </div>
      </form>
    </div>
  );
};

export default Card;
