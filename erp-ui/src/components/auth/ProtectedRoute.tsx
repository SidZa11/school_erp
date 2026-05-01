import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import NotificationMessage from "../Notification/NotificationMessage";


const ProtectedRoute = ({ children }: { children: React.JSX.Element }) => {
    const token = sessionStorage.getItem('token');
    const expiry = sessionStorage.getItem('token_expiry');
    const navigate = useNavigate();
  
    const isExpired = expiry && Date.now() > parseInt(expiry);

    useEffect(() => {
        if (isExpired) {
          sessionStorage.clear();
          setTimeout(() => {
            navigate('/login');
          }, 1500); // slight delay after notification
        }
      }, [isExpired]);

  if (!token || isExpired) {
    setTimeout(() => {
      navigate('/login');
    }, 1500); // slight delay after notification
    return  (
        <>
            <NotificationMessage
                message="Session expired"
                icon="⚠️"
                description="Your session has expired. Please log in again."
                placement="topLeft"
                duration={5}
            />
        </>
    )
  }

  return children;
};

export default ProtectedRoute;
