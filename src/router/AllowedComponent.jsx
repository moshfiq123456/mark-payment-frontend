import apiService from "../dataService/apiService";

import { useAuth } from "../dataService/contexts";

import { parseJwt } from "../utilities";

// auth permission
const hasAuthPermission = (authPermission, authState) =>
  authPermission.length > 0
    ? authPermission.reduce(
        (hasPermission, currentPermission) =>
          hasPermission || !!authState[`${currentPermission}`],
        false
      )
    : true;

// code permission
const hasUserCodePermission = (userCodePermission, token) => {
  const decodedJwt = parseJwt(token);

  return userCodePermission && userCodePermission.length > 0
    ? userCodePermission.reduce(
        (hasPermission, currentPermission) =>
          hasPermission ||
          (!!decodedJwt &&
            !!decodedJwt.client_roles &&
            decodedJwt?.client_roles?.includes(currentPermission)),
        false
      )
    : true;
};

const AllowedComponent = ({
  component,
  redirection,
  permissions,
  path,
  _throw,
}) => {
  const { auth: authPermission, userCode: userCodePermission } = permissions;
  //   const { state: authState } = useAuth();

  // let hasPermission = hasAuthPermission(authPermission, authState);
  const hasAccess = hasUserCodePermission(userCodePermission, authState.token);

  const isLoggedIn = authState.token ? true : false;

  apiService.service.interceptors.request.use((request) => {
    const isPublicUrl = request.url.includes("/public");
    // if (isLoggedIn && !isPublicUrl) {
      request.headers["Authorization"] = `Bearer ${authState.token}`;
    // }

    return request;
  });

  apiService.service.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (
        (error.response.status === 401 || error.response.status === 0) &&
        isLoggedIn
      ) {
        hasPermission = false;
        localStorage.clear();
        window.location.replace("/login");
      }

      return Promise.reject(error);
    }
  );

  if (hasPermission) {
    if (hasAccess) {
      return component;
    } else return _throw;
  } else return redirection;
};

export default AllowedComponent;
