import { Col, Row, Select } from 'antd';
import notification, { NotificationPlacement } from 'antd/lib/notification';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { Container } from '../../components';
import CategoryPie from '../../components/CategoryPie';
import KeywordWordCloud from '../../components/KeywordWordCloud';
import SentimentGauge from '../../components/SentimentGauge';
import Spinner from '../../components/Spinner';
import useStore from '../../store/root';
import { capitalize } from '../../utils/string';
import styles from './InsightPage.module.scss';

const InsightPage: React.FC<{}> = () => {
  /* * Component-scoped states * */
  const [keywordCategorySelection, setKeywordCategorySelection] =
    useState<string | null>(null);

  const [sentimentCategorySelection, setSentimentCategorySelection] =
    useState<string | null>(null);

  const [monthSelection, setMonthSelection] = useState<string>('5/2022');

  /* * Zustand's slice states * */
  const {
    data: dataKeyword,
    fetch: fetchKeyword,
    loading: loadingKeyword,
    error: errorKeyword,
  } = useStore((state) => state.stats.keyword);

  const {
    nameList: categoryNameList,
    loading: loadingCategory,
    error: errorCategory,
    fetch: fetchCategory,
  } = useStore((state) => state.stats.category);

  const {
    data: dataMonthlyTotalArticles,
    fetch: fetchMonthlyTotalArticles,
    loading: loadingMonthlyTotalArticles,
    error: errorMonthlyLoadingArticles,
  } = useStore((state) => state.stats.monthlyTotalArticles);

  const {
    data: dataSentiment,
    loading: loadingSentiment,
    error: errorSentiment,
    fetch: fetchSentiment,
  } = useStore((state) => state.stats.sentiment);

  /**
   * Open a error notification for acknowledging end-user
   * @param placement Placement of Pop-up notification
   * @param description Description payload
   */
  const openErrorNotification = (
    message: string = 'Unexpected Error occurred!',
    placement: NotificationPlacement,
    description: string
  ) => {
    notification.error({
      message,
      description: description,
      placement,
    });
  };
  /**
   * Fetch sentiment scores
   */
  useEffect(() => {
    fetchSentiment();
  }, [fetchSentiment]);

  /**
   * Fetch Monthly Total Articles
   */
  useEffect(() => {
    const month = parseInt(monthSelection.split('/')[0]);
    const year = parseInt(monthSelection.split('/')[1]);
    fetchMonthlyTotalArticles(month, year);
  }, [fetchMonthlyTotalArticles, monthSelection]);

  /**
   * Fetch list of categories
   */
  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  /**
   * Set default category selection for keyword, sentiment
   */
  useEffect(() => {
    if (categoryNameList.length > 0) {
      setKeywordCategorySelection(categoryNameList[0]);
      setSentimentCategorySelection(categoryNameList[0]);
    }
  }, [categoryNameList]);

  /**
   * Fetch keyword on success category fetch
   */
  useEffect(() => {
    if (keywordCategorySelection) fetchKeyword(keywordCategorySelection);
  }, [fetchKeyword, keywordCategorySelection]);

  /**
   * Pop-up error notification if keyword error is defined
   */
  useEffect(() => {
    if (errorKeyword)
      openErrorNotification(
        'WordCloud fetch error!',
        'bottomRight',
        errorKeyword
      );
  }, [errorKeyword]);

  /**
   * Pop-up error notification if category error is defined
   */
  useEffect(() => {
    if (errorCategory)
      openErrorNotification(
        'Category fetch error',
        'bottomRight',
        errorCategory
      );
  }, [errorCategory]);

  /**
   * Pop-up error notification if category dominance error is defined
   */
  useEffect(() => {
    if (errorMonthlyLoadingArticles)
      openErrorNotification(
        'Category dominance fetch error',
        'bottomRight',
        errorMonthlyLoadingArticles
      );
  }, [errorMonthlyLoadingArticles]);

  /**
   * Pop-up error notification if sentiment score error is defined
   */
  useEffect(() => {
    if (errorSentiment)
      openErrorNotification(
        'Sentiment fetch error',
        'bottomRight',
        errorSentiment
      );
  }, [errorSentiment]);
  /**
   * Handle keywordCategorySelection change on select event
   * @param category Category
   */
  const handleKeywordCategoryChange = (category: string) => {
    setKeywordCategorySelection(category);
  };

  /**
   * Handle sentimentCategorySelection change on select event
   * @param category Category
   */
  const handleSentimentCategoryChange = (category: string) => {
    setSentimentCategorySelection(category);
  };

  /**
   * Handle month a year change on select event
   * @param month Month of a year
   */
  const handleMonthChange = (month: string) => {
    setMonthSelection(month);
  };

  return (
    <Container className={styles['trend-page-container']}>
      <div className={styles['header']}>Latest Wise Insight</div>
      {/* Word Cloud section */}
      <Row>
        <Col span={24} className={styles['wordcloud-section']}>
          <Row>
            <Col span={18}>
              <p className={styles['chart-label']}>Popular Keywords</p>
            </Col>
            <Col span={6}>
              <div className={clsx(styles['selector'], styles['selector-pos'])}>
                <Select
                  value={
                    loadingCategory ? 'Loading...' : keywordCategorySelection
                  }
                  onChange={handleKeywordCategoryChange}
                >
                  {categoryNameList.map((category) => (
                    <Select.Option
                      key={`select_keyword_${category}`}
                      value={category}
                    >
                      {capitalize(category)}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            </Col>
          </Row>
          <Row
            className={styles['chart-container']}
            style={{
              display: loadingKeyword || loadingCategory ? 'flex' : 'block',
            }}
          >
            {loadingKeyword || loadingCategory ? (
              <Spinner />
            ) : (
              <KeywordWordCloud data={dataKeyword} />
            )}
          </Row>
        </Col>
      </Row>
      <br />
      <br />
      <Row gutter={24}>
        {/* Pie Chart Section */}
        <Col md={12} xs={24}>
          <Row>
            <Col span={18}>
              <p className={styles['chart-label']}>Category Dominance</p>
            </Col>
            <Col span={6}>
              <div className={clsx(styles['selector'], styles['selector-pos'])}>
                <Select value={monthSelection} onChange={handleMonthChange}>
                  <Select.Option value="5/2022">5/2022</Select.Option>
                </Select>
              </div>
            </Col>
          </Row>
          <div
            className={styles['chart-container']}
            style={{
              display: loadingMonthlyTotalArticles ? 'flex' : 'block',
            }}
          >
            {loadingMonthlyTotalArticles ? (
              <Spinner />
            ) : (
              <CategoryPie data={dataMonthlyTotalArticles} />
            )}
          </div>
        </Col>
        {/* Sentiment Gauge Section */}
        <Col md={12} xs={24}>
          <Row>
            <Col span={18}>
              <p className={styles['chart-label']}>Sentiment Score</p>
            </Col>
            <Col span={6}>
              <div className={clsx(styles['selector'], styles['selector-pos'])}>
                <Select
                  value={
                    loadingSentiment || loadingCategory
                      ? 'Loading...'
                      : sentimentCategorySelection
                  }
                  onChange={handleSentimentCategoryChange}
                >
                  {categoryNameList.map((category) => (
                    <Select.Option
                      key={`select_sentiment_${category}`}
                      value={category}
                    >
                      {capitalize(category)}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            </Col>
          </Row>
          <div className={styles['chart-container']}>
            {/* NOTE: The one with useRef requires the component to be mounted beforehand. Use 'none' to hide it */}
            {(loadingCategory || loadingSentiment) && <Spinner />}
            <div
              style={{
                display: loadingSentiment || loadingCategory ? 'none' : 'block',
              }}
            >
              <SentimentGauge
                score={dataSentiment[sentimentCategorySelection as string]}
              />
            </div>
          </div>
        </Col>
      </Row>
      <br />
    </Container>
  );
};

export default InsightPage;
