'use client';

import React from 'react';
import { Navigate } from 'react-big-calendar';
// @ts-ignore – react-big-calendar internal module has no types
import TimeGrid from 'react-big-calendar/lib/TimeGrid';

export class ThreeDayView extends React.Component<any> {
  render() {
    const {
      date,
      localizer,
      min = localizer.startOf(new Date(), 'day'),
      max = localizer.endOf(new Date(), 'day'),
      scrollToTime = localizer.startOf(new Date(), 'day'),
      enableAutoScroll = true,
      ...props
    } = this.props;

    const range = ThreeDayView.range(date, { localizer });

    return (
      <TimeGrid
        {...props}
        range={range}
        eventOffset={15}
        localizer={localizer}
        min={min}
        max={max}
        scrollToTime={scrollToTime}
        enableAutoScroll={enableAutoScroll}
      />
    );
  }

  static range(date: Date, { localizer }: any) {
    return [0, 1, 2].map((i) => localizer.add(date, i, 'day'));
  }

  static navigate(date: Date, action: any, { localizer }: any) {
    switch (action) {
      case Navigate.PREVIOUS:
        return localizer.add(date, -3, 'day');
      case Navigate.NEXT:
        return localizer.add(date, 3, 'day');
      default:
        return date;
    }
  }

  static title(date: Date, { localizer }: any) {
    const [start, ...rest] = ThreeDayView.range(date, { localizer });
    return localizer.format({ start, end: rest.pop() }, 'dayRangeHeaderFormat');
  }
}
