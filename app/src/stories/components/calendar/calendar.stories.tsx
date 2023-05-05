import { Meta, StoryObj } from '@storybook/react';

import Calendar from './Calendar';

const meta: Meta<typeof Calendar> = {
  title: 'Calender',
  component: Calendar,
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  render: () => <Calendar />,
};
