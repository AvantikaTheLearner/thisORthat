import { useEffect, useState } from 'react';
import Login from './Login';
import './App.scss';
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
          <main className="layout">
            <section className="sidebar">
              <img
                className="sidebar--centered"
                src="/apple-touch-icon.png"
                alt="this OR that?"
              />
              <hr className="sidebar__separator sidebar--centered" />
              <nav className="sidebar__menu">
                <Link to="/home">Home</Link>
                <Link to="/createquestion">Ask a Question?</Link>
                <Link to="/category">Categories</Link>
                <Link to="/search">Search</Link>
                <Link to="/myquestions">My Questions</Link>
                <Link to="/update">Update</Link>
                <Link to="/login">Log Out</Link>
              </nav>
            </section>
            <section className="schedule">
            </section>
          </main>
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
