import React from "react";

export default function Finished({ points, maxPoints, highscore }) {
  console.log(highscore);
  const percentage = (points / maxPoints) * 100;
  let emoji;
  if (percentage === 100) emoji = "👍";
  if (percentage < 100 && percentage > 90) emoji = "✌";
  if (percentage < 90 && percentage > 80) emoji = "🤷‍♂️";
  if (percentage < 80 && percentage > 70) emoji = "😊";
  if (percentage < 70) emoji = "Fail 🐱‍🏍";
  return (
    <>
      <p className="result">
        <span>{emoji}</span>You scored {points} out of {maxPoints} (
        {Math.ceil(percentage)}%)
      </p>
      <p className="highscore">High Score: {highscore} points</p>
      <button className="btn btn-ui" onClick={() => window.location.reload()}>
        Restart Quiz
      </button>
    </>
  );
}
