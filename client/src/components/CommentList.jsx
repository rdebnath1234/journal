import { formatDate } from '../utils/format.js';

const CommentList = ({ comments }) => {
  if (!comments.length) {
    return <p className="empty-state">No comments yet. Be the first.</p>;
  }

  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <div key={comment._id} className="comment-card">
          <div>
            <p className="comment-author">{comment.user?.name || comment.name || 'Guest'}</p>
            <p className="comment-date">{formatDate(comment.createdAt)}</p>
          </div>
          <p className="comment-message">{comment.message}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
