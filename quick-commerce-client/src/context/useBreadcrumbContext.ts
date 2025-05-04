import { useContext } from 'react';
import BreadcrumbContext from './BreadcrumbContext';

export const useBreadcrumbContext = () => {
    const context = useContext(BreadcrumbContext);
    if (!context) {
        throw new Error(
            'useBreadcrumbContext must be used within a BreadcrumbProvider'
        );
    }
    return context;
};
