import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="nav-header">
      <nav className="nav-bar">
        <Link to="/" className="brand">
          Journal
        </Link>
        <div className="nav-links">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/" className="nav-link">
            Tags
          </NavLink>
          {user ? (
            <>
              <NavLink to="/editor" className="nav-link">
                Create Post
              </NavLink>
              <button type="button" className="nav-button ghost" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
              <NavLink to="/register" className="nav-button">
                Register
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
