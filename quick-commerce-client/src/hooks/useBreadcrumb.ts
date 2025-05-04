import { useBreadcrumbContext } from '../context/useBreadcrumbContext';

export const useBreadcrumb = () => {
    const { breadcrumbs } = useBreadcrumbContext();
    return { breadcrumbs };
};
