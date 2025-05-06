import React, { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Mains from "./components/Mains";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Questions from "./components/Questions";
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataRecived": {
      return { ...state, questions: action.payload, status: "ready" };
    }
    case "dataFailed": {
      return { ...state, status: "error" };
    }
    case "start": {
      return { ...state, status: "active" };
    }
    default: {
      throw new Error("Unknown Error");
    }
  }
}

export default function App() {
  const [{ questions, status, index }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const numQuestions = questions.length;
  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Mains>
        {status === "loading" && <Loader />}
        {status === "err" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && <Questions questions={questions[index]} />}
      </Mains>
    </div>
  );
}
