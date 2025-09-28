import React from 'react';
import { Slider } from 'antd';

interface BudgetSliderProps {
  value: [number, number];
  onChange: (value: [number, number]) => void;
  min: number;
  max: number;
}

const BudgetSlider: React.FC<BudgetSliderProps> = ({ value, onChange, min, max }) => {
  const formatCurrency = (amount: number) => {
    return `¥${amount.toLocaleString()}`;
  };

  return (
    <div className="budget-slider">
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">
          预算范围
        </label>
      </div>
      <Slider
        range
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        tipFormatter={formatCurrency}
      />
      <div className="flex justify-between text-sm text-gray-600">
        <span>{formatCurrency(value[0])}</span>
        <span>{formatCurrency(value[1])}</span>
      </div>
    </div>
  );
};

export default BudgetSlider;