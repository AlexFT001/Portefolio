import { Link } from 'react-router-dom'
import './NavBar.css'

function NavBar() {
  return (
    <div className="topnav">
      <Link className="active" to="/">Sobre</Link>
      <Link to="/repositories">Repositorios</Link>
      <Link to="/dont">Don't Click it</Link>
    </div>
  )
}

export default NavBar
