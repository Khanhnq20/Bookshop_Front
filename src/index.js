import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Author} from './store';
import { CartContext } from './store/cartContext';
import {ToastContainer} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { ProductContext } from './store/productContext';
import { CookiesProvider } from 'react-cookie';

const root = ReactDOM.createRoot(document.getElementById('root'));



root.render(
  <React.StrictMode>
    <CookiesProvider>
      <Author>
        <ProductContext>
          <CartContext>
            <App />
            <ToastContainer></ToastContainer>
          </CartContext>
        </ProductContext>
      </Author>
    </CookiesProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
