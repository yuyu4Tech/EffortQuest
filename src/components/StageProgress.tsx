import React from 'react';

interface StageProgressProps {
  currentStage: number;
  totalStages: number;
}

const StageProgress: React.FC<StageProgressProps> = ({ currentStage, totalStages }) => {
  const percentage = (currentStage / totalStages) * 100;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">ステージ進行度</h2>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div className="bg-blue-500 h-4 rounded-full" style={{ width: `${percentage}%` }}></div>
      </div>
      <p className="mt-1 text-sm">{`ステージ ${currentStage} / ${totalStages}`}</p>
    </div>
  );
};

export default StageProgress;