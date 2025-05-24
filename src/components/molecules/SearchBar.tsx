import React, { useState } from 'react';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import Icon from '@/components/atoms/Icon';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

/**
 * Search bar component with input and button
 * 
 * Example usage:
 * ```jsx
 * <SearchBar onSearch={handleSearch} placeholder="Search locations..." />
 * ```
 */
const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Quick Search...',
  className = '',
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`flex w-full items-center ${className}`}
    >
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        icon={<Icon name="Search" size={18} />}
        className="rounded-r-none border-r-0 w-full"
        fullWidth
      />
      <Button 
        type="submit" 
        variant="primary"
        className="h-[38px] rounded-l-none"
      >
        <Icon name="Search" size={18} />
      </Button>
    </form>
  );
};

export default SearchBar;