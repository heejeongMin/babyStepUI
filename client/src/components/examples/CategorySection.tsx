import CategorySection from '../CategorySection';
import { useState } from 'react';

export default function CategorySectionExample() {
  const [items, setItems] = useState([
    {
      id: "1",
      title: "Vitamin D drops",
      description: "Start 400 IU daily for breastfed babies",
      completed: false,
      category: "supplements" as const
    },
    {
      id: "2",
      title: "Iron supplements",
      description: "Consult pediatrician for dosage",
      completed: true,
      category: "supplements" as const
    }
  ]);

  const handleToggle = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  return <CategorySection category="supplements" items={items} onToggleItem={handleToggle} />;
}
