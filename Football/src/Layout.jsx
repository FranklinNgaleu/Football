import { Outlet, Link } from "react-router-dom";

function Layout() {
    const links = [
      { to: '/', label: 'Home' },
      { to: '/mesmatch', label: 'Mes Matchs' },
    ];
  
    return (
      <>
        <nav>
          <ul>
            {links.map((link, index) => (
              <li key={index}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <Outlet />
      </>
    );
  }
  
export default Layout;