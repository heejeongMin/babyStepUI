import MonthDetail from '../MonthDetail';

export default function MonthDetailExample() {
  return <MonthDetail initialMonth={6} onNavigateBack={() => console.log('Navigate back')} />;
}
