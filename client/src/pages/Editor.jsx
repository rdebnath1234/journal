import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createPost, fetchPostById, updatePost } from '../api/posts.js';
import { uploadImage } from '../api/uploads.js';
import { useAuth } from '../context/AuthContext.jsx';
import Loader from '../components/Loader.jsx';
import ErrorState from '../components/ErrorState.jsx';

const Editor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const [form, setForm] = useState({
    title: '',
    image: '',
    tags: '',
    status: 'published',
    content: '',
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!id) return;
    const loadPost = async () => {
      try {
        setLoading(true);
        const data = await fetchPostById(id);
        setForm({
          title: data.title,
          image: data.image,
          tags: data.tags?.join(', ') || '',
          status: data.status,
          content: data.content,
        });
      } catch (err) {
        setError('Unable to load post for editing.');
      } finally {
        setLoading(false);
      }
    };
    loadPost();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      setError('');
      const payload = {
        title: form.title,
        image: form.image,
        tags: form.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean),
        status: form.status,
        content: form.content,
      };
      if (id) {
        await updatePost(id, payload, token);
      } else {
        await createPost(payload, token);
      }
      navigate('/');
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        'Could not save post.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const result = await uploadImage(file);
      setForm((prev) => ({ ...prev, image: result.url }));
    } catch (err) {
      setError('Image upload failed. Check Cloudinary config.');
    } finally {
      setUploading(false);
    }
  };

  if (loading && id) return <Loader label="Loading editor" />;

  return (
    <section className="page editor-page">
      <div className="editor-card">
        <h2>{id ? 'Edit Post' : 'Create New Post'}</h2>
        <p>Draft or publish a story. Images can be local URLs or Cloudinary URLs.</p>
        {error && <ErrorState message={error} />}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Post title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <input
            type="url"
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
          />
          <input type="file" accept="image/*" onChange={handleUpload} />
          <input
            type="text"
            name="tags"
            placeholder="Tags (comma separated)"
            value={form.tags}
            onChange={handleChange}
          />
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          <textarea
            name="content"
            rows="8"
            placeholder="Write your post content..."
            value={form.content}
            onChange={handleChange}
            required
          />
          <button type="submit" className="nav-button" disabled={loading}>
            {loading ? 'Saving...' : 'Save Post'}
          </button>
          {uploading && <p className="helper-text">Uploading image...</p>}
        </form>
      </div>
    </section>
  );
};

export default Editor;
