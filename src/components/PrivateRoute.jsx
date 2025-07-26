import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.user);

  const token = Cookies.get('token');
  console.log(token);

  if (user || token) {
    return children;
  }

  return <Navigate to="/login" replace />;
};

export default PrivateRoute;
