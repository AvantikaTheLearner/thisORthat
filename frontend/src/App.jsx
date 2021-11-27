import { useEffect, useState } from "react";
import "./App.scss";
import Questions from "./components/Questions";
import Home from "./components/Home";
import CreateQuestion from "./components/CreateQuestion";
import Categories from "./components/Categories";
import Search from "./components/Search";
import Updateprofile from "./components/Updateprofile";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import Login from "./Login";

export default function App(props) {
  let { currentUser } = props;
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    axios.get("/api/categories").then((rows) => {
      setCategories([...rows.data]);
    });
  }, []);

  useEffect(() => {
    axios.get("/api/questions/withanswers").then((rows) => {
      setQuestions(rows.data);
    });
  }, []);

  useEffect(() => {
    axios.post("/api/questions/withanswers", { currentUser }).then((rows) => {
      setQuestions(rows.data);
    });
  }, []);

  // useEffect(() => {
  //   axios.get("/api/options").then((rows) => {
  //     setOptions(rows.data);
  //   });
  // }, []);

  const logout = function (e) {
    e.preventDefault();
    axios.post("/api/logout", {}).then((rows) => {
      //currentUser = null;
    });
  };

  return (
    <>
      <div className="App">
        <main className="layout">
          <section className="sidebar">
            <img
              className="sidebar--centered"
              src="/android-chrome-192x192.png"
              alt="this OR that?"
            />
            <hr className="sidebar__separator" />
            <nav className="sidebar__menu">
              <Link to="/home">Home</Link>
              <Link to="/createquestion">Ask a Question?</Link>
              <Link to="/category">Categories</Link>
              <Link to="/search">Search</Link>
              <Link to="/questions">Questions</Link>
              <Link to="/update">Update</Link>
              <p style={{ color: "white" }}>
                Welcome : {currentUser.first_name}!
              </p>
              <Link to="/login">
                <button type="submit" onClick={logout}>
                  Log Out
                </button>
              </Link>
            </nav>
          </section>
          <Routes>
            <Route
              path="/home"
              element={<Home currentUser={currentUser} questions={questions} />}
            />
            <Route
              path="/createquestion"
              element={<CreateQuestion currentUser={currentUser} />}
            />
            <Route
              path="/category"
              element={
                <Categories currentUser={currentUser} categories={categories} />
              }
            />
            <Route
              path="/search"
              element={
                <Search
                  currentUser={currentUser}
                  // question={searchquestion.question_text}
                />
              }
            />
            <Route
              path="/questions"
              element={
                <Questions currentUser={currentUser} questions={questions} />
              }
            />
            <Route
              path="/update"
              element={<Updateprofile currentUser={currentUser} />}
            />
            <Route path="/login" element={!currentUser && <Login />} />
          </Routes>
          {/* <section className="schedule"></section> */}
        </main>
      </div>
    </>
  );
}
