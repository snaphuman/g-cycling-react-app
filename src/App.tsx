import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import './App.css';
import StravaCallback from './components/Strava/StravaCallback';
import StravaAuthButton from './components/Strava/StravaAuthButton';
import StravaContextProvider, { useStravaContext } from './store/StravaContext';
import ElementGuard from './components/Helpers/ElementGuard';
import Profile from './components/Profile';
import LeaderBoard from './components/LeaderBoard';
import MainNavigation from './components/MainNavigation';

function App() {
  return (
    <StravaContextProvider>
        <div className="grid-container">
          <header className='header'>
            <h1>
              Welcome to g-cycling-col!
            </h1>
            <StravaAuthButton />
          </header>
          <BrowserRouter>
          <MainNavigation className='mainNav' />
            <aside className='sidebar'>
              Sidebar
            </aside>
            <section className='content'>
              <Routes>
                <Route path='/' element={<ElementGuard><Profile /></ElementGuard>}>Profile</Route>
                <Route path='/leaders-board' element={<ElementGuard><LeaderBoard /></ElementGuard>}>LeaderBoard</Route>
                <Route path='/callback' element={<StravaCallback />} />
              </Routes>
            </section>
            </BrowserRouter>
            
            <footer className='footer'>
              Footer
            </footer>
        </div>
    </StravaContextProvider>
  );
}

export default App;
