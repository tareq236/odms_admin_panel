import { cn } from '@/lib/utils';
import React from 'react'

const DetailsField = ({
    className,
    fieldName,
    fieldContent,
  }: {
    className?: string;
    fieldName: string;
    fieldContent: string | React.ReactNode;
  }) => {
    return (
      <div className={cn("", className)}>
        <h3 className="text-[12px] text-gray-500 mb-1">{fieldName}</h3>
        <h4>{fieldContent}</h4>
      </div>
    );
  };
  

export default DetailsField