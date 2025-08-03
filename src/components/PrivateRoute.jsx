import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.user);

  const token = Cookies.get('token');


  if (user || token) {
    return children;
  }

  return <Navigate to="/login" replace />;
};

export default PrivateRoute;
