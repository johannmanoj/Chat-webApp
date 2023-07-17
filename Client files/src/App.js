import './App.css';
import Sidebar from './components/Sidebar';
import MainPage from './components/MainPage';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        Hello !
      </header> */}
      <Sidebar />
      <MainPage />
    </div>
  );
}

export default App;
