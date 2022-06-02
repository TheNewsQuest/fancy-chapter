import { Tabs } from 'antd';
import React from 'react';
import { Article } from 'src/types/article';
import MultipleChoice from '../MultipleChoice';
import ShortAnswer from '../ShortAnswer';
import styles from './SwitchTab.module.scss';

const { TabPane } = Tabs;
interface SwitchTabProps {
  article: Article;
}

const SwitchTab: React.FC<SwitchTabProps> = ({ article }) => {
  return (
    <div className={styles['tab-container']}>
      <Tabs type="card" centered={true} defaultActiveKey="1">
        <TabPane tab="Multiple Choice" key="1">
          {article && <MultipleChoice list={article.quests} />}
        </TabPane>
        <TabPane tab="Short Answer" key="2">
          {article && <ShortAnswer shortAnswerList={article.quests} />}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default SwitchTab;
