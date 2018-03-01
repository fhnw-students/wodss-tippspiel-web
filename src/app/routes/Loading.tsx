import React from "react";
import Loadable from "react-loadable";

export function Loading({
  isLoading,
  pastDelay,
  timedOut,
  error
}: Loadable.LoadingComponentProps): any {
  if (isLoading && pastDelay) {
    return <div className="container">
      <div className="alert alert-info" role="alert">
        Please wait the page is loading.
      </div>
    </div>;
  } else if (error && !isLoading) {
    return <div className="container">
      <div className="alert alert-danger" role="alert">
        Something went wrong with the loading of the page. Please try again or contact you admin.
      </div>
    </div>;
  } else {
    return undefined;
  }
}
