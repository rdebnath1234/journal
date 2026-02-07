import { useEffect, useMemo, useState } from 'react';
import { fetchPosts } from '../api/posts.js';
import PostCard from '../components/PostCard.jsx';
import Loader from '../components/Loader.jsx';
import ErrorState from '../components/ErrorState.jsx';
import Pagination from '../components/Pagination.jsx';
import SearchBar from '../components/SearchBar.jsx';
import TagFilter from '../components/TagFilter.jsx';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const tags = useMemo(() => {
    const allTags = posts.flatMap((post) => post.tags || []);
    return [...new Set(allTags)];
  }, [posts]);

  const featured = posts[0];
  const remaining = posts.slice(0);
  const secondary = posts[1];

  const loadPosts = async (page = 1, searchQuery = search, tag = activeTag) => {
    try {
      setLoading(true);
      setError('');
      const params = {
        page,
        limit: 6,
      };
      if (searchQuery) params.search = searchQuery;
      if (tag && tag !== 'all') params.tags = tag;
      const response = await fetchPosts(params);
      setPosts(response.data);
      setPagination(response.pagination);
    } catch (err) {
      setError('Failed to load posts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts(1);
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    loadPosts(1, search, activeTag);
  };

  const handleTag = (tag) => {
    setActiveTag(tag);
    loadPosts(1, search, tag);
  };

  return (
    <section className="page">
      {featured && (
        <section className="hero-banner" style={{ backgroundImage: `url(${featured.image})` }}>
          <div className="hero-overlay">
            <div className="hero-content">
              <span className="hero-tag">{featured.tags?.[0] || 'Destination'}</span>
              <h1>{featured.title}</h1>
              <p>{featured.content.slice(0, 140)}...</p>
              <div className="hero-meta">
                <span>{featured.author?.name || 'Editor Team'}</span>
                <span>•</span>
                <span>10 mins read</span>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="blog-header">
        <div>
          <h2>Blog</h2>
          <p>Here, we share travel tips, destination guides, and stories that inspire your next adventure.</p>
        </div>
        <div className="sort-pill">
          <span>Sort by:</span>
          <select>
            <option>Newest</option>
            <option>Popular</option>
          </select>
        </div>
      </section>

      <div className="controls">
        <SearchBar value={search} onChange={setSearch} onSubmit={handleSearch} />
        <TagFilter tags={tags} activeTag={activeTag} onSelect={handleTag} />
      </div>

      {loading && <Loader label="Loading posts" />}
      {error && <ErrorState message={error} />}

      {!loading && !error && (
        <>
          <div className="grid">
            {remaining.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </>
      )}

      <Pagination page={pagination.page} pages={pagination.pages} onChange={(page) => loadPosts(page)} />

      <section className="cta-grid">
        <div className="cta-card">
          <div>
            <h3>Explore more to get your comfort zone</h3>
            <p>Book your next story-worthy journey with us.</p>
          </div>
          <button type="button" className="nav-button">
            Booking Now
          </button>
          <div className="cta-stat">
            <span>Articles Available</span>
            <strong>{pagination.total || 78}</strong>
          </div>
        </div>
        {secondary && (
          <div className="cta-image" style={{ backgroundImage: `url(${secondary.image})` }}>
            <div className="cta-image-overlay">
              <p>Beyond accommodation, creating memories of a lifetime</p>
            </div>
          </div>
        )}
      </section>
    </section>
  );
};

export default Home;
