import { useEffect, useState } from 'react';
import Login from './Login';
import './App.css';
import Myquestions from './components/Myquestions';
import Home from './components/Home';
import Createquestion from './components/Createquestion';
import Category from './components/Category';
import Search from './components/Search';
import Updateprofile from './components/Updateprofile';
import {BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from 'axios';
import LoginInput from './components/LoginInput';

export default function App(props) {
  const [currentUser, setCurrentUser] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("/api/categories").then((rows) => {
      console.log("rows.data", rows.data);
      setCategories([...rows.data]);
    });
  },[]);

  return (
    <BrowserRouter>
      <div className="App">
        {!currentUser && <Login />}
        <div className="loginbutton">
          {!currentUser && (
            <button onClick={() => setCurrentUser({ name: "bob" })}>Submit</button>
          )}
        </div>
        {currentUser && (
          <header>
            <nav>
              <div>
                <Link to="/home">Home</Link>
              </div>
              <div>
                <Link to="/createquestion">Ask a Question?</Link>
              </div>
              <div>
                <Link to="/category">Categories</Link>
              </div>
              <div>
                <Link to="/search">Search</Link>
              </div>
              <div>
                <Link to="/myquestions">My Questions</Link>
              </div>
              <div>
                <Link to="/update">Update</Link>
              </div>
              <div>
                <Link to="/login">Log Out</Link>
              </div>
            </nav>
          </header>
        )}
      </div>
      <Routes>
        <Route path="/home" element={currentUser && <Home />} />
        <Route path="/createquestion" element={currentUser && <Createquestion />} />
        <Route path="/category"
          element={
            currentUser && (
              categories.map(category => (<Category key={category.id} name={category.name} />))
            )
          }
        />
        <Route path="/search" element={currentUser && <Search />} />
        <Route path="/myquestions" element={currentUser && <Myquestions />} />
        <Route path="/update" element={currentUser && <Updateprofile />} />
      </Routes>
    </BrowserRouter>
  );
}
