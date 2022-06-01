import { Col, Row, Select } from 'antd';
import notification, { NotificationPlacement } from 'antd/lib/notification';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { Container } from '../../components';
import CategoryPie from '../../components/CategoryPie';
import KeywordWordCloud from '../../components/KeywordWordCloud';
import Spinner from '../../components/Spinner';
import useStore from '../../store/root';
import { capitalize } from '../../utils/string';
import styles from './InsightPage.module.scss';

const InsightPage: React.FC<{}> = () => {
  /* * Component-scoped states * */
  const [categorySelection, setCategorySelection] =
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

  useEffect(() => {
    if (monthSelection) {
      const month = parseInt(monthSelection.split('/')[0]);
      const year = parseInt(monthSelection.split('/')[1]);
      fetchMonthlyTotalArticles(month, year);
    }
  }, [fetchMonthlyTotalArticles, monthSelection]);

  /**
   * Initial fetch category
   */
  useEffect(() => {
    if (!categorySelection) {
      fetchCategory();
      setCategorySelection(categoryNameList[0]);
    }
  }, [fetchCategory, categorySelection, categoryNameList]);

  /**
   * Fetch keyword on success category fetch
   */
  useEffect(() => {
    if (categorySelection) fetchKeyword(categorySelection);
  }, [fetchKeyword, categorySelection]);

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
   * Pop-up error notification if keyword error is defined
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
   * Handle categorySelection change on select event
   * @param category Category
   */
  const handleCategoryChange = (category: string) => {
    setCategorySelection(category);
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
                  value={loadingCategory ? 'Loading...' : categorySelection}
                  onChange={handleCategoryChange}
                >
                  {categoryNameList.map((category) => (
                    <Select.Option key={`select_${category}`} value={category}>
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
              <p className={styles['chart-label']}>Popular Keywords</p>
            </Col>
            <Col span={6}>
              <div className={clsx(styles['selector'], styles['selector-pos'])}>
                <Select
                  value={loadingCategory ? 'Loading...' : categorySelection}
                  onChange={handleCategoryChange}
                >
                  {categoryNameList.map((category) => (
                    <Select.Option value={category}>
                      {capitalize(category)}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            </Col>
          </Row>
          <div className={styles['chart-container']}>#2 Gauge Indicator</div>
        </Col>
      </Row>
      <br />
    </Container>
  );
};

export default InsightPage;
