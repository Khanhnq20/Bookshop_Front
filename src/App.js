import logo from './logo.svg';
import './App.css';
import './scss/main.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home, Login, ProductDetail } from './pages';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Home></Home>}></Route>
            <Route exact path='/login' element={<Login></Login>}></Route>
            <Route exact path='/product' element={<ProductDetail></ProductDetail>}></Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
