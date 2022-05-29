import React, { useEffect, useState } from "react";
import styles from "./MultipleChoice.module.scss";

interface MultipleChoiceObject {
  question: string;
  answers: string[];
  correctAnswerIndex: number;
  userChoice: number
}

interface MultipleChoiceProps {
  list: MultipleChoiceObject[];
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({ list }) => {
  const testhaha = (index: number, item: MultipleChoiceObject) => {
    if (userChoices[index] === -1) return ""
    if (userChoices[index] === item.correctAnswerIndex) {
      return "correct-answer"
    }
    
    return "wrong-answer"
  }
  const [userChoices, setUserChoices] = useState<number[]>([])

  const updateChoices = (index: number, ansIndex: number, item: MultipleChoiceObject) => {
        
    item.userChoice = ansIndex
    const choices = userChoices
    choices[index] = item.userChoice

    console.log("All choices:");
    setUserChoices(choices)
    console.log(userChoices);

    // Disable all li
    // if (item.userChoice === -1) {

    // }
  }

  useEffect(() => {
    const choices: number[] = list.map((item) => {
      return item.userChoice
    })
    console.log("All choices:");
    console.log(choices);
    
    setUserChoices([...choices])
  }, [])

  const question = list.map((item, index) => {
    return (
      <div className={styles["multiple-choice-container"]}>
        <div className={styles["multiple-choice-question"]}>
          {index + 1}. {item.question}
        </div>
        <div>
          <ul>
            {item.answers.map((ans, ansIndex) => {
              return (
                <li className={userChoices[index] === -1 ? styles["enable-click"] : styles["disable-click"]}  onClick={() => updateChoices(index, ansIndex, item)}>
                  <label
                    htmlFor={"question-" + index + "-option-" + ansIndex}
                    className={styles["container"]}
                  >
                    <input name={"question-" + index} type="radio" id={"question-" + index + "-option-" + ansIndex} />
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
