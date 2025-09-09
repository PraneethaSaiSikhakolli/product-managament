import React, { useState, useEffect } from "react";
import ProductList from "./pages/ProductList";
import "./App.css";

function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3500); 
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="splash-screen">
      <h1>Product Management System</h1>
      <p>Add, Search, and Organize Products Easily</p>
    </div>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <ProductList />
      )}
    </>
  );
}

export default App;
