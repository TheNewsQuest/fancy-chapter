import React from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '../../components';
import styles from './ArticleDetailPage.module.scss';

type ArticleDetailParams = {
  id: string;
};

const ArticleDetailPage: React.FC = () => {
  let { id } = useParams<ArticleDetailParams>();
  return (
    <>
      <Container className={styles['container']}>
        <h1>Article #{id}</h1>
      </Container>
    </>
  );
};

export default ArticleDetailPage;
