import React, { useEffect, useState, createContext } from "react";
import { notification, Skeleton } from "antd";
import { NotificationPlacement } from "antd/lib/notification";
import { useParams } from "react-router-dom";
import { Container } from "../../components";
import styles from "./ArticleDetailPage.module.scss";
import useStore from "../../store/root";
import { QrcodeOutlined, UserOutlined } from "@ant-design/icons";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import { useLocation } from "react-router-dom";
import QRCode from "react-qr-code";
import { Modal, Button, Space, Radio } from "antd";
import { FaRegCheckSquare } from "react-icons/fa";
import SwitchTab from "src/components/SwitchTab";

type ArticleDetailParams = {
  id: string;
};

const ReachableContext = createContext<string | null>(null);
const UnreachableContext = createContext<string | null>(null);

const ArticleDetailPage: React.FC = () => {
  const sampleLocation = useLocation();

  const [modal, contextHolder] = Modal.useModal();

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

  const getParagraph = (content: string) => {
    if (content && content.length > 0) {
      const res = content.split(/\r?\n/);
      return res.map((paragraph) => {
        console.log(paragraph);

        return <p className={styles["paragraph"]}>{paragraph}</p>;
      });
    }
    return "";
  };

  // const displayQRCodeModal = () => {
  //   let currentURL = window.location.href;
  //   console.log("HERE YOUR URL!");
  //   console.log(currentURL);
  // };

  const getCodeConfig = () => {
    const currentURL = window.location.href;
    const config = {
      title: "QR Code",
      content: (
        <>
          <QRCode value={currentURL} />
        </>
      ),
    };
    return config;
  };

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
            <div className={styles["other-info"]}>
              <Button id="btn-category" shape="round" size="large">
                {article.category}
              </Button>
              <Button
                id="btn-author"
                shape="round"
                icon={<UserOutlined />}
                type="text"
              >
                {article.author !== undefined ? article.author : ""}
              </Button>
              <Button
                id="btn-author"
                shape="round"
                icon={<UserOutlined />}
                type="text"
              >
                {article.provider !== undefined ? article.provider : ""}
              </Button>

              <div className={styles["article-questions"]}>
                <FaRegCheckSquare
                  className={styles["article-questions-icon"]}
                />
                <div className={styles["article-questions-content"]}>
                  {article.quests !== undefined ? article.quests.length : 0}{" "}
                  quests
                </div>
              </div>
            </div>

            <div className={styles["content"]}>
              {
                getParagraph(article.content)
                // article.content.split(/\r?\n/).map((paragraph) => {
                //   return <p className={styles["paragraph"]}>{paragraph}</p>
                // })
              }
            </div>

            {/* TODO: Question Tab */}
            {article !== null ? <SwitchTab article={article} /> : ""}
            {/* QR Code*/}
            <ReachableContext.Provider value="Light">
              <Space>
                <Button
                  type="primary"
                  icon={<QrcodeOutlined />}
                  size={"large"}
                  onClick={() => {
                    modal.info(getCodeConfig());
                  }}
                >
                  Get QR Code
                </Button>
              </Space>
              {/* `contextHolder` should always under the context you want to access */}
              {contextHolder}

              {/* Can not access this context since `contextHolder` is not in it */}
              <UnreachableContext.Provider value="Bamboo" />
            </ReachableContext.Provider>
          </div>
        )}
      </Container>
    </>
  );
};

export default ArticleDetailPage;
