import { Pie } from '@ant-design/plots';
import React from 'react';
import { CategoryArticleData } from '../../store/stats';

interface CategoryPieProps {
  data: CategoryArticleData[];
}

const CategoryPie: React.FC<CategoryPieProps> = ({ data }) => {
  return (
    <Pie
      data={data}
      angleField="value"
      colorField="category"
      appendPadding={10}
      radius={0.75}
      label={{
        type: 'spider',
        labelHeight: 28,
        content: '{name}\n{percentage}',
      }}
      interactions={[
        {
          type: 'element-selected',
        },
        {
          type: 'element-active',
        },
      ]}
    />
  );
};

export default CategoryPie;
