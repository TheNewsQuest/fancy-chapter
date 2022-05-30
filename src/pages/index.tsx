import { useEffect } from 'react';
import { ArticleCard, Container } from '../components';
import ReadMoreButton from '../components/ReadMoreButton';
import Spinner from '../components/Spinner';
import useStore from '../store/root';
import styles from './IndexPage.module.scss';

const IndexPage = () => {
  const {
    articles,
    initLoading,
    moreLoading,
    cursor,
    initFetch: initFetchArticles,
    moreFetch: moreFetchArticles,
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
            <div key={article._id} className={styles['container-article']}>
              <ArticleCard
                path={`/articles/${article._id}`}
                title={article.title}
                date={new Date(article.postedAt)}
                questCount={article.quests.length}
                thumbnailURL={article.thumbnailURL}
              />
            </div>
          ))
        )}
      </div>
      <ReadMoreButton
        asyncAction={moreFetchArticles}
        cursor={cursor}
        loading={moreLoading}
      />
    </Container>
  );
};

export default IndexPage;
