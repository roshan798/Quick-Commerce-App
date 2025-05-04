import adminPages from '../routes/admin';
import privatePagesData from '../routes/private';
import protectedPagesData from '../routes/protected';

import { BreadcrumbItem } from '../types/breadcrumb';
import { PagesData } from '../types';

const segmentsToIgnore = ['admin', 'images', 'update'];
const allPages: PagesData[] = [
    ...adminPages,
    ...privatePagesData,
    ...protectedPagesData,
];

export const breadcrumbsMap: { [key: string]: BreadcrumbItem[] } =
    generateBreadcrumbsMap();
console.log('Breadcrumbs Map:', breadcrumbsMap);
function generateBreadcrumbsMap(): { [key: string]: BreadcrumbItem[] } {
    const map: { [key: string]: BreadcrumbItem[] } = {};

    allPages.forEach((page) => {
        const segments = page.path.split('/').filter(Boolean);
        const breadcrumbs: BreadcrumbItem[] = [];

        let accumulatedPath = '';
        let keyPath = page.path;

        // If the last segment is dynamic, removing it from the key
        if (segments.length && segments[segments.length - 1].startsWith(':')) {
            keyPath = '/' + segments.slice(0, -1).join('/');
        }

        segments.forEach((segment, index) => {
            if (segmentsToIgnore.includes(segment)) {
                accumulatedPath += `/${segment}`;
                return;
            }

            accumulatedPath += `/${segment}`;

            const currentPathDepth = index + 1;
            const matchingPage = allPages.find((p) => {
                const pathSegments = p.path.split('/').filter(Boolean);
                return (
                    pathSegments.length === currentPathDepth &&
                    pathSegments.every(
                        (seg, i) => seg.startsWith(':') || seg === segments[i]
                    )
                );
            });

            if (matchingPage) {
                breadcrumbs.push({
                    label: matchingPage.name,
                    path: accumulatedPath,
                });
            } else {
                // Only include the last breadcrumb label if not dynamic
                if (!segment.startsWith(':')) {
                    breadcrumbs.push({
                        label: segment
                            .replace(/-/g, ' ')
                            .replace(/^\w/, (c) => c.toUpperCase()),
                        path: accumulatedPath,
                    });
                }
            }
        });

        map[keyPath] = breadcrumbs;
    });

    return map;
}
