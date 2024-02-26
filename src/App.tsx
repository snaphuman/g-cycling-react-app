import './App.css';
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
        <h2>
          Other Data
        </h2>
      </div>
      <footer>
        Footer
      </footer>
    </div>
  );
}

export default App;
