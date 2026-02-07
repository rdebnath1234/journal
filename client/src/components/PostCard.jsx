import { Link } from 'react-router-dom';
import { formatDate, truncate } from '../utils/format.js';

const PostCard = ({ post }) => {
  const readTime = Math.max(5, Math.ceil((post.content?.length || 0) / 450));
  return (
    <article className="post-card">
      <Link to={`/post/${post.slug}`} className="post-image" style={{ backgroundImage: `url(${post.image})` }}>
        <span className="post-badge">{post.tags?.[0] || 'Destination'}</span>
      </Link>
      <div className="post-body">
        <div className="post-meta">
          <span>{formatDate(post.createdAt)}</span>
          <span>•</span>
          <span>{readTime} mins read</span>
        </div>
        <Link to={`/post/${post.slug}`} className="post-title">
          {post.title}
        </Link>
        <p className="post-excerpt">{truncate(post.content, 140)}</p>
        <div className="post-author">
          <div className="avatar">{(post.author?.name || 'A')[0]}</div>
          <span>{post.author?.name || 'Guest Author'}</span>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
