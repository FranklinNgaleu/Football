import { Outlet, Link } from "react-router-dom";

function Layout() {
    const links = [
      { to: '/', label: 'Home' },
      { to: '/nonjouer', label: 'A venir' },
      { to: '/jouer', label: 'Terminer' },
      { to: '/jour', label: 'AUJOURDHUI' },
    ];
  
    return (
      <>
        <style>
          {`
            nav {
              background-color: #333;
              color: #fff;
              padding: 10px 0;
            }
    
            ul {
              list-style: none;
              padding: 0;
              display: flex;
              justify-content: center;
            }
    
            li {
              margin: 0 20px;
            }
    
            a {
              text-decoration: none;
              color: #fff;
              font-weight: bold;
              transition: color 0.3s ease;
            }
    
            a:hover {
              color: #ff5722;
            }
          `}
        </style>
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