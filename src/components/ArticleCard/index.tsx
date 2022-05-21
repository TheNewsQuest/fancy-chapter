import React from "react";
import styles from "./ArticleCard.module.scss";
import { FaEye, FaRegCheckSquare } from "react-icons/fa";
import { format } from 'date-fns';

interface ArticleCardProps {
  data: {
    title: string;
    date: Date;
    viewCount: number;
    questionCount: number;
    thumbnailUrl: string;
  };
}

const ArticleCard: React.FC<ArticleCardProps> = ({ data }) => {
  return (
    <div className={styles["article-card"]}>
      <div className={styles["left"]}>
        <div className={styles["article-date"]}>{format(data.date, 'dd MMM yyyy')}</div>
      </div>
      <div className={styles["middle"]}>
        <a href="/" className={styles["article-title"]}>
          {data.title}
        </a>
        <div className={styles["article-statistics"]}>
          {/* Article views */}
          <div className={styles["article-views"]}>
            <FaEye className={styles["article-views-icon"]} />
            <div className={styles["article-views-content"]}>
              {" "}
              {data.viewCount} views
            </div>
          </div>

          {/* Article number of questions */}
          <div className={styles["article-questions"]}>
            <FaRegCheckSquare className={styles["article-questions-icon"]} />
            <div className={styles["article-questions-content"]}>
              {" "}
              {data.questionCount} questions
            </div>
          </div>
        </div>
      </div>

      <div className={styles["right"]}>
        <img
          className={styles["thumbnail-image"]}
          src={data.thumbnailUrl}
          alt=""
        />
      </div>
    </div>
  );
};

export default ArticleCard;
