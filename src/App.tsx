import { Routes, Route, BrowserRouter } from 'react-router-dom';
import StravaCallback from './components/Strava/StravaCallback';
import StravaContextProvider from './store/StravaContext';
import ElementGuard from './helpers/RouteElementGuard';
import { Profile } from './features/Athlete/Index';
import ClubActivities from './features/Club/ClubActivities';
import LayoutContextProvider from './store/LayoutContext';
import { Layout } from './features/Layout/Index';
import './App.css';
import { AthleteActivities } from './features/Athlete/Index';
import { Welcome } from './features/Home/Index';

function App() {
  return (
    <StravaContextProvider>
        <LayoutContextProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path='/' element={<ElementGuard><Welcome /></ElementGuard>}></Route>
                <Route path='/profile' element={<ElementGuard><Profile /></ElementGuard>}></Route>
                <Route path='/club-activities' element={<ElementGuard><ClubActivities /></ElementGuard>}></Route>
                <Route path='/my-activities' element={<ElementGuard><AthleteActivities /></ElementGuard>}></Route>
                <Route path='/callback' element={<StravaCallback />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </LayoutContextProvider>
    </StravaContextProvider>
  );
}

export default App;
