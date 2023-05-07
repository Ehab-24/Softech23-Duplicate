import { Outlet } from 'react-router-dom';
import Titlebar from '../components/Titlebar';
import Sidebar from '../components/Sidebar';

export default function DefaultLayout() {
  return (
    <div className="w-full h-full">
      <Titlebar />
      <div className="w-full h-full flex">
        <Sidebar />
        <div className="w-full h-full mb-12 py-4 px-8 md:px-12 bg-gray-50 dark:bg-gray-900">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
