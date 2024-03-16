import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import StravaCallback from './components/Strava/StravaCallback';
import StravaAuthButton from './components/Strava/StravaAuthButton';
import StravaContextProvider, { useStravaContext } from './store/StravaContext';
import ElementGuard from './components/Helpers/ElementGuard';
import Profile from './components/Profile';
import LeaderBoard from './components/LeaderBoard';
import MainNavigation from './components/MainNavigation';
import { useState, useEffect } from 'react';
import LayoutContextProvider, { useLayoutContext } from './store/LayoutContext';
import Layout from './components/Layout';

function valuetext(value: number) {
  return `${value}ºC`;
}

function App() {
  const [value, setValue] = useState([20, 30])

  const handleChange = (event: Event, newValue: number | number[]) => {
    console.log('ev', event)
    console.log('nv', newValue);

    setValue(newValue as number[]);
  }

  return (
    <StravaContextProvider>
        <StravaAuthButton />

        <LayoutContextProvider>
          <Layout>
            <BrowserRouter>
            <MainNavigation className='mainNav' />
              <Routes>
                <Route path='/' element={<ElementGuard><Profile /></ElementGuard>}>Profile</Route>
                <Route path='/leaders-board' element={<ElementGuard><LeaderBoard /></ElementGuard>}>LeaderBoard</Route>
                <Route path='/callback' element={<StravaCallback />} />
              </Routes>
            </BrowserRouter>
          </Layout>
        </LayoutContextProvider>
    </StravaContextProvider>
  );
}

export default App;
