import { Skeleton } from 'antd';
import { format } from 'date-fns';
import React from 'react';
import { BsNewspaper } from 'react-icons/bs';
import { FaEye, FaRegCheckSquare } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './ArticleCard.module.scss';

interface ArticleCardProps {
  title: string;
  date: Date;
  path: string;
  preview: string;
  provider?: string;
  viewCount?: number;
  questCount: number;
  thumbnailURL?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  date,
  viewCount,
  path,
  preview,
  provider,
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
          <p className={styles['article-title']}>{title}</p>
          <p className={styles['article-preview']}>{preview}</p>
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
                {questCount} quests
              </div>
            </div>

            {/* Article Provider */}
            <div className={styles['article-questions']}>
              <BsNewspaper className={styles['article-questions-icon']} />
              <div className={styles['article-questions-content']}>
                {provider || 'Unknown'}
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
