
import './App.css';
import './scss/main.scss';
import { BrowserRouter, Outlet, Route, Routes, Navigate, Link } from 'react-router-dom';
import { About, ChangePassword, CreateProduct, FilterProduct, Genres, GetPurchased, Home, Login, Payment, PaymentSuccess, Personal, ProductDetail, ProductManagement, PurchaseHistory, PurchaseHistoryDetail, RegisterStaff, StaffManagement, UpdateProduct, UserManagement } from './pages';
import NavigationContainer from './container/navigation';
import RegisterContainer from './container/register';
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
            </Routes>

            <Routes>
              <Route path="/auth" element={<RouteAuth>
                <Outlet></Outlet>
                </RouteAuth>}>

                <Route exact path='login' element={<Login></Login>}></Route>
                <Route exact path='register' element={<RegisterContainer></RegisterContainer>}></Route>
              </Route>
              
              <Route exact path='payment' element={
                  <Payment></Payment>
              }></Route>

              <Route exact path='payment/success' element={
                  <PaymentSuccess></PaymentSuccess>
              }></Route>

              <Route path='/' element={<Home></Home>}></Route>
              <Route exact path='/createProduct' element={
                  <CreateProduct></CreateProduct>
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
              <Route path='/purchaseHistory' element={<PurchaseHistory></PurchaseHistory>}></Route>
              <Route path='/purchaseHistory/detail/:id' element={<PurchaseHistoryDetail></PurchaseHistoryDetail>}></Route>
              <Route path='/changePassword/:id' element={<ChangePassword></ChangePassword>}></Route>
              <Route path='/registerStaff' element={<RegisterStaff></RegisterStaff>}></Route>
              <Route path='/getPurchased' element={<GetPurchased></GetPurchased>}></Route>
              <Route path='/about' element={<About></About>}></Route>
              <Route path='/productManagement' element={<ProductManagement></ProductManagement>}></Route>
            </Routes>
            
            
            <Routes>
              <Route path='/*' element={<FooterContainer></FooterContainer>}></Route>
            </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

function RouteAuth({children, returnUrl}) {
    const {isLogin} = useAthContext();

  if(!isLogin) return (<>{children}</>);
  return <Navigate to={returnUrl || "/"}></Navigate>
}

export default App;
