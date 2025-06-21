import React, { useState } from 'react';

interface Habit {
  name: string;
  completed: boolean;
}

const HabitTracker: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([
    { name: '朝のストレッチ', completed: false },
    { name: '読書10分', completed: false },
    { name: '英単語を5つ覚える', completed: false },
  ]);

  const toggleHabit = (index: number) => {
    const newHabits = [...habits];
    newHabits[index].completed = !newHabits[index].completed;
    setHabits(newHabits);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">毎日の習慣</h2>
      <ul>
        {habits.map((habit, index) => (
          <li key={index} className="flex items-center mb-1">
            <input
              type="checkbox"
              checked={habit.completed}
              onChange={() => toggleHabit(index)}
              className="mr-2"
            />
            <span className={habit.completed ? 'line-through text-gray-500' : ''}>{habit.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HabitTracker;