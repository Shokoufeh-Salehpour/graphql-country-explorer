import { Navigate, Route, Routes } from 'react-router-dom';
import { CountryPage } from './pages/CountryPage';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <main className="app-shell">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/country/:code" element={<CountryPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  );
}

export default App;
