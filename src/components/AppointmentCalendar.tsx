'use client';

import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { format, isBefore, startOfToday } from 'date-fns';
import 'react-day-picker/dist/style.css';

type Props = {
  onDateSelect: (date: Date) => void;
  selectedDate: Date | undefined;
};

export default function AppointmentCalendar({ onDateSelect, selectedDate }: Props) {
  const [selected, setSelected] = useState<Date | undefined>(selectedDate);

  const today = startOfToday();

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    setSelected(date);
    onDateSelect(date);
  };
  
  const formattedDate = selected ? format(selected, 'EEE, MMM d') : 'Select a date';

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full">
      <div className="bg-primary text-primary-foreground p-6 rounded-t-lg">
        <p className="text-sm font-medium uppercase tracking-wider text-primary-foreground/80">Select Date</p>
        <p className="text-3xl font-bold font-headline mt-1">{formattedDate}</p>
      </div>
      <div className="p-4">
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={handleDateSelect}
          disabled={(date) => isBefore(date, today)}
          showOutsideDays
          className="w-full"
          classNames={{
            months: 'flex justify-center',
            month: 'w-full space-y-4',
            caption: 'flex justify-center pt-1 relative items-center',
            caption_label: 'text-lg font-medium font-headline',
            nav: 'space-x-1 flex items-center',
            nav_button: 'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
            nav_button_previous: 'absolute left-1',
            nav_button_next: 'absolute right-1',
            table: 'w-full border-collapse space-y-1',
            head_row: 'flex',
            head_cell: 'text-muted-foreground rounded-md w-9 font-medium text-[0.8rem]',
            row: 'flex w-full mt-2',
            cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
            day: 'h-9 w-9 p-0 font-normal aria-selected:opacity-100 rounded-full hover:bg-accent transition-colors',
            day_selected: 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
            day_today: 'bg-accent text-accent-foreground rounded-full',
            day_disabled: 'text-muted-foreground opacity-50 cursor-not-allowed',
            day_outside: 'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
            day_hidden: 'invisible',
          }}
        />
      </div>
    </div>
  );
}
