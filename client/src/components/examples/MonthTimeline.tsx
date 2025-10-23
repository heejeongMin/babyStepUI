import MonthTimeline from '../MonthTimeline';
import { useState } from 'react';

export default function MonthTimelineExample() {
  const [selected, setSelected] = useState(6);
  const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return <MonthTimeline selectedMonth={selected} availableMonths={months} onSelectMonth={setSelected} />;
}
