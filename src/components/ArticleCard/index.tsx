import { format } from 'date-fns';
import React from 'react';
import { FaEye, FaRegCheckSquare } from 'react-icons/fa';
import styles from './ArticleCard.module.scss';

interface ArticleCardProps {
  title: string;
  date: Date;
  viewCount: number;
  questionCount: number;
  thumbnailUrl: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  date,
  viewCount,
  questionCount,
  thumbnailUrl,
}) => {
  return (
    <div className={styles['article-card']}>
      <div className={styles['left']}>
        <div className={styles['article-date']}>
          {format(date, 'dd MMM yyyy')}
        </div>
      </div>
      <div className={styles['middle']}>
        <a href="/" className={styles['article-title']}>
          {title}
        </a>
        <div className={styles['article-statistics']}>
          {/* Article views */}
          <div className={styles['article-views']}>
            <FaEye className={styles['article-views-icon']} />
            <div className={styles['article-views-content']}>
              {' '}
              {viewCount} views
            </div>
          </div>

          {/* Article number of questions */}
          <div className={styles['article-questions']}>
            <FaRegCheckSquare className={styles['article-questions-icon']} />
            <div className={styles['article-questions-content']}>
              {' '}
              {questionCount} questions
            </div>
          </div>
        </div>
      </div>

      <div className={styles['right']}>
        <img className={styles['thumbnail-image']} src={thumbnailUrl} alt="" />
      </div>
    </div>
  );
};

export default ArticleCard;
