import { ComponentMeta, ComponentStory } from '@storybook/react';
import ReadMoreButton from '.';

export default {
  title: 'ReadMoreButton',
  component: ReadMoreButton,
} as ComponentMeta<typeof ReadMoreButton>;

const Template: ComponentStory<typeof ReadMoreButton> = (args) => (
  <ReadMoreButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  cursor: {
    datetime: new Date().toISOString(),
    id: '75234asnxzc09212bcsa',
    isEnd: false,
  },
  loading: false,
  asyncAction: async () => {
    console.log('State mutation action!');
  },
};
