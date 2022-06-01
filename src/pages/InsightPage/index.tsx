import { Select } from 'antd';
import notification, { NotificationPlacement } from 'antd/lib/notification';
import React, { useEffect, useState } from 'react';
import { Container } from '../../components';
import KeywordWordCloud from '../../components/KeywordWordCloud';
import Spinner from '../../components/Spinner';
import useStore from '../../store/root';
import styles from './InsightPage.module.scss';

const InsightPage: React.FC<{}> = () => {
  /* * Component-scoped states * */
  const [categorySelection, setCategorySelection] =
    useState<string | null>(null);

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
   * Capitalize a word
   * @param word Text to be capitalized
   * @returns Capitalized word
   */
  const capitalize = (word: string) =>
    `${word[0].toUpperCase()}${word.slice(1)}`;
  /**
   * Initial fetch keywords
   */

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
   * Handle categorySelection change on select
   * @param category Category
   */
  const handleCategoryChange = (category: string) => {
    setCategorySelection(category);
  };

  return (
    <Container className={styles['trend-page-container']}>
      <div className={styles['header']}>Satisfy Your Insights</div>
      {/* Word Cloud section */}
      <div
        style={{
          marginBottom: 10,
        }}
      >
        <div className={styles['selector']}>
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
      </div>
      <div
        className={styles['wordcloud-container']}
        style={{
          display: loadingKeyword || loadingCategory ? 'flex' : 'block',
        }}
      >
        {loadingKeyword || loadingCategory ? (
          <Spinner />
        ) : (
          <KeywordWordCloud data={dataKeyword} />
        )}
      </div>
    </Container>
  );
};

export default InsightPage;
