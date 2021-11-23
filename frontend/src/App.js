import { useState } from 'react';
import Login from './Login';
import './App.css';
import Myquestions from './components/Myquestions';
import Home from './components/Home';
import Createquestion from './components/Createquestion';
import Category from './components/Category';
import Search from './components/Search';
import Updateprofile from './components/Updateprofile';
import {BrowserRouter, Routes, Route, Link } from "react-router-dom";

export default function App(props) {
  const [currentUser, setcurrentUser] = useState(null);

  return (
    <BrowserRouter>
      <div className="App">
        {!currentUser && <Login />}
        <div className="loginbutton">
          {!currentUser && (
            <button onClick={() => setcurrentUser({ name: "bob" })}>Submit</button>
          )}
        </div>
        {currentUser && (
          <header>
            <nav>
              <Link to="/home">Home</Link>
              <Link to="/createquestion">Ask a Question?</Link>
              <Link to="/category">Categories</Link>
              <Link to="/search">Search</Link>
              <Link to="/myquestions">My Questions</Link>
              <Link to="/update">Update</Link>
            </nav>
          </header>
        )}
      </div>
      <Routes>
        <Route path="/home" element={currentUser && <Home />} />
        <Route path="/createquestion" element={currentUser && <Createquestion />} />
        <Route path="/category" element={currentUser && <Category />} />
        <Route path="/search" element={currentUser && <Search />} />
        <Route path="/myquestions" element={currentUser && <Myquestions />} />
        <Route path="/update" element={currentUser && <Updateprofile />} />
      </Routes>
    </BrowserRouter>
  );
}
