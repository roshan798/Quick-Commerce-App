import React from 'react';

export interface BreadcrumbItem {
    label: string;
    path?: string; // Optional link destination
    icon?: React.ReactNode; // Optional icon (e.g. <HomeIcon />)
    onClick?: () => void; // Optional custom click handler
}

export interface BreadcrumbContextType {
    breadcrumbs: BreadcrumbItem[];
}
