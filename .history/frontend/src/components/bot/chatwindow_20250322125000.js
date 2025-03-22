import React, { useState, useEffect, useRef } from 'react';
import Topbar from './Topbar/Topbar';
import './chatwindow.css';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [showOptions, setShowOptions] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const messagesEndRef = useRef(null);

  const questions = [
   
    {
      "text": "Location",
      "type": "text"
    },
    {
      "text": "A/C Type",
      "type": "text"
    },
    {
      "text": "A/C Reg No",
      "type": "text"
    },
    
    {
      "text": "Type of Maintenance",
      "type": "options",
      "options": ["A1(Line)", "A2(Line)", "A3(Line)"]
    },
    {
      "text": "Certificate privilege used",
      "type": "options",
      "options": ["B1", "B2", "B3"]
    },
    {
      "text": "Maintenance Task Type",
      "type": "options",
      "options": ["FOT", "SGH", "R/I", "MEL", "TS", "MOD", "REP", "INSP"]
    },
    {
      "text": "Maintenance ",
      "type": "options",
      "options": ["FOT", "SGH", "R/I", "MEL", "TS", "MOD", "REP", "INSP"]
    },
    {
      "text": "ATA",
      "type": "text"
    },
    {
      "text": "OP",
      "type": "text"
    },
    {
      "text": "DU",
      "type": "text"
    },
    {
      "text": "MRR",
      "type": "text"
    }
  ]
  

  useEffect(() => {
    setMessages([{
      text: questions[0].text,
      sender: 'bot',
      hasOptions: questions[0].type === 'options',
      options: questions[0].options
    }]);
  }, []);

  useEffect(() => {
    scrollToBottom();
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
    const nextIndex = currentQuestionIndex + 1;
    
    if (nextIndex < questions.length) {
      const nextQuestion = questions[nextIndex];
      updatedMessages.push({
        text: nextQuestion.text,
        sender: 'bot',
        hasOptions: nextQuestion.type === 'options',
        options: nextQuestion.options
      });
      setCurrentQuestionIndex(nextIndex);
    } else {
      updatedMessages.push({
        text: "Thank you for answering all questions! Click Submit to finish.",
        sender: 'bot'
      });
      setIsComplete(true);
    }
    
    setMessages(updatedMessages);
    setShowOptions(nextIndex < questions.length);
  };

  const handleFinalSubmit = () => {
    console.log('Submitting all answers:', messages);
    alert("Thank you for completing the questionnaire!");
    // Add your submission logic here
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
        <div ref={messagesEndRef} />
      </div>
      {!isComplete ? (
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
        <div className="submit-container">
          <button onClick={handleFinalSubmit} className="final-submit-button">
            Submit All Answers
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;