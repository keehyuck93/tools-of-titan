import React, { useCallback, useEffect, useMemo, useState } from 'react';

import dayjs from '@stories/utils/day.utils';
import styled, { css } from 'styled-components';

import Body2 from '../typography/Body2';

const CalendarWrapper = styled.div`
  padding: 8px 0px;
  width: 100%;
`;

const CalendarDaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 28px repeat(6, 40px);
  user-select: none;
  padding: 8px 0px;
`;

const TodayText = styled.div`
  display: flex;
  flex-direction: row;
  color: lightgray;

  ::before {
    content: '';
    flex: 1 1;
    border-bottom: 2px solid lightgray;
    margin: auto;
    margin-right: 16px;
  }
  ::after {
    content: '';
    width: 40px;
    border-bottom: 2px solid lightgray;
    margin: auto;
    margin-left: 16px;
  }
`;

const DateWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
`;

const DayWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
`;

const DayItem = styled.div<{ isToday?: boolean; isCurrentMonth?: boolean; active?: boolean }>`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ isToday }) =>
    isToday &&
    css`
      color: skyblue;
    `}

  ${({ isCurrentMonth }) =>
    !isCurrentMonth &&
    css`
      color: lightgray;
    `}

  ${({ active }) =>
    active &&
    css`
      border-radius: 50%;
      background: lightgray;
      color: white;
    `}
`;

const DayOfWeek = {
  0: '일',
  1: '월',
  2: '화',
  3: '수',
  4: '목',
  5: '금',
  6: '토',
};

type CalendarProps = {
  value?: string;
  onChange?: (day: string) => void;
};

type CalendarDay = {
  value: dayjs.Dayjs;
  date: number;
};

const getCalendarDays = (selectedDate: dayjs.Dayjs): CalendarDay[] => {
  const daysInMonth = selectedDate.daysInMonth();
  const firstDayOfWeek = selectedDate.date(1).day() || 7;

  const days: CalendarDay[] = [];

  for (let i = firstDayOfWeek; i > 0; i -= 1) {
    const day = selectedDate.date(-i + 1);

    days.push({
      value: day,
      date: day.date(),
    });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const day = selectedDate.date(i);
    days.push({
      value: day,
      date: day.date(),
    });
  }

  const daysCount = days.length;
  for (let i = 1; i <= 42 - daysCount; i++) {
    const day = selectedDate.date(daysInMonth + i);
    days.push({
      value: day,
      date: day.date(),
    });
  }

  return days;
};

const Calendar = ({ value, onChange }: CalendarProps) => {
  const [selectedDay, setSelectedDay] = useState<dayjs.Dayjs>(dayjs(value || undefined));

  const days = useMemo(() => {
    const year = selectedDay.year();
    const month = selectedDay.month();

    return getCalendarDays(dayjs().set('year', year).set('month', month));
  }, [selectedDay]);

  const isThisMonth = useCallback(
    (date: dayjs.Dayjs) => {
      const currentMonth = selectedDay.month();

      return date.month() === currentMonth;
    },
    [selectedDay],
  );

  const isActiveDate = useCallback(
    (date: dayjs.Dayjs) => {
      return selectedDay.isSame(date, 'date');
    },
    [selectedDay],
  );

  const handleClickDay = (day: CalendarDay) => {
    setSelectedDay(day.value);
    onChange?.(day.value.toString());
  };

  const handleMoveNextMonth = () => {
    setSelectedDay(selectedDay.add(1, 'month'));
  };

  const handleMovePrevMonth = () => {
    setSelectedDay(selectedDay.subtract(1, 'month'));
  };

  return (
    <div>
      <button onClick={handleMovePrevMonth}>-</button>
      <button onClick={handleMoveNextMonth}>+</button>
      <CalendarWrapper>
        <TodayText>
          {selectedDay.year()}.{selectedDay.month() + 1}.{selectedDay.date()}.
        </TodayText>
        <CalendarDaysGrid>
          {Object.values(DayOfWeek).map((day) => (
            <DateWrapper key={day}>{day}</DateWrapper>
          ))}
          {days.map((day) => (
            <DayWrapper onClick={() => handleClickDay(day)} key={day.value.toString()}>
              <DayItem
                isToday={day.value.isToday()}
                isCurrentMonth={isThisMonth(day.value)}
                active={isActiveDate(day.value)}
              >
                {day.date}
              </DayItem>
            </DayWrapper>
          ))}
        </CalendarDaysGrid>
      </CalendarWrapper>
    </div>
  );
};

export default Calendar;
