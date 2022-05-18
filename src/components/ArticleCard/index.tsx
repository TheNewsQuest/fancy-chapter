import React from "react";
import styles from "./ArticleCard.module.scss";

interface ArticleCardProps {
  title: string;
  date: Date;
  numberOfView: number;
  numberOfQuestion: number;
  thumbnailUrl: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  date,
  numberOfView,
  numberOfQuestion,
  thumbnailUrl,
}) => {
  return (
    <div className={styles["article-card"]}>
      <h3 className={styles["article-title"]}>{title}</h3>
      <div className={styles["article-views"]}>
        <div> {numberOfView} views</div>
      </div>
      <div className={styles["article-questions"]}>
        <div> {numberOfQuestion} questions</div>
      </div>
      <div className={styles["thumbnail-image"]}>
        <img src={thumbnailUrl} alt="" />
      </div>
      <div className={styles["article-date"]}>{date.toDateString()}</div>
    </div>
  );
};

export default ArticleCard;
