import { useState, useEffect, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { auth } from "../firebase";
import { User } from "firebase/auth";
const ProtectedRoute = ({ children }: { children: ReactNode }): any => {
  const [isAuth, setIsAuth] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const url = useLocation();

  useEffect(() => {
    const checkAuthStatus = (user: User | null) => {
      setIsInitialized(true);
      if (!user) {
        setIsAuth(false);
        <Navigate to="/admin/login" replace />;
      } else {
        setIsAuth(true);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      checkAuthStatus(user);
    });

    return () => {
      unsubscribe();
    };
  }, [url.pathname]);

  if (!isInitialized) {
    return null;
  }
  if (isAuth) {
    return children;
  } else {
    return <Navigate to="/admin/login"></Navigate>;
  }
};

export default ProtectedRoute;
