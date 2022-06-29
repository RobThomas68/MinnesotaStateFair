import { NavLink } from 'react-router-dom';
import { FaStar, FaBeer, FaHamburger, FaLandmark, FaMapMarkedAlt } from 'react-icons/fa'

const Nav = () => {
    return (
      <nav className="Nav">
        <ul>
          <li><NavLink to="/favorites" title="Favorites"><FaStar/></NavLink></li>
          <li><NavLink to="/foods" title="Foods"><FaHamburger/></NavLink></li>
          <li><NavLink to="/drinks" title="Drinks"><FaBeer/></NavLink></li>
          <li><NavLink to="/vendors" title="Vendors"><FaLandmark/></NavLink></li>
          <li><NavLink to="/map" title="Map"><FaMapMarkedAlt/></NavLink></li>
        </ul>
      </nav>
    )
  }

  export default Nav