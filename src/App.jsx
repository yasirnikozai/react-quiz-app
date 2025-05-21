import React, { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Mains from "./components/Mains";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Questions from "./components/Questions";
import Progress from "./components/Progress";
import Finished from "./components/Finished";
import NextButton from "./components/NextButton";
import Timer from "./components/Timer";

const initialState = {
  questions: [],
  status: "loading", // "loading", "error", "ready", "active", "finish"
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecived":
      return { ...state, questions: action.payload, status: "ready" };

    case "dataFailed":
      return { ...state, status: "error" };

    case "start":
      return { ...state, status: "active" };

    case "newAnswer": {
      const question = state.questions[state.index];
      const isCorrect = action.payload === question.correctOption;
      const gainedPoints = isCorrect ? question.points : 0;

      return {
        ...state,
        answer: action.payload,
        points: state.points + gainedPoints,
      };
    }

    case "nextQuestion": {
      const isLast = state.index === state.questions.length - 1;
      if (isLast) {
        return { ...state, status: "finish" };
      }

      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    }
    case "finish": {
      return {
        ...state,
        status: "finish",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    }
    default:
      throw new Error("Unknown action type");
  }
}

export default function App() {
  const [{ questions, status, index, answer, points, highscore }, dispatch] =
    useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPoints = questions.reduce((acc, cur) => acc + cur.points, 0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch("/questions.json");
        const data = await res.json();
        dispatch({ type: "dataRecived", payload: data });
      } catch {
        dispatch({ type: "dataFailed" });
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="app">
      <Header />
      <Mains>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && questions.length > 0 && (
          <>
            <Progress />
            <Questions
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Timer dispatch={dispatch} />
            <NextButton answer={answer} dispatch={dispatch} index={index} />
          </>
        )}
        {status === "finish" && (
          <Finished
            maxPoints={maxPoints}
            points={points}
            highscore={highscore}
          />
        )}
      </Mains>
    </div>
  );
}
