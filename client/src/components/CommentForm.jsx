import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

const CommentForm = ({ onSubmit, loading }) => {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = { message };
    if (name.trim()) payload.name = name.trim();
    onSubmit(payload);
    setMessage('');
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      {!user && (
        <input
          type="text"
          placeholder="Your name (optional)"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      )}
      <textarea
        rows="4"
        placeholder="Write a comment..."
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        required
      />
      <button type="submit" className="nav-button" disabled={loading}>
        {loading ? 'Posting...' : 'Post Comment'}
      </button>
    </form>
  );
};

export default CommentForm;
