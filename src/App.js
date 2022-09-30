
import './App.css';
import './scss/main.scss';
import { BrowserRouter, Outlet, Route, Routes, Navigate } from 'react-router-dom';
import { Cart, Genres, Home, Login, Payment, ProductDetail } from './pages';
import NavigationContainer from './container/navigation';
import RegisterContainer from './container/register';
import Component from './components/root';
import React from 'react';
import {useAuthorContext} from "./store";
import 'bootstrap/dist/css/bootstrap.min.css';
import FooterContainer from './container/footer';
import CreateGenreContainer from './container/createGenre';


function App() {
  const {isLogin} = useAuthorContext();
  return (
    <>
      <div className='App'>
        <BrowserRouter>
            <Routes>
              <Route index element={<NavigationContainer></NavigationContainer>}></Route>
              <Route path="admin" element={<h1>Dashboard</h1>}></Route>
            </Routes>

            <Routes>
              <Route exact path='/' element={<Home></Home>}></Route>
              <Route exact path='/login' element={<Login></Login>}></Route>
              <Route exact path='/payment' element={<Payment></Payment>}></Route>
              <Route exact path='/register' element={<RegisterContainer></RegisterContainer>}></Route>
              <Route exact path='/cart' element={<Cart></Cart>}></Route>
              <Route exact path='/product' element={<RouteProtect isLogin={isLogin}>
                  <Outlet></Outlet>
                </RouteProtect>
                }>
                  <Route index element={<ProductDetail></ProductDetail>}></Route>
              </Route>
              <Route exact path='/genres' element={<Genres></Genres>}></Route>
              <Route path="/*" element={<h1>404: Error</h1>}></Route>
            </Routes>

            <Routes>
              <Route index element={<FooterContainer></FooterContainer>}></Route>
            </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
function RouteProtect({ children, isLogin }) {
  if (isLogin === false) return <Navigate to="/login"></Navigate>

  return (
    <Component>
      {children}
    </Component>
  )
}

export default App;
