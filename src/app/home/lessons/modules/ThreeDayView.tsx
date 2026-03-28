'use client';

import React from 'react';
import { Navigate } from 'react-big-calendar';
// @ts-expect-error – react-big-calendar internal module has no types
import TimeGrid from 'react-big-calendar/lib/TimeGrid';

interface LocalizerApi {
  startOf(date: Date, unit: string): Date;
  endOf(date: Date, unit: string): Date;
  add(date: Date, amount: number, unit: string): Date;
  format(range: { start: Date; end?: Date }, formatStr: string): string;
}

interface ThreeDayViewProps {
  date: Date;
  localizer: LocalizerApi;
  min?: Date;
  max?: Date;
  scrollToTime?: Date;
  enableAutoScroll?: boolean;
  [key: string]: unknown;
}

export class ThreeDayView extends React.Component<ThreeDayViewProps> {
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

  static range(date: Date, { localizer }: { localizer: LocalizerApi }) {
    return [0, 1, 2].map((i) => localizer.add(date, i, 'day'));
  }

  static navigate(date: Date, action: string, { localizer }: { localizer: LocalizerApi }) {
    switch (action) {
      case Navigate.PREVIOUS:
        return localizer.add(date, -3, 'day');
      case Navigate.NEXT:
        return localizer.add(date, 3, 'day');
      default:
        return date;
    }
  }

  static title(date: Date, { localizer }: { localizer: LocalizerApi }) {
    const [start, ...rest] = ThreeDayView.range(date, { localizer });
    return localizer.format({ start, end: rest.pop() }, 'dayRangeHeaderFormat');
  }
}
