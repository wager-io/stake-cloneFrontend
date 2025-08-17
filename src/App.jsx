import "./styles/global.css"
import { lazy, Suspense } from "react";

const Layout = lazy(() => import('./components/Layout/Layout'));

// Minimal loading screen
const AppLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-[#1a2c38]">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <p className="text-white text-lg">Loading Wager...</p>
    </div>
  </div>
);

function App() {
  return (
    <Suspense fallback={<AppLoader />}>
      <Layout />
    </Suspense>
  );
}

export default App


