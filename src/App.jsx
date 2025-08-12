import "./styles/global.css"
import { lazy } from "react";

const Layout = lazy(() => import('./components/Layout/Layout'));

function App() {
  return <Layout />
}

export default App


