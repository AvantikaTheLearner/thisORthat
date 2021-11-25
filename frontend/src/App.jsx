import { useEffect, useState } from 'react';
import './App.scss';
import Questions from './components/Questions';
import Home from './components/Home';
import Createquestion from './components/Createquestion';
import Category from './components/Category';
import Search from './components/Search';
import Updateprofile from './components/Updateprofile';
import {BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from 'axios';

export default function App(props) {
  const {currentUser} = props;
  console.log("props", props);
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    axios.get("/api/categories").then((rows) => {
      setCategories([...rows.data]);
    });
  },[]);

  useEffect(() => {
    axios.get("/api/questions").then((rows) => {
      setQuestions(rows.data);
    });
  }, []);

  // useEffect(() => {
  //   axios.get(`/api/users/questions/${currentUser.id}`).then((rows) => {
  //     setQuestions(rows.data);
  //   });
  // }, []);

  useEffect(() => {
    axios.get("/api/options").then((rows) => {
      setOptions(rows.data);
    });
  }, []);

  const logout = function(e) {
    e.preventDefault();
    axios
      .post("/api/logout", {})
  };

  return (
    <BrowserRouter>
      <div className="App">
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
              <Link to="/questions">Questions</Link>
              <Link to="/update">Update</Link>
              <Link to="">{currentUser.first_name}</Link>
              <Link to="/login"><button type="submit" onClick={logout}>Log Out</button></Link>
            </nav>
          </section>
          <section className="schedule">
          </section>
        </main>
      </div>
      <Routes>
        <Route path="/home" element={<Home question={questions.question_text} options={options} />} />
        <Route path="/createquestion" element={<Createquestion />} />
        <Route path="/category"
          element={categories.map(category => (<Category key={category.id} name={category.name} />))}
        />
        <Route path="/search" element={<Search />} />
        <Route path="/questions" element={<Questions questions={questions} options={options} />} />
        <Route path="/update" element={<Updateprofile />} />
      </Routes>
    </BrowserRouter>
  );
}
