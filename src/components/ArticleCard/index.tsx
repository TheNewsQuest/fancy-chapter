import { Skeleton } from 'antd';
import { format } from 'date-fns';
import React from 'react';
import { FaEye, FaRegCheckSquare } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './ArticleCard.module.scss';

interface ArticleCardProps {
  title: string;
  date: Date;
  path: string;
  viewCount?: number;
  questCount: number;
  thumbnailURL?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  date,
  viewCount,
  path,
  questCount,
  thumbnailURL,
}) => {
  return (
    <Link to={path}>
      <div className={styles['article-card']}>
        <div className={styles['left']}>
          <div className={styles['article-date']}>
            {format(date, 'dd MMM yyyy')}
          </div>
        </div>
        <div className={styles['middle']}>
          <a href={path} className={styles['article-title']}>
            {title}
          </a>
          <div className={styles['article-statistics']}>
            {/* Article views */}
            <div className={styles['article-views']}>
              <FaEye className={styles['article-views-icon']} />
              <div className={styles['article-views-content']}>
                {viewCount || 0} views
              </div>
            </div>

            {/* Article number of questions */}
            <div className={styles['article-questions']}>
              <FaRegCheckSquare className={styles['article-questions-icon']} />
              <div className={styles['article-questions-content']}>
                {questCount} questions
              </div>
            </div>
          </div>
        </div>

        <div className={styles['right']}>
          {!thumbnailURL ? (
            <Skeleton.Image className={styles['thumbnail-images']} />
          ) : (
            <img
              className={styles['thumbnail-image']}
              src={thumbnailURL}
              alt=""
            />
          )}
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
