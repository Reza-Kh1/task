import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";
import SinglaPage from "../pages/SinglaPage/SinglaPage";

export default [
  { path: "/", element: <Home /> },
  { path: "/:slug", element: <SinglaPage /> },
  { path: "/*", element: <NotFound /> },
];
