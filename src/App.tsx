import { Routes, Route, BrowserRouter } from 'react-router-dom';
import StravaCallback from './components/Strava/StravaCallback';
import StravaContextProvider from './store/StravaContext';
import ElementGuard from './helpers/RouteElementGuard';
import { Profile } from './features/Profile/Index';
import ClubActivities from './features/ClubActivities/ClubActivities';
import LayoutContextProvider from './store/LayoutContext';
import { Layout } from './features/Layout/Index';
import './App.css';
import Activities from './features/Profile/Activities';

function App() {
  return (
    <StravaContextProvider>
        <LayoutContextProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path='/' element={<ElementGuard><Profile /></ElementGuard>}></Route>
                <Route path='/club-activities' element={<ElementGuard><ClubActivities /></ElementGuard>}></Route>
                <Route path='/my-activities' element={<ElementGuard><Activities /></ElementGuard>}></Route>
                <Route path='/callback' element={<StravaCallback />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </LayoutContextProvider>
    </StravaContextProvider>
  );
}

export default App;
