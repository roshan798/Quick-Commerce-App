import { useState, ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import BreadcrumbContext from './BreadcrumbContext';
import { breadcrumbsMap } from '../utils/breadcrumbsMap';
import { BreadcrumbItem } from '../types/breadcrumb';

export default function BreadcrumbProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [breadcrumbs, setBreadcrumbState] = useState<BreadcrumbItem[]>([]);
    const location = useLocation();

    useEffect(() => {
        const normalizedPath = normalizePath(location.pathname);
        const currentBreadcrumbs = breadcrumbsMap[normalizedPath];

        // console.log("Original Path:", location.pathname);
        // console.log("Normalized Path:", normalizedPath);
        // console.log("Breadcrumbs:", currentBreadcrumbs);

        if (currentBreadcrumbs) {
            setBreadcrumbState(currentBreadcrumbs);
        } else {
            setBreadcrumbState([]);
        }
    }, [location]);

    return (
        <BreadcrumbContext.Provider value={{ breadcrumbs }}>
            {children}
        </BreadcrumbContext.Provider>
    );
}

// Remove dynamic segments if they look like IDs or UUIDs
function normalizePath(pathname: string): string {
    const segments = pathname.split('/').filter(Boolean);

    // If the last segment looks like an ID or slug (adjust regex if needed), remove it
    if (segments.length && isDynamicValue(segments[segments.length - 1])) {
        segments.pop();
    }

    return '/' + segments.join('/');
}

function isDynamicValue(segment: string): boolean {
    const flag = /^\d+$/.test(segment) || /^[a-fA-F0-9_-]{6,}$/.test(segment);
    // strings like UUIDs, numeric IDs, slugs, etc.
    return flag;
}
