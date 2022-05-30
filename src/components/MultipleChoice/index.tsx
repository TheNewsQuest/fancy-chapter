import React, { useEffect, useState } from "react";
import styles from "./MultipleChoice.module.scss";

interface MultipleChoiceObject {
  question: string;
  answers: string[];
  correctAnswerIndex: number;
  // userChoice: number
}

interface MultipleChoiceProps {
  list: MultipleChoiceObject[];
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({ list }) => {

  const [userChoices, setUserChoices] = useState<number[]>([])

  const updateChoices = (index: number, ansIndex: number) => {
        
    const choices = [...userChoices]
    choices[index] = ansIndex

    console.log("All choices:");
    setUserChoices(choices)
    console.log(userChoices);

  }

  const chooseBackground = (userChoice: number, currentIndex: number, correctIndex: number) => {
    let itemStyles = []
    itemStyles.push(styles["multiple-choice-item"])
    itemStyles.push(userChoice === -1 ? styles["no-answer"] : "")
    
    if (userChoice !== -1) {
      itemStyles.push(styles["disable-click"])

      if (currentIndex === correctIndex) {
        itemStyles.push(styles["correct-answer"])
      } 

      if (userChoice === currentIndex && currentIndex !== correctIndex) {
        itemStyles.push(styles["wrong-answer"])
      }
    } 

    // if (userChoice === -1 || userChoice !== currentIndex) return styles["no-answer"]
    // if (currentIndex === correctIndex) return styles["correct-answer"]
    // else return styles["wrong-answer"]
    return itemStyles
  }

  useEffect(() => {
    const choices: number[] = []
    for (let i = 0; i < list.length; i++) {
      choices.push(-1)
    }
    console.log("All choices:");
    console.log(choices);
    
    setUserChoices([...choices])
  }, [list.length])

  const question = list.map((item, index) => {
    return (
      <div className={styles["multiple-choice-container"]}>
        <div className={styles["multiple-choice-question"]}>
          {index + 1}. {item.question}
        </div>
        <div>
          <ul className={[styles["unorder-list"], styles["random-class"]].join(' ')}>
            {item.answers.map((ans, ansIndex) => {
              return (
                <li className={chooseBackground(userChoices[index], ansIndex, item.correctAnswerIndex).join(' ')}  onClick={() => updateChoices(index, ansIndex)}>
                  <label
                    htmlFor={"question-" + index + "-option-" + ansIndex}
                    className={styles["answer-container"]}
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

  return (
    <div className={styles["container"]}>
      {question}
    </div>
  );
};

export default MultipleChoice;
