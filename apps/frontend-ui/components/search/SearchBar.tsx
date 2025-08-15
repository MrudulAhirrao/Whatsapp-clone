'use client';

import { Input } from '@/components/ui/input';
import { Search, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ 
  value, 
  onChange, 
  placeholder = "Search or start new chat" 
}: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="p-3 bg-white border-b">
      <div className="relative flex items-center">
        {isFocused && value ? (
          <Button 
            variant="ghost" 
            size="sm" 
            className="absolute left-2 z-10 p-1"
            onClick={() => {
              onChange('');
              setIsFocused(false);
            }}
          >
            <ArrowLeft className="h-4 w-4 text-[#54656f]" />
          </Button>
        ) : (
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#8696a0] z-10" />
        )}
        
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2 bg-[#f0f2f5] border-none rounded-lg text-sm focus:ring-0 focus:outline-none focus:bg-white transition-colors"
        />
      </div>
    </div>
  );
};
