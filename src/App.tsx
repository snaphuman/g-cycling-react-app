import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import StravaCallback from './components/Strava/StravaCallback';
import StravaAuthButton from './components/Strava/StravaAuthButton';

function App() {
  return (
    <div className="grid-container">
      <header>
        <h1>
          Welcome to g-cycling-col!
        </h1>
      </header>
      <div className="column">
        <Router>
          <Routes>
            <Route path='/' element={<StravaAuthButton />} />
            <Route path='/callback' element={<StravaCallback />} />
          </Routes>
        </Router>
      </div>
      <footer>
        Footer
      </footer>
    </div>
  );
}

export default App;
