import { useEffect } from 'react';
import { Container } from '../components';
import useStore from '../store/root';
import styles from './IndexPage.module.scss';

const IndexPage = () => {
  const {
    articles,
    initLoading: initialLoading,
    moreLoading,
    error,
    initFetch: initialFetchArticles,
  } = useStore((state) => state.article);

  useEffect(() => {
    initialFetchArticles();
  });

  return (
    <Container className={styles['container']}>
      <div className={styles['header']}>Weekly News Quiz</div>
      <div className="article-container"></div>
    </Container>
  );
};

export default IndexPage;
