import {
  GlobalOutlined,
  QrcodeOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Modal, notification, Skeleton, Space } from 'antd';
import { NotificationPlacement } from 'antd/lib/notification';
import React, { createContext, useEffect } from 'react';
import { FaRegCheckSquare } from 'react-icons/fa';
import QRCode from 'react-qr-code';
import { useParams } from 'react-router-dom';
import SwitchTab from 'src/components/SwitchTab';
import { Container } from '../../components';
import useStore from '../../store/root';
import styles from './ArticleDetailPage.module.scss';

type ArticleDetailParams = {
  id: string;
};

const ReachableContext = createContext<string | null>(null);
const UnreachableContext = createContext<string | null>(null);

const ArticleDetailPage: React.FC = () => {
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
    if (id) initFetchArticleDetail(id);
  }, [initFetchArticleDetail, id]);

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

  useEffect(() => {
    if (error) openErrorNotification('bottomRight', error);
  }, [error]);

  const getParagraph = (content: string) => {
    if (content && content.length > 0) {
      const res = content.split(/\r?\n/);
      return res.map((paragraph, index) => {
        return (
          <p key={`paragraph_${index}`} className={styles['paragraph']}>
            {paragraph}
          </p>
        );
      });
    }
    return '';
  };

  const getCodeConfig = () => {
    const currentURL = window.location.href;
    const config = {
      title: 'QR Code',
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
      <Container className={styles['container']}>
        {initLoading ? (
          [...Array(5)].map((e, i) => (
            <div key={`skeleton-${e}-${i}`}>
              <Skeleton active={initLoading} />
            </div>
          ))
        ) : (
          <div className={styles['article']}>
            <h1 className={styles['title']}>{article.title}</h1>
            <img
              className={styles['thumbnail']}
              src={article.thumbnailURL}
              alt="Alt text"
            />
            <div className={styles['other-info']}>
              <Button id="btn-category" shape="round" size="large">
                {article.category}
              </Button>
              <Button
                id="btn-author"
                shape="round"
                icon={<UserOutlined />}
                type="text"
              >
                {article.author !== undefined ? article.author : ''}
              </Button>
              <Button
                id="btn-author"
                shape="round"
                icon={<GlobalOutlined />}
                type="text"
              >
                {article.provider !== undefined ? article.provider : ''}
              </Button>

              <div className={styles['article-questions']}>
                <FaRegCheckSquare
                  className={styles['article-questions-icon']}
                />
                <div className={styles['article-questions-content']}>
                  {article.quests !== undefined ? article.quests.length : 0}{' '}
                  quests
                </div>
              </div>
            </div>

            <div className={styles['content']}>
              {getParagraph(article.content)}
            </div>

            {/* Question Tab */}
            <SwitchTab article={article} />

            {/* QR Code*/}
            <ReachableContext.Provider value="Light">
              <Space>
                <Button
                  type="primary"
                  icon={<QrcodeOutlined />}
                  size={'large'}
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
