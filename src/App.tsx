import './App.css';
import LeaderBoard from './components/LeaderBoard';
import Profile from './components/Profile';

function App() {
  return (
    <div className="grid-container">
      <header>
        <h1>
          Welcome to g-cycling-col!
        </h1>
      </header>
      <div className="column">
        <Profile />
      </div>
      <div className="column">
        <LeaderBoard />
      </div>
      <footer>
        Footer
      </footer>
    </div>
  );
}

export default App;
