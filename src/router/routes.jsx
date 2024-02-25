// import { Outlet, Route } from "react-router-dom";

// import { Layout } from "../components";

// import { Dashboard, Login } from "../pages";

// import { PermissionAlert } from "./../components";

// import { ROUTE } from "../const";
// import { pagePermission } from "../const/pagePemission";

// import AllowedComponent from "./AllowedComponent";
// import UniqueReportOverviewDetails from "../pages/UniqueReportOverviewDetails";

// const routes = [
//   {
//     id: "1",
//     path: "",
//     component: (
//       <div>
//         <Layout>
//           <Outlet />
//         </Layout>
//       </div>
//     ),
//     permissions: {
//       auth: ["token"],
//       userCode: [],
//     },
//     children: [
//       {
//         id: "1.1",
//         path: `${ROUTE.DASHBOARD}`,
//         component: <Dashboard />,
//         _throw: <PermissionAlert />,
//         redirection: <Login />,
//         permissions: {
//           auth: ["token"],
//           userCode: [],
//         },
//         children: [],
//       },
//     ],
//   },
//   {
//     id: "2",
//     path: `${ROUTE.LOGIN}`,
//     component: <Login />,
//     _throw: <div></div>,
//     redirection: <Login />,
//     permissions: {
//       auth: ["token"],
//       userCode: [],
//     },
//     children: [],
//   },
// ];

// const buildRoute = (route) => {
//   if (route === undefined || null) return;
//   const {
//     id,
//     children,
//     path,
//     component,
//     permissions,
//     redirection,
//     index,
//     _throw,
//   } = route;
//   return (
//     <Route
//       key={id}
//       path={path}
//       index={index}
//       element={
//         component &&
//         AllowedComponent({ component, redirection, permissions, path, _throw })
//       }
//     >
//       {children &&
//         children.length > 0 &&
//         children.map((child) => buildRoute(child))}
//     </Route>
//   );
// };

// const getRoute = () => routes.map((route) => buildRoute(route));

export { getRoute };
import NoMatch from "@containers/no-match";

import Home from "@containers/home";

import ElectionDeclarationLayoutView from "@containers/layout/election-declaration-management-layout";
import electionDeclarationRoutes from "./election-declaration-management";

import VoteCenterLayoutView from "@containers/layout/vote-center-management-layout";
import voteCenterRoutes from "./vote-center-management";

import CenterOfficerLayoutView from "@containers/layout/center-officer-management-layout";
import centerOfficerRoutes from "./center-officer-management";

import CandidateInfoLayoutView from "@containers/layout/candidate-info-management-layout";
import candidateInfoRoutes from "./candidate-info-management";

import ResultManagementLayout from "@containers/layout/result-management";
import resultManagementRoutes from "./result-management";

import { PATH } from "@constants/paths";
import { RouteType } from "./types";
import userRoutes from "./user-management";
import UserLayoutView from "@containers/layout/user-management-layout";
import SignIn from "@containers/auth/sign-in";
import ResetPassword from "@containers/auth/reset-password";
import UpdatePassword from "@containers/auth/update-password";

const routes = () => [
  {
    id: "2",
    path: PATH.SIGN_IN,
    element: <SignIn />,
  },
  {
    id: "1",
    path: `${PATH.HOME}`,
    redirection: <NoMatch />,
    permissions: {
      auth: ["token"],
    },
    children: [
      {
        id: "1.1",
        index: true,
        element: <Home />,
        redirection: <NoMatch />,
        permissions: {
          auth: ["token"],
        },
      },
    ],
  },

  {
    id: "",
    path: "*",
    element: <NoMatch />,
  },
];

export { routes };
