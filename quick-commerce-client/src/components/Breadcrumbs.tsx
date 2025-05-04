// components/ui/Breadcrumbs.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../utils/utils';
import { useBreadcrumb } from '../hooks/useBreadcrumb'; // custom hook from context

const Breadcrumbs: React.FC<{
    separator?: React.ReactNode;
    className?: string;
}> = ({ separator = '›', className = '' }) => {
    const navigate = useNavigate();
    const { breadcrumbs } = useBreadcrumb();
    if (breadcrumbs.length <= 1) return null;

    return (
        <nav
            className={cn('text-sm text-gray-600', className)}
            aria-label="breadcrumb"
        >
            <ol className="flex flex-wrap items-center space-x-1 sm:space-x-2">
                {breadcrumbs.map((item, index) => {
                    const isLast = index === breadcrumbs.length - 1;

                    const content = (
                        <div className="flex items-center space-x-1">
                            {item.icon && (
                                <span className="text-gray-500">
                                    {item.icon}
                                </span>
                            )}
                            <span>{item.label}</span>
                        </div>
                    );

                    return (
                        <li key={index} className="flex items-center">
                            {!isLast && (item.path || item.onClick) ? (
                                <button
                                    type="button"
                                    onClick={
                                        item.onClick ??
                                        (() => navigate(item.path!))
                                    }
                                    className="text-blue-600 hover:underline focus:outline-none cursor-pointer"
                                >
                                    {content}
                                </button>
                            ) : (
                                <span className="text-gray-800 font-medium">
                                    {content}
                                </span>
                            )}

                            {!isLast && (
                                <span className="mx-1 text-gray-400 select-none">
                                    {separator}
                                </span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
