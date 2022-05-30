import { useEffect } from 'react';
import { Container } from '../components';
import Spinner from '../components/Spinner';
import useStore from '../store/root';
import styles from './IndexPage.module.scss';

const IndexPage = () => {
  const {
    articles,
    initLoading,
    moreLoading,
    error,
    initFetch: initFetchArticles,
  } = useStore((state) => state.article);

  useEffect(() => {
    initFetchArticles();
  }, [initFetchArticles]);

  return (
    <Container className={styles['container']}>
      <div className={styles['header']}>Weekly News Quiz</div>
      <div className="article-container">
        {initLoading ? (
          <Spinner />
        ) : (
          articles.map((article) => (
            <div key={article._id}>{article.title}</div>
          ))
        )}
      </div>
      <button>Read More</button>
    </Container>
  );
};

export default IndexPage;
