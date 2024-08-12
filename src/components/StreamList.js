import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

function StreamList() {
    const [events, setEvents] = useState([]);
    const [input, setInput] = useState('');
    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState('');

    const handleAddEvent = (e) => {
        e.preventDefault();
        if (input.trim()) {
            setEvents([...events, { id: Date.now(), text: input, completed: false }]);
            setInput('');
        }
    };

    const handleDeleteEvent = (id) => {
        setEvents(events.filter(event => event.id !== id));
    };

    const handleCompleteEvent = (id) => {
        setEvents(
            events.map(event =>
                event.id === id ? { ...event, completed: !event.completed } : event
            )
        );
    };

    const handleEditEvent = (id, text) => {
        setEditId(id);
        setEditText(text);
    };

    const handleUpdateEvent = (e) => {
        e.preventDefault();
        setEvents(
            events.map(event =>
                event.id === editId ? { ...event, text: editText } : event
            )
        );
        setEditId(null);
        setEditText('');
    };

    return (
        <div>
            <h2>StreamList</h2>
            <form onSubmit={editId ? handleUpdateEvent : handleAddEvent}>
                <input
                    type="text"
                    value={editId ? editText : input}
                    onChange={(e) => editId ? setEditText(e.target.value) : setInput(e.target.value)}
                    placeholder={editId ? "Update your event" : "Enter an event"}
                />
                <button type="submit">{editId ? "Update" : "Add"}</button>
            </form>

            <ul>
                {events.map(event => (
                    <li key={event.id} style={{ textDecoration: event.completed ? 'line-through' : 'none' }}>
                        {event.text}
                        <span onClick={() => handleCompleteEvent(event.id)}>
                            <FontAwesomeIcon icon={faCheckCircle} style={{ marginLeft: '10px', cursor: 'pointer' }} />
                        </span>
                        <span onClick={() => handleEditEvent(event.id, event.text)}>
                            <FontAwesomeIcon icon={faPenToSquare} style={{ marginLeft: '10px', cursor: 'pointer' }} />
                        </span>
                        <span onClick={() => handleDeleteEvent(event.id)}>
                            <FontAwesomeIcon icon={faTrash} style={{ marginLeft: '10px', cursor: 'pointer' }} />
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default StreamList;
