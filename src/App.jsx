import "./styles/global.css"
import { lazy, Suspense } from "react";

const Layout = lazy(() => import('./components/Layout/Layout'));

function App() {
  return (
    <Layout />
  );
}

export default App


