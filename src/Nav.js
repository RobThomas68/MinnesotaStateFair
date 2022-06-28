import { Link } from 'react-router-dom';
import { FaHome, FaStar, FaBeer, FaHamburger, FaLandmark, FaMapMarkedAlt } from 'react-icons/fa'

const Nav = () => {
    return (
      <nav className="Nav">
        <ul>
          <li><Link to="/"><FaHome/></Link></li>
          <li><Link to="/favorites" title="Favorites"><FaStar/></Link></li>
          <li><Link to="/food" title="Food"><FaHamburger/></Link></li>
          <li><Link to="/drinks" title="Drinks"><FaBeer/></Link></li>
          <li><Link to="/vendors" title="Vendors"><FaLandmark/></Link></li>
          <li><Link to="/map" title="Map"><FaMapMarkedAlt/></Link></li>
        </ul>
      </nav>
    )
  }

  export default Nav