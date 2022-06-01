import { WordCloud } from '@ant-design/plots';
import React from 'react';
import { KeywordData } from '../../store/stats';
import styles from './KeywordWordCloud.module.scss';

interface KeywordWordCloudProps {
  data: KeywordData[];
}

const KeywordWordCloud: React.FC<KeywordWordCloudProps> = ({ data }) => {
  return (
    <div className={styles['wordcloud-container']}>
      <WordCloud
        data={data}
        wordField="text"
        weightField="value"
        colorField="text"
        wordStyle={{
          fontFamily: "'Germania One', cursive",
          fontSize: [20, 52],
          rotation: 0,
        }}
        random={() => 0.5}
      />
    </div>
  );
};

export default KeywordWordCloud;
