import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { likeSessionAsync, commentOnSessionAsync } from '../features/sessions/sessionSlice';

// A single session item component
function SessionItem({ session }) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');

  const handleLike = () => {
    dispatch(likeSessionAsync(session.mastodonPostId));
    alert('Liked post!'); // Simple feedback
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!comment) return;
    dispatch(commentOnSessionAsync({ postId: session.mastodonPostId, comment }));
    setComment('');
    alert('Comment posted!'); // Simple feedback
  };

  return (
    <div className="session-item">
      <h3>{session.title}</h3>
      <p>{session.description}</p>
      <small>Date: {new Date(session.date).toLocaleDateString()}</small>
      <small>Mastodon Post ID: {session.mastodonPostId}</small>
      
      <div className="session-actions">
        <button onClick={handleLike}>👍 Like</button>
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <input
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit">Comment</button>
        </form>
      </div>
    </div>
  );
}


function SessionList() {
  const sessions = useSelector((state) => state.sessions.items);
  const sessionStatus = useSelector((state) => state.sessions.status);
  const error = useSelector((state) => state.sessions.error);

  if (sessionStatus === 'failed') {
    return <div>Error: {error}</div>;
  }
  
  return (
    <div className="list-container">
      <h2>Active Sessions</h2>
      {sessions.length === 0 ? (
        <p>No sessions created yet. Create one above!</p>
      ) : (
        sessions.map((session) => (
          <SessionItem key={session.mastodonPostId} session={session} />
        ))
      )}
    </div>
  );
}

export default SessionList;