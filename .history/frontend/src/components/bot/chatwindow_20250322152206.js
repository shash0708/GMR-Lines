import React, { useState, useEffect, useRef } from "react";
import Topbar from "./Topbar/Topbar";

import "./chatwindow.css";

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [showOptions, setShowOptions] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const messagesEndRef = useRef(null);

  const questions = [
    {
      text: "Location",
      type: "text",
    },
    {
      text: "A/C Type",
      type: "text",
    },
    {
      text: "A/C Reg No",
      type: "text",
    },

    {
      text: "Type of Maintenance",
      type: "options",
      options: ["A1(Line)", "A2(Line)", "A3(Line)"],
    },
    {
      text: "Certification privilege used",
      type: "options",
      options: ["B1", "B2", "B3"],
    },
    {
      text: "Maintenance Task Type",
      type: "options",
      options: ["FOT", "SGH", "R/I", "MEL", "TS", "MOD", "REP", "INSP"],
    },
    {
      text: "Type of Maintenance activity",
      type: "options",
      options: ["Training", "Perform", "Supervise", "CRS/RTS"],
    },
    {
      text: "ATA",
      type: "text",
    },
    {
      text: "Operation Performed",
      type: "text",
    },
    {
      text: "Time Duration",
      type: "text",
    },
    {
      text: "Maintanance record ref.",
      type: "text",
    },
  ];

  useEffect(() => {
    setMessages([
      {
        text: questions[0].text,
        sender: "bot",
        hasOptions: questions[0].type === "options",
        options: questions[0].options,
      },
    ]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleOptionSelect = (option) => {
    setSelectedOptions((prev) => {
      if (prev.includes(option)) {
        return prev.filter((item) => item !== option);
      }
      return [...prev, option];
    });
  };

  const handleSubmitOptions = () => {
    if (selectedOptions.length > 0) {
      const updatedMessages = [
        ...messages,
        { text: selectedOptions.join(", "), sender: "user" },
      ];
      setSelectedOptions([]);
      moveToNextQuestion(updatedMessages);
    }
  };

  const handleSendMessage = () => {
    if (userInput.trim()) {
      const updatedMessages = [
        ...messages,
        { text: userInput, sender: "user" },
      ];
      setUserInput("");
      moveToNextQuestion(updatedMessages);
    }
  };

  const moveToNextQuestion = (updatedMessages) => {
    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex < questions.length) {
      const nextQuestion = questions[nextIndex];
      updatedMessages.push({
        text: nextQuestion.text,
        sender: "bot",
        hasOptions: nextQuestion.type === "options",
        options: nextQuestion.options,
      });
      setCurrentQuestionIndex(nextIndex);
    } else {
      updatedMessages.push({
        text: "Thank you for answering all questions! Click Submit to finish.",
        sender: "bot",
      });
      setIsComplete(true);
    }

    setMessages(updatedMessages);
    setShowOptions(nextIndex < questions.length);
  };

  const handleFinalSubmit = async () => {
    try {
      // Create an object to store all responses
      const formData = {
        Id: Date.now(), // Generate a unique ID
        dateTime: new Date().toISOString(),
        Location: "",
        ATC: {},
        ACTtype: "",
        ACRegNo: "",
        TOM: "",
        CPU: "",
        FOT: "",
        SGH: "",
        RI: "",
        MEL: "",
        TS: "",
        MOD: "",
        REP: "",
        INSP: "",
        Training: "",
        Perform: "",
        Supervise: "",
        CRS_RTS: "",
        ATA: "",
        OP: "",
        DU: "",
        MRR: "",
        Supervisor: "",
      };

      // Process messages to fill the formData
      messages.forEach((msg, index) => {
        if (msg.sender === "user") {
          const question = messages[index - 1].text;
          const answer = msg.text;

          switch (question) {
            case "Location":
              formData.Location = answer;
              break;
            case "A/C Type":
              formData.ACTtype = answer;
              break;
            case "A/C Reg No":
              formData.ACRegNo = answer;
              break;
            case "Type of Maintenance":
              formData.TOM = answer;
              break;
            case "Certification privilege used":
              formData.CPU = answer;
              break;
            case "Maintenance Task Type":
              // Split multiple selections and mark them with 'X'
              const maintenanceTasks = answer.split(", ");
              formData.FOT = maintenanceTasks.includes("FOT") ? "X" : "";
              formData.SGH = maintenanceTasks.includes("SGH") ? "X" : "";
              formData.RI = maintenanceTasks.includes("R/I") ? "X" : "";
              formData.MEL = maintenanceTasks.includes("MEL") ? "X" : "";
              formData.TS = maintenanceTasks.includes("TS") ? "X" : "";
              formData.MOD = maintenanceTasks.includes("MOD") ? "X" : "";
              formData.REP = maintenanceTasks.includes("REP") ? "X" : "";
              formData.INSP = maintenanceTasks.includes("INSP") ? "X" : "";
              break;
            case "Type of Maintenance activity":
              // Split multiple selections and mark them with 'X'
              const activities = answer.split(", ");
              formData.Training = activities.includes("Training") ? "X" : "";
              formData.Perform = activities.includes("Perform") ? "X" : "";
              formData.Supervise = activities.includes("Supervise") ? "X" : "";
              formData.CRS_RTS = activities.includes("CRS/RTS") ? "X" : "";
              break;
            case "ATA":
              formData.ATA = answer;
              break;
            case "Operation Performed":
              formData.OP = answer;
              break;
            case "Time Duration":
              formData.DU = answer;
              break;
            case "Maintanance record ref.":
              formData.MRR = answer;
              break;
              case "Supervisor":
                
            default:
              console.warn(`Unhandled question type: ${question}`);
              break;
          }
        }
      });

      // Send the data to your backend
      const response = await fetch("http://localhost:5000/logs/createLog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"), // Assuming you store the token in localStorage
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Log created successfully!");
        window.location.href = "/past-records"; // Redirect to past records page
      } else {
        throw new Error("Failed to create log");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to submit data. Please try again.");
    }
  };

  return (
    <div className="chat-container">
      <Topbar />
      <div className="messages-container">
        {messages.map((message, index) => (
          <div key={index}>
            <div className={`message ${message.sender}`}>{message.text}</div>
            {message.hasOptions && showOptions && (
              <div className="options-wrapper">
                <div className="options-container">
                  {message.options?.map((option, i) => (
                    <button
                      key={i}
                      className={`option-button ${
                        selectedOptions.includes(option) ? "selected" : ""
                      }`}
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
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
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
