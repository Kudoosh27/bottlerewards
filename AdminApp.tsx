import React, { useState } from 'react';
import AdminDashboard from './components/AdminDashboard';
import AdminUsersPage from './components/AdminUsersPage';
import AdminBottleManagementPage, { Bottle } from './components/AdminBottleManagementPage';
import AdminRewardManagementPage from './components/AdminRewardManagementPage';
import AdminSettingsPage from './components/AdminSettingsPage';

type AdminView = 'dashboard' | 'users' | 'bottles' | 'settings';
type AdminPageView = 'admin_dashboard' | 'admin_users' | 'admin_bottles' | 'admin_rewards' | 'admin_settings';


interface AdminAppProps {
    onLogout: () => void;
}

const AdminApp: React.FC<AdminAppProps> = ({ onLogout }) => {
    const [view, setView] = useState<AdminPageView>('admin_dashboard');
    const [selectedBottle, setSelectedBottle] = useState<Bottle | null>(null);

    const handleAdminNavigate = (targetView: AdminView) => {
        setSelectedBottle(null); // Reset selection when using main navigation
        switch (targetView) {
            case 'dashboard':
                setView('admin_dashboard');
                break;
            case 'users':
                setView('admin_users');
                break;
            case 'bottles':
                setView('admin_bottles');
                break;
            case 'settings':
                setView('admin_settings');
                break;
            default:
                // For other views, navigate to dashboard for now.
                setView('admin_dashboard');
                break;
        }
    };

    const handleSelectBottle = (bottle: Bottle) => {
        setSelectedBottle(bottle);
        setView('admin_rewards');
    };

    switch (view) {
        case 'admin_dashboard':
            return <AdminDashboard onNavigate={handleAdminNavigate} />;
        case 'admin_users':
            return <AdminUsersPage onNavigate={handleAdminNavigate} />;
        case 'admin_bottles':
            return <AdminBottleManagementPage onNavigate={handleAdminNavigate} onSelectBottle={handleSelectBottle} />;
        case 'admin_rewards':
            return <AdminRewardManagementPage onNavigate={handleAdminNavigate} selectedBottle={selectedBottle} />;
        case 'admin_settings':
            return <AdminSettingsPage onNavigate={handleAdminNavigate} onLogout={onLogout} />;
        default:
            return null;
    }
};

export default AdminApp;