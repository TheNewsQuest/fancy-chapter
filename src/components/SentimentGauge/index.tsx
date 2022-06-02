import { Gauge } from '@ant-design/plots';
import React, { useEffect, useRef } from 'react';

interface SentimentGaugeProps {
  score: number;
}

const SentimentGauge: React.FC<SentimentGaugeProps> = ({ score }) => {
  const ticks = [0, 1 / 3, 2 / 3, 1];
  const color = ['#F4664A', '#FAAD14', '#30BF78'];
  const graphRef = useRef(null);
  useEffect(() => {
    if (graphRef.current && score) {
      let data = 0.0;
      const interval = setInterval(() => {
        if (data >= score) {
          clearInterval(interval);
        }

        data += 0.007;
        (graphRef as any).current.changeData(data > 1 ? data - 1 : data);
      }, 20);
    }
  }, [graphRef, score]);
  const config = {
    percent: 0.0,
    range: {
      ticks: [0, 1],
      color: ['l(0) 0:#F4664A 0.5:#FAAD14 1:#30BF78'],
    },
    indicator: {
      pointer: {
        style: {
          stroke: '#D0D0D0',
        },
      },
      pin: {
        style: {
          stroke: '#D0D0D0',
        },
      },
    },
    statistic: {
      title: {
        formatter: ({ percent }: any) => {
          if (percent < ticks[1]) {
            return 'Negative';
          }

          if (percent < ticks[2]) {
            return 'Neutral';
          }

          return 'Positive';
        },
        style: ({ percent }: any) => {
          return {
            fontSize: '36px',
            lineHeight: 1,
            color:
              percent < ticks[1]
                ? color[0]
                : percent < ticks[2]
                ? color[1]
                : color[2],
          };
        },
      },
      content: {
        offsetY: 36,
        style: {
          fontSize: '24px',
          color: '#4B535E',
        },
        formatter: ({ percent }: any) => {
          if (percent < ticks[1]) {
            return 'Mindful when read';
          }

          if (percent < ticks[2]) {
            return "It's OK!";
          }

          return 'Too good to read!';
        },
      },
    },
    onReady: (plot: any) => {
      graphRef.current = plot;
    },
  };

  return <Gauge {...config} />;
};

export default SentimentGauge;
