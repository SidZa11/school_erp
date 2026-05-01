import { useNavigate } from 'react-router';

export const useLogout = () => {
  const navigate = useNavigate();
  
  const logout = () => {
    sessionStorage.clear(); // Clear everything
    navigate('/login');     // Redirect
  };

  return { logout };
};
