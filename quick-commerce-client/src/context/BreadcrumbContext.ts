import { createContext } from 'react';
import { BreadcrumbContextType } from '../types/breadcrumb';

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(
    undefined
);

export default BreadcrumbContext;
