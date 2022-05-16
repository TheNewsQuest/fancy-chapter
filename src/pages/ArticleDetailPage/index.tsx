import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './ArticleDetailPage.module.scss';

type ArticleDetailParams = {
  id: string;
};

const ArticleDetailPage: React.FC = () => {
  let { id } = useParams<ArticleDetailParams>();
  return (
    <>
      <div className={styles['article-detail']}>
        <h1>This is article #{id} page</h1>
      </div>
    </>
  );
};

export default ArticleDetailPage;
