import React, { useState, useEffect, useContext, memo } from 'react';
import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';

import { Toaster } from 'sonner';
import { AuthContext } from '../../context/AuthContext';

// Only import essential icons, lazy load others
import { FaSearch, FaDice, FaReceipt, FaComments } from 'react-icons/fa';

// Core components - load immediately for faster initial render
const Sidebar = lazy(() => import('./Sidebar'));
const Navbar = lazy(() => import('./Navbar'));

// Secondary components - load when needed
const LiveSupport = lazy(() => import('../Modals/live-support/Index'));
const Modals = lazy(() => import('./Modals'));
const Chats = lazy(() => import('./Chat'));
const Footer = lazy(() => import('./Footer'));

import { routes, protectedRoutes, gameRoutes } from './routes';

// Lightweight loading component
const LoadingSpinner = () => (
   <div className="flex items-center justify-center min-h-screen bg-[#1a2c38]">
    <div className="text-center fixed left-[47%]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <p className="text-white text-lg">Loading...</p>
    </div>
  </div>
);

const Layout = memo(() => {
  const { user } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 750);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const [activeTab, setActiveTab] = useState('Casino');
  const [openLiveSupport, setOpenLiveSupport] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const isGameRoute = () => {
    return gameRoutes.some(route => location.pathname.startsWith(route));
  };

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setIsMediumScreen(screenWidth > 740 && screenWidth < 1200);
      if (screenWidth > 740 && screenWidth < 1200) {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (location.pathname.includes('/casino')) setActiveTab('Casino');
    else if (location.pathname.includes('/bets')) setActiveTab('Bets');
    else setActiveTab('Browse');
  }, [location.pathname]);

  // Prevent body scroll when Sidebar is open on mobile
  useEffect(() => {
    if (sidebarOpen && window.innerWidth < 750) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    // Clean up on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  const renderRoutes = () => {
    return routes.map(route => {
      const isProtected = protectedRoutes.some(path =>
        route.path === path || (route.path && route.path.startsWith(path + '/'))
      );

      if (isProtected && !user) {
        return (
          <Route
            key={route.path}
            path={route.path}
            element={<Navigate to="/login" state={{ from: location }} replace />}
          />
        );
      }

      if (route.children) {
        return (
          <Route key={route.path} path={route.path} element={route.element}>
            {route.children.map(childRoute => (
              <Route
                key={childRoute.path}
                path={childRoute.path}
                element={
                  isProtected && !user
                    ? <Navigate to="/login" state={{ from: location }} replace />
                    : childRoute.element
                }
              />
            ))}
          </Route>
        );
      }

      return (
        <Route
          key={route.path}
          path={route.path}
          element={route.element}
        />
      );
    });
  };

  return (
    <div className="flex min-h-screen bg-[#1a2c38]">

      <Toaster position="bottom-right" richColors />
      <Suspense fallback={<LoadingSpinner />}>
        {openLiveSupport && <LiveSupport onClose={() => setOpenLiveSupport(false)} />}
        <Sidebar 
          isOpen={sidebarOpen} 
          toggleSidebar={toggleSidebar} 
          setOpenLiveSupport={setOpenLiveSupport} 
          openLiveSupport={openLiveSupport}
          isMobile={window.innerWidth < 750}
        /> 

        {/* Main content */}
        <div
          className={`flex-1 flex relative flex-col transition-all w-full duration-300 ${
            window.innerWidth >= 750
              ? sidebarOpen
                ? isMediumScreen
                  ? 'pl-[70px]'
                  : 'pl-[240px]'
                : 'pl-[70px]'
              : 'ml-0'
          } ${isChatOpen ? 'pr-[370px]' : ''}`}>
          {/* Fixed navbar */}
          <div className="sticky top-0 z-20">
            <Navbar toggleChat={toggleChat} isGameRoute={isGameRoute()} />
          </div>

          {/* MobileSidebar under Navbar and above nav tabs */}
          {/* {window.innerWidth < 750 && showMobileSidebar && (
            <div className="z-10 relative">
              <MobileSidebar
                isOpen={showMobileSidebar}
                toggleSidebar={() => setShowMobileSidebar(false)}
              />
            </div>
          )} */}

          {/* Main content */}
          <main className="flex-1 overflow-y-auto w-full p-0 md:p-0 relative scrollY bg-[var(--bg-color)]">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                {renderRoutes()}
              </Routes>
            </Suspense>
          </main>

          {/* Footer - hide on game routes */}
          {!isGameRoute() && (
            <Suspense fallback={<div className="h-16"></div>}>
              <Footer />
            </Suspense>
          )}
        </div>

        {/* Chat Panel */}
        {isChatOpen && (
          <Suspense fallback={<LoadingSpinner />}>
            <Chats closeChat={toggleChat} />
          </Suspense>
        )}

        {/* Backdrop for desktop */}
        {sidebarOpen && window.innerWidth > 750 && (
          <div
            className={`fixed inset-0 bg-[var(--bg-color)] bg-opacity-50 z-20 ${
              isMediumScreen || window.innerWidth <= 750 ? '' : 'hidden'
            }`}
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <Suspense fallback={null}>
          <Modals />
        </Suspense>
            {/* Bottom navigation for mobile devices */}
      {window.innerWidth < 750 && (
        <Suspense fallback={null}>
          <nav className="fixed bottom-0 left-0 right-0 z-30 bg-[#0f212e] border-t border-gray-700 flex justify-between items-center h-16 px-2">
            <button
              className={`flex flex-col items-center flex-1 focus:outline-none ${
                activeTab === 'Browse' && sidebarOpen
                  ? 'text-blue-400 font-bold'
                  : 'text-gray-300 hover:text-blue-400'
              }`}
              onClick={() => {
                if (activeTab === 'Browse' && sidebarOpen) {
                  setSidebarOpen(false);
                } else {
                  setActiveTab('Browse');
                  setSidebarOpen(true);
                }
              }}
            >
              <FaSearch className="text-xl mb-1" />
              <span className="text-xs">Browse</span>
            </button>
            <button
              className={`flex flex-col items-center flex-1 focus:outline-none ${
                activeTab === 'Casino' ? 'text-blue-400 font-bold' : 'text-gray-300 hover:text-blue-400'
              }`}
              onClick={() => {
                setActiveTab('Casino');
                setSidebarOpen(false);
                navigate('/casino/home');
              }}
            >
              <FaDice className="text-xl mb-1" />
              <span className="text-xs">Casino</span>
            </button>
            <button
              className={`flex flex-col items-center flex-1 focus:outline-none ${
                activeTab === 'Bets' ? 'text-blue-400 font-bold' : 'text-gray-300 hover:text-blue-400'
              }`}
              onClick={() => {
                setActiveTab('Bets');
                setSidebarOpen(false);
                navigate('/bets');
              }}
            >
              <FaReceipt className="text-xl mb-1" />
              <span className="text-xs">Bets</span>
            </button>
            <button
              className={`flex flex-col items-center flex-1 focus:outline-none ${
                isChatOpen ? 'text-blue-400 font-bold' : 'text-gray-300 hover:text-blue-400'
              }`}
              onClick={toggleChat}
            >
              <FaComments className="text-xl mb-1" />
              <span className="text-xs">Chats</span>
            </button>
          </nav>
        </Suspense>
      )}
      </Suspense>
    </div>
  );
});

export default Layout;
