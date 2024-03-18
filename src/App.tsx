import { useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import StravaCallback from './components/Strava/StravaCallback';
import StravaAuthButton from './components/Strava/StravaAuthButton';
import StravaContextProvider from './store/StravaContext';
import ElementGuard from './components/Helpers/ElementGuard';
import Profile from './components/Profile';
import LeaderBoard from './components/LeaderBoard';
import MainNavigation from './components/MainNavigation';
import LayoutContextProvider from './store/LayoutContext';
import Layout from './components/Layout';
import './App.css';

function App() {
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
