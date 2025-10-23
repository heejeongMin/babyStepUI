import ChecklistItem from '../ChecklistItem';
import { useState } from 'react';

export default function ChecklistItemExample() {
  const [item, setItem] = useState({
    id: "1",
    title: "Vitamin D drops",
    description: "Start 400 IU daily for breastfed babies",
    completed: false,
    category: "supplements" as const
  });

  const handleToggle = () => {
    setItem(prev => ({ ...prev, completed: !prev.completed }));
  };

  return <ChecklistItem item={item} onToggle={handleToggle} />;
}
