
import React from 'react';
import { Outlet } from 'react-router-dom';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';

const AppLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <AppFooter />
    </div>
  );
};

export default AppLayout;
