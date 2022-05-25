import React from "react";
import styles from "./ShortAnswer.module.scss";

interface ShortAnswerObject {
  question: string;
  answer: string;
}

interface ShortAnswerProps {
  shortAnswerList: ShortAnswerObject[];
}

const ShortAnswer: React.FC<ShortAnswerProps> = ({ shortAnswerList }) => {
  const shortAnswer = shortAnswerList.map((item, index) => {
    return (
      <div className={styles["question-item"]}>
        <div className={styles["question"]}>
          {index + 1}. {item.question}{" "}
        </div>
        <div className={styles["answer-input"]}>
          <input type="text" />
        </div>
      </div>
    );
  });

  return (
    <>
      <div className={styles["container"]}>
        <div className={styles["question-container"]}>{shortAnswer}</div>
        <button className={styles["check-answers"]}>Check your answers</button>
      </div>
    </>
  );
};

export default ShortAnswer;
