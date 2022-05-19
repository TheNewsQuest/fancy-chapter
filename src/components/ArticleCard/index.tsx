import React from "react";
import styles from "./ArticleCard.module.scss";
// get our fontawesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCoffee, faEye, faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import { FaBeer } from 'react-icons/fa';

interface ArticleCardProps {
  data: {
    title: string;
    date: Date;
    numberOfView: number;
    numberOfQuestion: number;
    thumbnailUrl: string;
  }

}

const ArticleCard: React.FC<ArticleCardProps> = ({data}) => {
  return (
    <div className={styles["article-card"]}>
      <h3 className={styles["article-title"]}>{data.title}</h3>
      {/* Article views */}
      <div className={styles["article-views"]}>
        <FontAwesomeIcon icon="eye" className={styles["article-views-icon"]}/>
        <div className={styles["article-views-content"]}> {data.numberOfView} views</div>
      </div>

      {/* Article number of questions */}
      <div className={styles["article-questions"]}>
        <FontAwesomeIcon icon={['far', 'square-check']} className={styles["article-questions-icon"]}/>
        <div className={styles["article-questions-content"]}> {data.numberOfQuestion} questions</div>
      </div>


      <img className={styles["thumbnail-image"]} src={data.thumbnailUrl} alt="" />
      <div className={styles["article-date"]}>{data.date.toDateString()}</div>
    </div>
  );
};

export default ArticleCard;
