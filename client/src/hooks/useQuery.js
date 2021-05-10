import React from "react";
import { useHistory } from "react-router-dom";

const useQuery = ({ promise }) => {
  const history = useHistory();
  const [apiData, setApiData] = React.useState();

  React.useEffect(() => {
    promise
      .then(data => data.json())
      .then(({ code, status, ...apiData }) => {
        if (code > 400) {
          history.replace(history.location.pathname, {
            errorStatusCode: code
          });
        } else {
          setApiData(apiData);
        }
      });
  }, [url, history]);

  return { data: apiData };
};

export default useQuery;