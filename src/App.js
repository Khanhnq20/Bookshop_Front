
import './App.css';
import './scss/main.scss';
import { BrowserRouter, Outlet, Route, Routes, Navigate } from 'react-router-dom';
import { CreateProduct, FilterProduct, Genres, Home, Login, Payment, PaymentSuccess, Personal, ProductDetail, StaffManagement, UpdateProduct, UserManagement } from './pages';
import NavigationContainer from './container/navigation';
import RegisterContainer from './container/register';
import Component from './components/root';
import React from 'react';
import {useAthContext} from "./store";
import 'bootstrap/dist/css/bootstrap.min.css';
import FooterContainer from './container/footer';


function App() {
  return (
    <>
      <div className='App'>
        <BrowserRouter>
            <Routes>
              <Route index path="/*" element={<NavigationContainer></NavigationContainer>}></Route>
              <Route path="admin" element={<h1>Dashboard</h1>}></Route>
            </Routes>

            <Routes>
              <Route path="/auth" element={<RouteAuth>
                <Outlet></Outlet>
                </RouteAuth>}>

                <Route exact path='login' element={<Login></Login>}></Route>
                <Route exact path='register' element={<RegisterContainer></RegisterContainer>}></Route>
              </Route>
              
              <Route exact path='payment' element={
                <RouteProtect>
                  <Payment></Payment>
                </RouteProtect>
              }></Route>

              <Route exact path='payment/success' element={
                <RouteProtect>
                  <PaymentSuccess></PaymentSuccess>
                </RouteProtect>
              }></Route>

              <Route path='/' element={<Home></Home>}></Route>
              {/* <Route element={<RouteProtect isLogin={isLogin}><Outlet></Outlet></RouteProtect>}>
              </Route> */}
              <Route exact path='/createProduct' element={
                <RouteProtect>
                  <CreateProduct></CreateProduct>
                </RouteProtect>
              }></Route>
              <Route exact path='/updateProduct/:id' element={<UpdateProduct></UpdateProduct>}></Route>
              <Route exact path='/product/:id' element={<Outlet></Outlet>}>
                  <Route index element={<ProductDetail></ProductDetail>}></Route>
              </Route>
              <Route exact path='/filterProduct/:id' element={<FilterProduct></FilterProduct>}></Route>
              <Route exact path='/genres' element={<Genres></Genres>}></Route>
              <Route path="/*" element={<h1>404: Error</h1>}></Route>

              <Route path='/userManagement' element={<UserManagement></UserManagement>}></Route>
              <Route path='/staffManagement' element={<StaffManagement></StaffManagement>}></Route>
              <Route path='/personal/:id' element={<Personal></Personal>}></Route>
            </Routes>
            
            
            <Routes>
              <Route path='/*' element={<FooterContainer></FooterContainer>}></Route>
            </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
function RouteProtect({ children }) {
  const {isLogin} = useAthContext();
  if (!isLogin) return <Navigate to="/auth/login"></Navigate>
  return (
    <Component>
      {children}
    </Component>
  )
}

function RouteAuth({children, returnUrl}) {
    const {isLogin} = useAthContext();

  if(!isLogin) return (<>{children}</>);

  return <Navigate to={returnUrl || "/"}></Navigate>
}

export default App;
