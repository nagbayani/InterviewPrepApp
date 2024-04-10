import InterviewItem from "../components/InterviewItem";
// import Icon from '../assets/icons8-add-new-50.png';
import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [showInput, setShowInput] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    company: "",
    position: "",
  });
  const [interviews, setInterviews] = useState([
    { date: "10/31", company: "Facebook", position: "Front-end Engineer" },
    { date: "12/10", company: "Oracle", position: "Back-end Engineer" },
    { date: "01/15", company: "Google", position: "Software Engineer" },
    { date: "02/20", company: "Amazon", position: "Full-stack Developer" },
    { date: "03/05", company: "Microsoft", position: "Data Scientist" },
    { date: "04/10", company: "Apple", position: "iOS Developer" },
  ]);
  const [newItemAdded, setNewItemAdded] = useState(false);

  const handleAddButtonClick = () => {
    setShowInput(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveButtonClick = () => {
    // Add the new interview data to the state
    setInterviews([...interviews, formData]);

    // Reset the form data and hide the input section
    setFormData({
      date: "",
      company: "",
      position: "",
    });
    setShowInput(false);

    // Set a flag to trigger the new item animation
    setNewItemAdded(true);
  };

  return (
    <div className='home-page'>
      <nav className='navBar'>
        <div className='logoTitle'>
          <h1>
            <Link className='linkItem' to='/'>
              Pepper Deck
            </Link>
          </h1>
        </div>
      </nav>
      <div className='bodyContainer'>
        <div className='titleContainer fade-in'>
          <h2 className='homeTitle'>Upcoming Interviews</h2>
        </div>
        <div className='categories fade-in'>
          <div className='catHeader'>
            <h2>Interview Date:</h2>
          </div>
          <div className='catHeader2'>
            <h2>Company:</h2>
          </div>
          <div className='catHeader'>
            <h2>Position:</h2>
          </div>
        </div>
        {interviews.map((item, index) => (
          <InterviewItem
            key={index}
            position={item.position}
            company={item.company}
            date={item.date}
            index={index}
          />
        ))}
        {showInput ? (
          <div className='inputSection'>
            <input
              className='input rounded-sm'
              type='text'
              name='date'
              placeholder='Interview Date'
              value={formData.date}
              onChange={handleInputChange}
            />
            <input
              className='input rounded-sm'
              type='text'
              name='company'
              placeholder='Company'
              value={formData.company}
              onChange={handleInputChange}
            />
            <input
              className='input rounded-sm'
              type='text'
              name='position'
              placeholder='Position'
              value={formData.position}
              onChange={handleInputChange}
            />
            <button className='button-10' onClick={handleSaveButtonClick}>
              Save
            </button>
          </div>
        ) : (
          <div className='addIntBtnContainer fade-in-button'>
            <button className='addIntBtn' onClick={handleAddButtonClick}>
              Add interview
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
