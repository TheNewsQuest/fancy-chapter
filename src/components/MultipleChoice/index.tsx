import React, { useEffect, useState } from 'react';
import { Quest } from 'src/types/article';
import styles from './MultipleChoice.module.scss';

interface MultipleChoiceObject {
  description: string;
  choices: string[];
  answer: number;
  // userChoice: number
}

interface MultipleChoiceProps {
  list: Quest[];
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({ list }) => {
  const [userChoices, setUserChoices] = useState<number[]>([]);

  const updateChoices = (index: number, ansIndex: number) => {
    const choices = [...userChoices];
    choices[index] = ansIndex;

    setUserChoices(choices);
  };

  const isAnswerAll = () => {
    for (let choice of userChoices) {
      if (choice === -1) {
        return false;
      }
    }
    return true;
  };

  const countCorrectAnswer = (list: Quest[]) => {
    let count = 0;
    for (let i = 0; i < list.length; i++) {
      if (userChoices[i] === list[i].answer) count++;
    }

    return count;
  };

  const chooseBackground = (
    userChoice: number,
    currentIndex: number,
    correctIndex: number
  ) => {
    let itemStyles = [];
    itemStyles.push(styles['multiple-choice-item']);
    itemStyles.push(userChoice === -1 ? styles['no-answer'] : '');

    if (userChoice !== -1) {
      itemStyles.push(styles['disable-click']);

      if (currentIndex === correctIndex) {
        itemStyles.push(styles['correct-answer']);
      }

      if (userChoice === currentIndex && currentIndex !== correctIndex) {
        itemStyles.push(styles['wrong-answer']);
      }
    }

    // if (userChoice === -1 || userChoice !== currentIndex) return styles["no-answer"]
    // if (currentIndex === correctIndex) return styles["correct-answer"]
    // else return styles["wrong-answer"]
    return itemStyles;
  };

  useEffect(() => {
    if (list) {
      const choices: number[] = [];
      for (let i = 0; i < list.length; i++) {
        choices.push(-1);
      }

      setUserChoices([...choices]);
    }
  }, [list]);

  const question = (list: Quest[]) => {
    return list.map((item, index) => {
      return (
        <div
          key={`multiple_choice_container-${index}`}
          className={styles['multiple-choice-container']}
        >
          <div className={styles['multiple-choice-question']}>
            {index + 1}. {item.description}
          </div>
          <div>
            <ul
              className={[styles['unorder-list'], styles['random-class']].join(
                ' '
              )}
            >
              {item.choices.map((ans, ansIndex) => {
                return (
                  <li
                    key={`choice_${ansIndex}`}
                    className={chooseBackground(
                      userChoices[index],
                      ansIndex,
                      item.answer
                    ).join(' ')}
                    onClick={() => updateChoices(index, ansIndex)}
                  >
                    <label
                      htmlFor={'question-' + index + '-option-' + ansIndex}
                      className={styles['answer-container']}
                    >
                      <input
                        name={'question-' + index}
                        type="radio"
                        id={'question-' + index + '-option-' + ansIndex}
                      />
                      <span className={styles['checkmark']}></span>
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
  };

  return (
    <div className={styles['container']}>
      {list ? question(list) : ''}
      {list && isAnswerAll() === true ? (
        <div className={styles['total-scores']}>
          Your score is {countCorrectAnswer(list)} out of {list.length}.
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default MultipleChoice;
