import React, { useState, useEffect, useRef } from 'react';
import Topbar from './Topbar/Topbar';
import './chatwindow.css';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [showOptions, setShowOptions] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const messagesEndRef = useRef(null); // Create a ref for the messages container

  const questions = [
    {
      text: "How are you feeling today?",
      type: "options",
      options: ["Great!", "Good", "Okay", "Not good"]
    },
    {
      text: "What's your name?",
      type: "text"
    },
    {
      text: "What activities do you enjoy?",
      type: "options",
      options: ["Reading", "Exercise", "Music", "Gaming", "Other"]
    },
    {
      text: "Where are you from?",
      type: "text"
    },
    {
      text: "What's your favorite color?",
      type: "text"
    },
    {
      text: "Tell me about your day so far?",
      type: "text"
    },
    {
      text: "What's your favorite food?",
      type: "text"
    },
    {
      text: "What are your goals for this week?",
      type: "text"
    },
    {
      text: "Do you have any pets?",
      type: "text"
    },
    {
      text: "What's your favorite season?",
      type: "text"
    }
  ];

  useEffect(() => {
    setMessages([{
      text: questions[0].text,
      sender: 'bot',
      hasOptions: questions[0].type === 'options',
      options: questions[0].options
    }]);
  }, []);

  useEffect(() => {
    scrollToBottom(); // Scroll to the bottom whenever messages change
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOptionSelect = (option) => {
    setSelectedOptions(prev => {
      if (prev.includes(option)) {
        return prev.filter(item => item !== option);
      }
      return [...prev, option];
    });
  };

  const handleSubmitOptions = () => {
    if (selectedOptions.length > 0) {
      const updatedMessages = [
        ...messages, 
        { text: selectedOptions.join(", "), sender: 'user' }
      ];
      setSelectedOptions([]);
      moveToNextQuestion(updatedMessages);
    }
  };

  const handleSendMessage = () => {
    if (userInput.trim()) {
      const updatedMessages = [...messages, { text: userInput, sender: 'user' }];
      setUserInput('');
      moveToNextQuestion(updatedMessages);
    }
  };

  const moveToNextQuestion = (updatedMessages) => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextQuestion = questions[currentQuestionIndex + 1];
      updatedMessages.push({
        text: nextQuestion.text,
        sender: 'bot',
        hasOptions: nextQuestion.type === 'options',
        options: nextQuestion.options
      });
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      
    }
    setMessages(updatedMessages);
    setShowOptions(true);
  };

  const handleFinalSubmit = () => {
    // Handle final submit action here
    alert("All questions answered!");
  };

  return (
    <div className="chat-container">
      <Topbar />
      <div className="messages-container">
        {messages.map((message, index) => (
          <div key={index}>
            <div className={`message ${message.sender}`}>
              {message.text}
            </div>
            {message.hasOptions && showOptions && (
              <div className="options-wrapper">
                <div className="options-container">
                  {message.options?.map((option, i) => (
                    <button
                      key={i}
                      className={`option-button ${selectedOptions.includes(option) ? 'selected' : ''}`}
                      onClick={() => handleOptionSelect(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {selectedOptions.length > 0 && (
                  <button 
                    className="submit-options-button"
                    onClick={handleSubmitOptions}
                  >
                    Submit Selections
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* Add a ref to the end of the messages */}
      </div>
      {currentQuestionIndex < questions.length ? (
        
        <div className="input-container">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      ) : (
       
       <h1>over</h1>
      )}
    </div>
  );
};

export default ChatWindow;