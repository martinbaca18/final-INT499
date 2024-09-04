import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import StreamList from "./StreamList";
import Movies from "./Movies";
import Cart from "./Cart";
import About from "./About";
import "./App.css";

const App = () => {
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem("events");
    return savedEvents ? JSON.parse(savedEvents) : [];
  });

  const [newEvent, setNewEvent] = useState("");

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (newEvent.trim() !== "") {
      setEvents([...events, { text: newEvent, completed: false }]);
      setNewEvent("");
    }
  };

  const handleEditEvent = (index, newText) => {
    const updatedEvents = [...events];
    updatedEvents[index].text = newText;
    setEvents(updatedEvents);
  };

  const handleDeleteEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
  };

  const handleCompleteEvent = (index) => {
    const updatedEvents = [...events];
    updatedEvents[index].completed = !updatedEvents[index].completed;
    setEvents(updatedEvents);
  };

  return (
    <Router>
      <div className="app">
        <nav className="top-nav">
          <Link to="/">StreamList</Link>
          <Link to="/movies">Movie</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/about">About</Link>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <StreamList
                events={events}
                newEvent={newEvent}
                setNewEvent={setNewEvent}
                handleAddEvent={handleAddEvent}
                handleEditEvent={handleEditEvent}
                handleDeleteEvent={handleDeleteEvent}
                handleCompleteEvent={handleCompleteEvent}
              />
            }
          />
          <Route path="/movies" element={<Movies />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
