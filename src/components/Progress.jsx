import React from "react";

export default function Progress({
  index = 0,
  numQuestions = 0,
  points = 0,
  maxPoints = 0,
  answer = null,
}) {
  const safeValue = numQuestions > 0 ? index + Number(answer !== null) : 0;

  return (
    <header className="progress">
      <progress max={numQuestions > 0 ? numQuestions : 1} value={safeValue} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        {points} / {maxPoints}
      </p>
    </header>
  );
}
