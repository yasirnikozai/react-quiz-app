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
const sampleQuestions = [
  {
    question: "Which is the most popular JavaScript framework?",
    options: ["Angular", "React", "Svelte", "Vue"],
    correctOption: 1,
    points: 10,
    id: "3d4c",
  },
  {
    question: "Which company invented React?",
    options: ["Google", "Apple", "Netflix", "Facebook"],
    correctOption: 3,
    points: 10,
    id: "647e",
  },
  {
    question: "What's the fundamental building block of React apps?",
    options: ["Components", "Blocks", "Elements", "Effects"],
    correctOption: 0,
    points: 10,
    id: "08b2",
  },
  {
    question:
      "What's the name of the syntax we use to describe the UI in React components?",
    options: ["FBJ", "Babel", "JSX", "ES2015"],
    correctOption: 2,
    points: 10,
    id: "2e77",
  },
  {
    question: "How does data flow naturally in React apps?",
    options: [
      "From parents to children",
      "From children to parents",
      "Both ways",
      "The developers decides",
    ],
    correctOption: 0,
    points: 10,
    id: "5575",
  },
  {
    question: "How to pass data into a child component?",
    options: ["State", "Props", "PropTypes", "Parameters"],
    correctOption: 1,
    points: 10,
    id: "fa54",
  },
  {
    question: "When to use derived state?",
    options: [
      "Whenever the state should not trigger a re-render",
      "Whenever the state can be synchronized with an effect",
      "Whenever the state should be accessible to all components",
      "Whenever the state can be computed from another state variable",
    ],
    correctOption: 3,
    points: 30,
    id: "bc90",
  },
  {
    question: "What triggers a UI re-render in React?",
    options: [
      "Running an effect",
      "Passing props",
      "Updating state",
      "Adding event listeners to DOM elements",
    ],
    correctOption: 2,
    points: 20,
    id: "3a7d",
  },
  {
    question: 'When do we directly "touch" the DOM in React?',
    options: [
      "When we need to listen to an event",
      "When we need to change the UI",
      "When we need to add styles",
      "Almost never",
    ],
    correctOption: 3,
    points: 20,
    id: "509e",
  },
  {
    question: "In what situation do we use a callback to update state?",
    options: [
      "When updating the state will be slow",
      "When the updated state is very data-intensive",
      "When the state update should happen faster",
      "When the new state depends on the previous state",
    ],
    correctOption: 3,
    points: 30,
    id: "b0ff",
  },
  {
    question:
      "If we pass a function to useState, when will that function be called?",
    options: [
      "On each re-render",
      "Each time we update the state",
      "Only on the initial render",
      "The first time we update the state",
    ],
    correctOption: 2,
    points: 30,
    id: "d0c1",
  },
  {
    question:
      "Which hook to use for an API request on the component's initial render?",
    options: ["useState", "useEffect", "useRef", "useReducer"],
    correctOption: 1,
    points: 10,
    id: "6267",
  },
  {
    question: "Which variables should go into the useEffect dependency array?",
    options: [
      "Usually none",
      "All our state variables",
      "All state and props referenced in the effect",
      "All variables needed for clean up",
    ],
    correctOption: 2,
    points: 30,
    id: "7b58",
  },
  {
    question: "An effect will always run on the initial render.",
    options: [
      "True",
      "It depends on the dependency array",
      "False",
      "In depends on the code in the effect",
    ],
    correctOption: 0,
    points: 30,
    id: "1220",
  },
  {
    question: "When will an effect run if it doesn't have a dependency array?",
    options: [
      "Only when the component mounts",
      "Only when the component unmounts",
      "The first time the component re-renders",
      "Each time the component is re-rendered",
    ],
    correctOption: 3,
    points: 20,
    id: "e303",
  },
];
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
    dispatch({ type: "dataRecived", payload: sampleQuestions });
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
