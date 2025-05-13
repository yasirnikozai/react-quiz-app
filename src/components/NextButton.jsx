export default function NextButton({ answer, dispatch, index, numQuestions }) {
  if (answer === null) return null;

  const isLastQuestion = index === numQuestions - 1;

  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "nextQuestion" })}
      disabled={isLastQuestion}
    >
      {isLastQuestion ? "Finish" : "Next"}
    </button>
  );
}
