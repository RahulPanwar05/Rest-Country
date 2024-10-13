import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import AllCountries from "./components/Allcountry";
import Header from "./components/Header";
import ErrorPage from "./components/ErrorPage";
import CountryDetails from "./components/CountryDetails";

const Layout = () => (
  <div className="box-border min-h-screen  dark:bg-gray-700  dark:text-white">
    <Header />
    <Outlet />
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <AllCountries />,
      },
      {
        path: "country/:name",
        element: <CountryDetails />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
