import React, { useState, useEffect } from 'react';
import EcoLogo from './components/EcoLogo';
import Wave from './components/Wave';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import BackArrowIcon from './components/BackArrowIcon';
import SplashScreen from './components/SplashScreen';
import UserApp from './UserApp';
import AdminApp from './AdminApp';


type AuthView = 'splash' | 'login' | 'register';
type UserRole = 'user' | 'admin';

const App: React.FC = () => {
  const [view, setView] = useState<AuthView>('splash');
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  useEffect(() => {
    if (view === 'splash') {
      const timer = setTimeout(() => {
        setView('login');
      }, 3000); // Show splash for 3 seconds
      return () => clearTimeout(timer);
    }
  }, [view]);

  const handleSwitchToRegister = () => setView('register');
  const handleSwitchToLogin = () => setView('login');
  
  const handleLoginSuccess = (role: UserRole) => {
    setUserRole(role);
  };

  const handleLogout = () => {
    setUserRole(null);
    setView('login');
  };

  const renderAuthContent = () => {
    switch (view) {
      case 'splash':
        return <SplashScreen />;
      case 'login':
        return (
          <>
            {/* Login Header */}
            <div className="relative h-60">
              <Wave />
              <div className="absolute top-0 left-0 right-0 h-[200px] flex items-center justify-center">
                <EcoLogo />
              </div>
            </div>

            {/* Login Content */}
            <div className="px-8 py-4 animate-fade-in">
              <div className="text-center mb-6">
                <h1 className="text-[28px] font-bold text-black">Welcome</h1>
                <p className="text-[16px] text-[#4E4E4E]">
                  To Eco Reward System
                </p>
              </div>
              <LoginForm 
                onSwitchToRegister={handleSwitchToRegister} 
                onLoginSuccess={handleLoginSuccess} 
              />
            </div>
          </>
        );
      case 'register':
        return (
          <>
            {/* Register Header */}
            <div className="relative h-40">
              <Wave />
              <div className="absolute inset-0 px-6 pt-10 flex items-start">
                <div className="w-full relative flex items-center justify-center">
                  <button
                    onClick={handleSwitchToLogin}
                    className="absolute left-0 p-2 rounded-full hover:bg-black/10 transition-colors"
                    aria-label="Go back to login"
                  >
                    <BackArrowIcon />
                  </button>
                  <h1 className="text-[26px] font-bold text-black">
                    Create Account
                  </h1>
                </div>
              </div>
            </div>

            {/* Register Content */}
            <div className="px-8 pb-8 -mt-8 relative z-10 animate-fade-in">
              <RegisterForm onSwitchToLogin={handleSwitchToLogin} />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const renderAppContent = () => {
    if (!userRole) {
      return renderAuthContent();
    }
    
    if (userRole === 'user') {
      return <UserApp onLogout={handleLogout} />;
    }

    if (userRole === 'admin') {
      return <AdminApp onLogout={handleLogout} />;
    }
    
    return null;
  }

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-4">
      {/* Mobile Mockup Frame */}
      <div className="w-[390px] h-[844px] bg-white rounded-[60px] border-[14px] border-neutral-800 shadow-2xl relative overflow-hidden">
        <div className="h-full w-full">{renderAppContent()}</div>
      </div>
    </main>
  );
};

export default App;
