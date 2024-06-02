import React, { useEffect } from "react";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./components/Notification";
import { fetchData, sendCardData } from "./store/cart-actions";
let isFirstRender = true;

function App() {
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector(state => state.ui.notification)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  
  useEffect(() => {
    if(isFirstRender) {
      isFirstRender = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCardData(cart));
    }
    
  }, [cart, dispatch]);

  return (
    <div className="App">
      {notification && <Notification type={notification.type} message={notification.message} />}
      {!isLoggedin && <Auth />}
      {isLoggedin && <Layout />}
    </div>
  );
}

export default App;
