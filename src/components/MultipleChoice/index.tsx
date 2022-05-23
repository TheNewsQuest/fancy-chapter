import React, { useState } from "react";
import styles from "./MultipleChoice.module.scss";

interface MultipleChoiceObject {
  question: string;
  answers: string[];
  correctAnswerIndex: number;
}

interface MultipleChoiceProps {
  list: MultipleChoiceObject[];
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({ list }) => {
  // const [value, setValue] = useState(1);

  // const onChange = (e: RadioChangeEvent) => {
  //   console.log("radio checked", e.target.value);
  //   setValue(e.target.value);
  // };

  const question = list.map((item, index) => {
    return (
      <div className={styles["multiple-choice-container"]}>
        <div className={styles["multiple-choice-question"]}>
          {index + 1}. {item.question}
        </div>
        <div>
          <ul>
            {item.answers.map((ans, index) => {
              return (
                <li>
                  <label
                    htmlFor={"option-" + index}
                    className={styles["container"]}
                  >
                    <input type="radio" id={"option-" + index} />
                    <span className={styles["checkmark"]}></span>
                    {ans}
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  });

  return <>{question}</>;
};

export default MultipleChoice;
