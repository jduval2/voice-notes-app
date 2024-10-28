import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Check, Tag } from 'lucide-react';
import { NoteItem } from '@/types';

interface ItemCardProps {
  item: NoteItem;
  index: number;
  category: string;
  onToggleComplete: (category: string, index: number) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  index,
  category,
  onToggleComplete,
}) => {
  return (
    <div
      className={`
        p-4 rounded-lg border mb-2
        ${item.priority === 'high' ? 'border-red-200 bg-red-50' : 'border-gray-200'}
        ${item.completed ? 'opacity-75' : ''}
      `}
    >
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onToggleComplete(category, index)}
        >
          <Check
            className={`w-4 h-4 ${
              item.completed ? 'text-green-500' : 'text-gray-400'
            }`}
          />
        </Button>

        <div className="flex-1">
          <p className={item.completed ? 'line-through text-gray-500' : ''}>
            {item.text}
          </p>

          <div className="flex flex-wrap gap-2 mt-2">
            {item.deadline && (
              <span className="flex items-center gap-1 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                {item.deadline}
              </span>
            )}

            {item.tags.map((tag, i) => (
              <span key={i} className="flex items-center gap-1 text-sm text-blue-500">
                <Tag className="w-4 h-4" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
