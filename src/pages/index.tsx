import { notification, Skeleton } from 'antd';
import { NotificationPlacement } from 'antd/lib/notification';
import { useEffect } from 'react';
import { ArticleCard, Container } from '../components';
import ReadMoreButton from '../components/ReadMoreButton';
import useStore from '../store/root';
import { extractPreview } from '../utils/string';
import styles from './IndexPage.module.scss';

const IndexPage = () => {
  const {
    articles,
    initLoading,
    moreLoading,
    cursor,
    error,
    initFetch: initFetchArticles,
    moreFetch: moreFetchArticles,
  } = useStore((state) => state.article);

  useEffect(() => {
    if (articles.length === 0) {
      initFetchArticles();
    }
  }, [initFetchArticles, articles]);

  /**
   * Open a error notification for acknowledging end-user
   * @param placement Placement of Pop-up notification
   * @param description Description payload
   */
  const openErrorNotification = (
    placement: NotificationPlacement,
    description: string
  ) => {
    notification.error({
      message: 'Unexpected Error occurred!',
      description: description,
      placement,
    });
  };

  /**
   * Pop-up error notification if error is defined
   */
  useEffect(() => {
    if (error) openErrorNotification('bottomRight', error);
  }, [error]);

  return (
    <Container className={styles['container']}>
      <div className={styles['header']}>Weekly News Quest</div>
      <div className="article-container">
        {initLoading
          ? [...Array(5)].map((e, i) => (
              <div key={`skeleton-${e}-${i}`}>
                <Skeleton active={initLoading} />
              </div>
            ))
          : articles.map((article) => (
              <div key={article._id} className={styles['container-article']}>
                <ArticleCard
                  provider={article.provider}
                  path={`/articles/${article._id}`}
                  title={article.title}
                  preview={extractPreview(article.content)}
                  date={new Date(article.postedAt)}
                  questCount={article.quests.length}
                  thumbnailURL={article.thumbnailURL}
                />
              </div>
            ))}
      </div>
      <div className={styles['read-more-section']}>
        <ReadMoreButton
          asyncAction={moreFetchArticles}
          cursor={cursor}
          loading={moreLoading}
        />
      </div>
    </Container>
  );
};

export default IndexPage;
