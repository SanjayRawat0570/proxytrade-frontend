import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSessionAsync } from '../features/sessions/sessionSlice';

function SessionForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const dispatch = useDispatch();
  const status = useSelector((state) => state.sessions.status);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !date) {
      alert('Please fill all fields');
      return;
    }
    dispatch(createSessionAsync({ title, description, date }));
    setTitle('');
    setDescription('');
    setDate('');
  };

  return (
    <div className="form-container">
      <h2>Create New Trading Session</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Session Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Session Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Creating...' : 'Create Session'}
        </button>
      </form>
    </div>
  );
}

export default SessionForm;