import logo from './logo.svg';
import './App.css';
import './scss/main.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './pages';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Login></Login>}></Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
