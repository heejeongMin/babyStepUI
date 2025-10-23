import Home from '../Home';

export default function HomeExample() {
  return <Home onNavigateToMonth={(month) => console.log('Navigate to month:', month)} />;
}
