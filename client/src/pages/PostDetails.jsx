import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addComment, fetchComments, fetchPostBySlug } from '../api/posts.js';
import Loader from '../components/Loader.jsx';
import ErrorState from '../components/ErrorState.jsx';
import CommentList from '../components/CommentList.jsx';
import CommentForm from '../components/CommentForm.jsx';
import { formatDate } from '../utils/format.js';

const PostDetails = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);

  const loadPost = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetchPostBySlug(slug);
      setPost(response);
      const commentData = await fetchComments(response._id);
      setComments(commentData);
    } catch (err) {
      setError('Failed to load post details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPost();
  }, [slug]);

  const handleAddComment = async (payload) => {
    if (!post) return;
    try {
      setCommentLoading(true);
      const newComment = await addComment(post._id, payload);
      setComments((prev) => [newComment, ...prev]);
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        'Could not add comment. Try again.';
      setError(message);
    } finally {
      setCommentLoading(false);
    }
  };

  if (loading) return <Loader label="Loading post" />;
  if (error) return <ErrorState message={error} />;
  if (!post) return null;

  const shareUrl = window.location.href;
  const shareText = encodeURIComponent(post.title);

  return (
    <section className="page">
      <div className="post-hero" style={{ backgroundImage: `url(${post.image})` }}>
        <div className="post-hero-overlay">
          <p className="eyebrow">{post.tags?.[0] || 'feature'}</p>
          <h1>{post.title}</h1>
          <p className="post-meta">
            {formatDate(post.createdAt)} • {post.author?.name || 'Guest Author'}
          </p>
        </div>
      </div>

      <div className="post-content">
        <p>{post.content}</p>
      </div>

      <div className="share-bar">
        <p>Share this post:</p>
        <div className="share-buttons">
          <a
            className="share-icon"
            href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noreferrer"
            aria-label="Share on X"
            title="Share on X"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 3h3.6l5 6.9L18.8 3H22l-7.2 9.6L22 21h-3.6l-5.3-7.2L6.2 21H3l7.7-10.1L4 3z" />
            </svg>
          </a>
          <a
            className="share-icon"
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noreferrer"
            aria-label="Share on LinkedIn"
            title="Share on LinkedIn"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0.5 8.5h4V23h-4V8.5zM8.5 8.5h3.8v2h0.1c0.5-1 1.9-2 3.9-2 4.2 0 5 2.6 5 6V23h-4v-6.3c0-1.5 0-3.5-2.2-3.5-2.2 0-2.5 1.7-2.5 3.4V23h-4V8.5z" />
            </svg>
          </a>
        </div>
      </div>

      <section className="comment-section">
        <h3>Comments</h3>
        <CommentForm onSubmit={handleAddComment} loading={commentLoading} />
        <CommentList comments={comments} />
      </section>
    </section>
  );
};

export default PostDetails;
