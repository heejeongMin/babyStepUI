import MonthCard from '../MonthCard';

export default function MonthCardExample() {
  return (
    <MonthCard
      month={6}
      ageLabel="6 Months"
      title="Sitting & Starting Solids"
      description="A major milestone month with sitting up and beginning solid foods."
      completedTasks={7}
      totalTasks={10}
      onClick={() => console.log('Month card clicked')}
    />
  );
}
