import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from 'react-router-dom'
import {PayPalScriptProvider} from '@paypal/react-paypal-js';
import './assets/styles/bootstrap.custom.css'
import './assets/styles/index.css'
import {Provider} from 'react-redux';
import {HelmetProvider} from 'react-helmet-async'
import store from './store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import PrivateRoute from './components/privateRoute';
import AdminRoute from './components/adminRoute';
import HomeScreen from './screens/homeScreen';
import ProductScreen from './screens/productScreen';
import CartScreen from './screens/cartScreen';
import LoginScreen from './screens/loginScreen';
import RegisterScreen from './screens/registerScreen';
import ShippingScreen from './screens/shippingScreen';
import PaymentScreen from './screens/paymentScreen';
import PlaceOrderScreen from './screens/placeOrderScreen';
import OrderScreen from './screens/orderScreen';
import ProfileScreen from './screens/profileScreen';
import OrderListScreen from './screens/orderListScreen';
import ProductListScreen from './screens/productListScreen';
import ProductEditScreen from './screens/productEditScreen';
import UserListScreen from './screens/userListScreen';
import UserEditScreen from './screens/UserEditScreen'



const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/search/:keyword' element={<HomeScreen />} />
      <Route path='/page/:pageNumber' element={<HomeScreen />} />
      <Route path='/search/:keyword/page/:pageNumber' element={<HomeScreen />} />
      <Route path='/product/:id' element={<ProductScreen />} />
      <Route path='/cart' element={<CartScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='/profile' element={<ProfileScreen />} />

      
      <Route path='' element={<PrivateRoute />}>
        <Route path='/shipping' element={<ShippingScreen />} />
        <Route path='/payment'  element={<PaymentScreen />} />
        <Route path='/placeorder' element={<PlaceOrderScreen />} />
        <Route path='/orders/:id' element={<OrderScreen />} />
      </Route>

      <Route path='' element={<AdminRoute />}>
        <Route path='/admin/orderlist' element={<OrderListScreen />} />
        <Route path='/admin/productlist' element={<ProductListScreen />} />
        <Route path='/admin/productlist/:pageNumber' element={<ProductListScreen />} />
        <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
        <Route path='/admin/userlist' element={<UserListScreen />} />
        <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
      </Route>

    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <PayPalScriptProvider deferLoading={true}>
          <RouterProvider router={router} />
        </PayPalScriptProvider> 
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();
