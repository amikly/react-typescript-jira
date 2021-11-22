import { AuthenticatedApp } from "authenticated-app";
import { ErrorBoundary } from "component/error-boundary";
import { FullPageErrorFallback } from "component/lib";
import { useAuth } from "context/auth-context";
import React from "react";
import { UnauthenticatedApp } from "unauthenticated-app";
import "./App.less";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
