import React, { useState } from 'react';
import Card from '../components/Card';
import { Link } from 'react-router-dom';
import AddCardModal from '../components/AddCardModal';

function Deck(props) {
  const [deck, setDeck] = useState([
    {
      front: 'What is your experience with React?',
      back: "I have extensive experience with React and have used it in various projects. I'm proficient in creating functional components, managing state, and handling component lifecycles. I'm also familiar with popular libraries and tools in the React ecosystem, such as React Router, Redux, and Context API."
    },
    {
      front: 'What is your experience with authentication?',
      back: "I have experience implementing authentication in web applications. I've used authentication libraries like Firebase Authentication and implemented custom authentication solutions using JSON Web Tokens (JWT). I'm familiar with user registration, login, password reset, and role-based access control."
    },
    {
      front: 'Tell me about a project where you used Redux Toolkit.',
      back: "In a recent project, I used Redux Toolkit to manage the state of a complex e-commerce application. Redux Toolkit simplified state management by providing a set of predefined actions, reducers, and selectors. It helped me efficiently handle data fetching, caching, and application-wide state updates, making the codebase more maintainable."
    },
    {
      front: 'What tools have you used to implement testing?',
      back: "I've used several testing tools to ensure the quality of my code. For unit testing, I've employed Jest, a popular JavaScript testing framework. I've also used testing libraries like React Testing Library for testing React components. Additionally, I've written end-to-end tests using tools like Cypress to validate the behavior of the entire application."
    },
    {
      front: 'What is TDD?',
      back: "Test-Driven Development (TDD) is a software development methodology where you write tests before implementing the actual code. The process typically involves three steps: writing a failing test that describes the desired functionality, writing the minimum code required to pass the test, and then refactoring the code to improve its quality. TDD promotes a robust and testable codebase, leading to fewer bugs and better software design."
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleAddCard(newCard) {
    const newDeck = [...deck, newCard];
    setDeck(newDeck);
    setIsModalOpen(false); // Close the modal after adding the card
  }


  return (
    <div>
      <nav className='navBar'>
         <div className='logoTitle'>
            <h1><Link className='linkItem' to='/'>Pepper Deck</Link></h1>
         </div>
         <div className='rightNav'>
            <Link className='linkItem' to='/home'>Back</Link>
         </div>
      </nav>
    <div>
      <div className='job_description'>
        <h1>Frontend Engineer</h1>
        <p>
          Develop data processing pipeline to ingest and enrich product data for internal and external customers
        </p>
        <p>
          Develop our search platform that helps our internal and external customers to discover, monetize our product inventory
        </p>
        <p>
          Help implement our new applications and infrastructure
        </p>
        <p>
          Ensure high code-quality and high availability of our inventory platform
        </p>
      </div>
      <br></br>
      <div className='cards_container'>
        {deck.map(card => <Card front={card.front} back={card.back}/>)}
      </div>
      <br></br>
      <div>
        <button className='addCardBtn' onClick={() => setIsModalOpen(true)}>+</button>
      </div>
      <AddCardModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddCard={handleAddCard} />
    </div>
    </div>
  );
}

export default Deck;