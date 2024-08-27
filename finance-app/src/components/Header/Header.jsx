import useLogout from '../../hooks/useLogout.js'; 
import { MdLogout } from "react-icons/md";

function Header() {
    const logout = useLogout();
  
    return (
      <button onClick={logout} className="btn btn-logout">
      <MdLogout size={18} color='white' />
      </button>
    );
}
  
export default Header;
