import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Protected from "./protected";
import { SignIn, SignUp, Home, Settings, Dashboard, Form } from "../Views";
import {
  isAuthenticated,
  handleVerificationProtected,
} from "../Services/authentication";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<Protected />}>
        <Route
          index
          element={<Home />}
          loader={() => handleVerificationProtected()}
        />
        <Route
          path="dashboard"
          element={<Dashboard />}
          loader={() => handleVerificationProtected()}
        />
        <Route
          path="settings"
          element={<Settings />}
          loader={() => handleVerificationProtected()}
        />
        <Route
          path="new/:type"
          element={<Form />}
          loader={() => handleVerificationProtected()}
        />
        <Route
          path=":type/:id"
          element={<Form />}
          loader={() => handleVerificationProtected()}
        />
      </Route>
      <Route
        path="signin"
        element={<SignIn />}
        loader={() => isAuthenticated()}
      />
      <Route
        path="signup"
        element={<SignUp />}
        loader={() => isAuthenticated()}
      />
    </Route>
  )
);

const Router: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default Router;
