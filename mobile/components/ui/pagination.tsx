import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  // Generate page numbers to show
  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 5;
    
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pages = getVisiblePages();

  return (
    <View className="flex-row items-center justify-center my-8">
      <View className="flex-row items-center bg-white border border-divider rounded-2xl overflow-hidden shadow-sm">
        {/* First Button */}
        <TouchableOpacity
          onPress={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={`px-4 py-3 border-r border-divider ${currentPage === 1 ? 'opacity-30' : ''}`}
        >
          <Text className="text-primary font-bold">First</Text>
        </TouchableOpacity>

        {/* Page Numbers */}
        <View className="flex-row items-center">
          {pages.map((page) => (
            <TouchableOpacity
              key={page}
              onPress={() => onPageChange(page)}
              className={`w-12 h-12 items-center justify-center border-r border-divider last:border-r-0 ${
                currentPage === page ? 'bg-primary' : ''
              }`}
            >
              <Text
                className={`text-lg font-bold ${
                  currentPage === page ? 'text-white' : 'text-primary'
                }`}
              >
                {page}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Next Button */}
        <TouchableOpacity
          onPress={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`px-4 py-3 border-l border-divider ${currentPage === totalPages ? 'opacity-30' : ''}`}
        >
          <Text className="text-primary font-bold">Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
