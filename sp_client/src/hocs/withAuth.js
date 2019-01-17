import React from "react";

const withAuth = (...args) => {
  const {currentUser, RenderComponent} = args[0];
  if(!currentUser.isAuthenticated){
    args[0].history.push("/")
  };
  return (
    <RenderComponent />
  );
};

export default withAuth;
