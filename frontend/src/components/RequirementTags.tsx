import React from 'react';
import { Tag, Space } from 'antd';

interface RequirementTagsProps {
  selectedTags: string[];
  onChange: (tags: string[]) => void;
}

const requirementOptions = [
  '便携', '长续航', '高性能', '轻薄', '大屏幕',
  '高刷新率', '好散热', '好音质', '快充', '多接口',
  '游戏性能', '办公学习', '影音娱乐', '创作设计', '日常使用'
];

export const RequirementTags: React.FC<RequirementTagsProps> = ({
  selectedTags,
  onChange
}) => {
  const handleTagChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter(t => t !== tag);
    onChange(nextSelectedTags);
  };

  return (
    <div className="requirement-tags">
      <h3 className="text-lg font-semibold mb-4">选择您的需求</h3>
      <Space size={[8, 8]} wrap>
        {requirementOptions.map(tag => (
          <Tag.CheckableTag
            key={tag}
            checked={selectedTags.includes(tag)}
            onChange={checked => handleTagChange(tag, checked)}
            className="px-3 py-1 border rounded-md cursor-pointer transition-colors hover:border-blue-400"
          >
            {tag}
          </Tag.CheckableTag>
        ))}
      </Space>
    </div>
  );
};