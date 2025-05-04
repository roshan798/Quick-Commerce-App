import { Link } from 'react-router-dom';
import {
    LayoutDashboard,
    Package,
    Users,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import { useState } from 'react';
import '../css/adminSidebar.css';
import Breadcrumbs from './Breadcrumbs';

const AdminSidebar = ({ children }: { children: React.ReactNode }) => {
    const [collapsed, setCollapsed] = useState(true);

    return (
        <div className="flex">
            {/* Sidebar */}
            <aside
                className={`bg-gray-900 text-white flex flex-col p-4 transition-all duration-300
                ${collapsed ? 'w-16' : 'w-64'}`}
            >
                {/* Toggle Button */}
                <button
                    className="text-white cursor-pointer p-1.5 rounded-lg mb-4 self-end hover:bg-gray-700 transition"
                    onClick={() => setCollapsed(!collapsed)}
                    aria-label="Toggle Sidebar"
                >
                    {collapsed ? (
                        <ChevronRight size={20} />
                    ) : (
                        <ChevronLeft size={20} />
                    )}
                </button>

                {/* Navigation */}
                <nav className="flex flex-col text-gray-300 gap-2">
                    {[
                        {
                            to: '/admin/dashboard',
                            icon: <LayoutDashboard size={20} />,
                            label: 'Dashboard',
                        },
                        {
                            to: '/admin/products',
                            icon: <Package size={20} />,
                            label: 'Products',
                        },
                        {
                            to: '/admin/users',
                            icon: <Users size={20} />,
                            label: 'Users',
                        },
                    ].map((item, index) => (
                        <Link
                            key={index}
                            to={item.to}
                            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-700 transition"
                        >
                            {item.icon}
                            <span
                                className={`transition-all duration-200 ${collapsed ? 'hidden' : 'block'}`}
                            >
                                {item.label}
                            </span>
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Admin Page Content */}
            <main className="flex-1 bg-gray-100 overflow-auto min-h-[calc(100vh-70px)]">
                {/* Breadcrumbs UI */}
                <div className="p-4 border-gray-300 sticky top-0 z-10">
                    <Breadcrumbs />
                </div>

                {/* Render children (actual page content) */}
                <div className="p-4">{children}</div>
            </main>
        </div>
    );
};

export default AdminSidebar;
