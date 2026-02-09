import React from 'react';
import { RoomStyle } from '../types';
import { Armchair, Coffee, Leaf, Anchor, Frame, Factory } from 'lucide-react';

interface StyleSelectorProps {
  selectedStyle: RoomStyle | null;
  onSelect: (style: RoomStyle) => void;
  disabled: boolean;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, onSelect, disabled }) => {
  const styles = [
    { id: RoomStyle.MODERN, icon: <Frame size={20} />, color: 'bg-neutral-100', desc: "Clean lines & minimalism" },
    { id: RoomStyle.SCANDINAVIAN, icon: <Coffee size={20} />, color: 'bg-stone-100', desc: "Cozy warmth & functionality" },
    { id: RoomStyle.MID_CENTURY, icon: <Armchair size={20} />, color: 'bg-orange-50', desc: "Retro organic vibes" },
    { id: RoomStyle.INDUSTRIAL, icon: <Factory size={20} />, color: 'bg-zinc-100', desc: "Raw materials & exposed layout" },
    { id: RoomStyle.BOHEMIAN, icon: <Leaf size={20} />, color: 'bg-emerald-50', desc: "Free-spirited & eclectic" },
    { id: RoomStyle.COASTAL, icon: <Anchor size={20} />, color: 'bg-cyan-50', desc: "Airy, breezy & light" },
  ];

  return (
    <div className="w-full py-6">
      <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4 px-1">
        Select a Design Aesthetic
      </h3>
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x scrollbar-hide">
        {styles.map((style) => (
          <button
            key={style.id}
            onClick={() => onSelect(style.id)}
            disabled={disabled}
            className={`
              relative flex-shrink-0 w-48 p-4 rounded-xl text-left border-2 transition-all duration-300 snap-center
              ${selectedStyle === style.id 
                ? 'border-neutral-900 bg-white shadow-xl scale-105' 
                : 'border-transparent bg-white hover:border-neutral-200 shadow-sm opacity-80 hover:opacity-100 hover:scale-102'}
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${style.color} text-neutral-700`}>
              {style.icon}
            </div>
            <div className="font-bold text-neutral-900">{style.id}</div>
            <div className="text-xs text-neutral-500 mt-1">{style.desc}</div>
            
            {selectedStyle === style.id && (
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StyleSelector;
