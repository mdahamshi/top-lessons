import Profile from "./components/Profile/Profile";
import App from "./App.jsx";
import DefaultProfile from "./components/DefaultProfile/DefaultProfile";

import ErrorPage from "./components/ErrorPage/ErrorPage";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "profile/:name",
    element: <Profile />,
  },
    {
    path: "profile",
    element: <DefaultProfile />,
  },
];

export default routes;
