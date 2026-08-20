import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import { CountryPage } from './pages/CountryPage';
import { HomePage } from './pages/HomePage';
import { PostsPage } from './pages/PostsPage';

function App() {
  return (
    <div className="app-shell">
      <nav className="site-nav" aria-label="Main">
        <NavLink to="/" end>
          Countries
        </NavLink>
        <NavLink to="/posts">Posts</NavLink>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/country/:code" element={<CountryPage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
