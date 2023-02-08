import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import './App.css';
import About from './pages/About';
import AddEdit from './pages/Home';
import Home from "./pages/AddEdit";
import View from './pages/View';
// Toast Import
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './compnents/Header';
 

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Header />
      <ToastContainer position='top-center'/>
      <Routes>
    <Route exact path="/"  element={<Home/>}/>
    <Route path="/add"  element={<AddEdit/>}/>
    <Route path="/update/:id"  element={<AddEdit/>}/>
    <Route path="/View/:id"  element={<View/>}/>
    <Route path='/about'  element={<About/>}/>
      </Routes>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
