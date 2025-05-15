import Option from "./Option";
export default function Questions({ question, dispatch, answer }) {
  if (!question) return <p>Loading question...</p>;

  return (
    <div>
      <h4>{question.question}</h4>
      <Option question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}
