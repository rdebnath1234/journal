import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className="page">
      <div className="not-found">
        <h2>Page not found</h2>
        <p>We couldn't find that page. Let's get you back to the stories.</p>
        <Link to="/" className="nav-button">
          Back to Home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
