import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import RecordPage from './components/RecordPage';
import SettingsPage from './components/SettingsPage';

type UserView = 'dashboard' | 'record' | 'settings';

interface UserAppProps {
    onLogout: () => void;
}

const UserApp: React.FC<UserAppProps> = ({ onLogout }) => {
    const [view, setView] = useState<UserView>('dashboard');

    const handleNavigate = (targetView: 'home' | 'record' | 'settings') => {
        if (targetView === 'home') setView('dashboard');
        if (targetView === 'record') setView('record');
        if (targetView === 'settings') setView('settings');
    };

    switch (view) {
        case 'dashboard':
            return <Dashboard onNavigate={handleNavigate} />;
        case 'record':
            return <RecordPage onNavigate={handleNavigate} />;
        case 'settings':
            return <SettingsPage onNavigate={handleNavigate} onLogout={onLogout} />;
        default:
            return null;
    }
};

export default UserApp;
