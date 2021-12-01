import { useEffect, useState } from "react";
import "./App.scss";
import Questions from "./components/Questions";
import Home from "./components/Home";
import CreateQuestion from "./components/CreateQuestion";
import Categories from "./components/Categories";
import Search from "./components/Search";
import Updateprofile from "./components/Updateprofile";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Login from "./Login";

export default function App(props) {
  const { currentUser, setCurrentUser} = props;
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [userquestions, setUserQuestions] = useState([]);


  useEffect(() => {
    axios.get("/api/categories").then((rows) => {
      setCategories(rows.data);
    });
  }, []);

  useEffect(() => {
    axios.get("/api/questions").then((rows) => {
      setQuestions(rows.data);
    });
  }, []);


  useEffect(() => {
    axios.post("/api/questions/forUser", { currentUser }).then((rows) => {
      setUserQuestions(rows.data);
      console.log("setUserQuestions", rows.data);
    });
  }, []);
  
  const navigate = useNavigate();

  const logout = function () {
    setCurrentUser(null);
    //navigate('/login');
    axios.post("/api/logout", { currentUser }).then((rows) => {
    })
    .catch((err) => {
      console.log("error", err.message);
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
              <Link to="/home"><button>Home</button></Link>
              <Link to="/createquestion"><button>Ask a Question?</button></Link>
              <Link to="/categories"><button>Categories</button></Link>
              <Link to="/search"><button>Search</button></Link>

              <Link to="/questions"><button>Questions</button></Link>
              {/* <Link to="/update"><button>Update</button></Link> */}
              <span style={{ color: "white" }}>
                Welcome : @{currentUser.handle}!
              </span>
              <Link to="/login"><button onClick={logout}>
                Log Out
              </button></Link>
            </nav>
          </section>
          <Routes>
            <Route
              path="/home"
              element={<Home currentUser={currentUser} questions={userquestions} />}
            />
            <Route
              path="/createquestion"
              element={<CreateQuestion currentUser={currentUser} />}
            />
            <Route
              path="/categories"
              element={
                <Categories currentUser={currentUser} categories={categories} setCategories={setCategories} />
              }
            />
            <Route
              path="/search"
              element={<Search currentUser={currentUser} />}
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
