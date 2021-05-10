import React from "react";
import { useLocation } from "react-router-dom";
import { get } from "lodash";

const ErrorHandler = ({ children }) => {
  const location = useLocation();

  switch (get(location.state, "errorStatusCode")) {
    case 404:
      return <div>
        <div class="alert alert-danger" role="alert">
          404 : Page Not Found
        </div>
        {children}
      </div>;

    // ... cases for other types of errors

    default:
      return children;
  }
};

export default ErrorHandler;
