import Option from "./Option";

export default function Questions({ questions }) {
  return (
    <div>
      <h4>{questions.question}</h4>
      <Option questions={questions} />
    </div>
  );
}
