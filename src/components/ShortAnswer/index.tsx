import React, { useState } from 'react';
import { Quest } from 'src/types/article';
import styles from './ShortAnswer.module.scss';

interface ShortAnswerProps {
  shortAnswerList: Quest[];
}

const ShortAnswer: React.FC<ShortAnswerProps> = ({ shortAnswerList }) => {
  const [checked, setChecked] = useState(false);

  const getAnswer = (item: Quest) => {
    return (
      <div className={styles['correct-answer']}>
        Answer: {item.choices[item.answer]}
      </div>
    );
  };

  const shortAnswer = (list: Quest[]) => {
    return list.map((item, index) => {
      return (
        <div key={`question-item-${index}`} className={styles['question-item']}>
          <div className={styles['question']}>
            {index + 1}. {item.description}
          </div>
          <div className={styles['answer-input']}>
            <input type="text" />
          </div>
          {checked === true ? getAnswer(item) : ''}
        </div>
      );
    });
  };

  return (
    <>
      <div className={styles['container']}>
        {shortAnswerList ? (
          <div className={styles['question-container']}>
            {shortAnswer(shortAnswerList)}
          </div>
        ) : (
          ''
        )}
        {shortAnswerList ? (
          <button
            className={styles['check-answers']}
            onClick={() => setChecked(true)}
          >
            Check your answers
          </button>
        ) : (
          ''
        )}
      </div>
    </>
  );
};

export default ShortAnswer;
