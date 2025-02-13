import { Outlet } from 'react-router-dom';
import { GiftIcon } from 'lucide-react';

const Layout = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <GiftIcon className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Secret Santa Organizer</h1>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;