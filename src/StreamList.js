import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import './StreamList.css'; 

const StreamList = ({
    events,
    newEvent,
    setNewEvent,
    handleAddEvent,
    handleEditEvent,
    handleDeleteEvent,
    handleCompleteEvent,
}) => {
    const [editingIndex, setEditingIndex] = useState(null);
    const [editText, setEditText] = useState("");

    const handleStartEdit = (index, text) => {
        setEditingIndex(index);
        setEditText(text);
    };

    const handleSaveEdit = (index) => {
        handleEditEvent(index, editText);
        setEditingIndex(null);
        setEditText("");
    };

    const handleCancelEdit = () => {
        setEditingIndex(null);
        setEditText("");
    };

    return (
        <div className="streamlist-container">
            <h1>StreamList</h1>
            <form onSubmit={handleAddEvent} className="event-form">
                <input
                    type="text"
                    value={newEvent}
                    onChange={(e) => setNewEvent(e.target.value)}
                    placeholder="Add a new event"
                    className="event-input"
                />
                <button type="submit" className="add-button">Add</button>
            </form>
            <ul className="event-list">
                {events.length > 0 ? (
                    events.map((event, index) => (
                        <li key={index} className={`event-item ${event.completed ? "completed" : ""}`}>
                            {editingIndex === index ? (
                                <div className="edit-container">
                                    <input
                                        type="text"
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                        className="edit-input"
                                    />
                                    <button onClick={() => handleSaveEdit(index)} className="action-button">
                                        <FontAwesomeIcon icon={faCheck} />
                                    </button>
                                    <button onClick={handleCancelEdit} className="action-button">
                                        <FontAwesomeIcon icon={faTimes} />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <span className="event-text">{event.text}</span>
                                    <div className="actions">
                                        <button onClick={() => handleCompleteEvent(index)} className="action-button">
                                            <FontAwesomeIcon icon={faCheck} />
                                        </button>
                                        <button onClick={() => handleStartEdit(index, event.text)} className="action-button">
                                            <FontAwesomeIcon icon={faPenToSquare} />
                                        </button>
                                        <button onClick={() => handleDeleteEvent(index)} className="action-button">
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                </>
                            )}
                        </li>
                    ))
                ) : (
                    <p>No events found.</p>
                )}
            </ul>
        </div>
    );
};

export default StreamList;
