import React, { useEffect } from "react";
import { notification, Skeleton } from "antd";
import { NotificationPlacement } from "antd/lib/notification";
import { useParams } from "react-router-dom";
import { Container } from "../../components";
import styles from "./ArticleDetailPage.module.scss";
import useStore from "../../store/root";

type ArticleDetailParams = {
  id: string;
};

const ArticleDetailPage: React.FC = () => {
  const {
    article,
    initLoading,
    error,
    initFetch: initFetchArticleDetail,
  } = useStore((state) => state.articleDetail);

  let { id } = useParams<ArticleDetailParams>();
  // const mock = mockData[0];

  useEffect(() => {
    initFetchArticleDetail();
  }, [initFetchArticleDetail]);

  const openErrorNotification = (
    placement: NotificationPlacement,
    description: string
  ) => {
    notification.error({
      message: "Unexpected Error occurred!",
      description: description,
      placement,
    });
  };

  useEffect(() => {
    if (error) openErrorNotification("bottomRight", error);
  }, [error]);

  return (
    <>
      <Container className={styles["container"]}>
        {initLoading ? (
          [...Array(5)].map((e, i) => (
            <div key={`skeleton-${e}-${i}`}>
              <Skeleton active={initLoading} />
            </div>
          ))
        ) : (
          <div className={styles["article"]}>
            <h1 className={styles["title"]}>{article.title}</h1>
            <img
              className={styles["thumbnail"]}
              src={article.thumbnailURL}
              alt="Alt text"
            />
            <div className={styles["content"]}>{article.content}</div>
            {/* TODO: Question Tab */}
          </div>
        )}
      </Container>
    </>
  );
};


export default ArticleDetailPage;
