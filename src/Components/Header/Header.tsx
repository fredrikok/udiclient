import { IoBriefcaseOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { Container, Menu } from "semantic-ui-react";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";

function Header() {
  const location = useLocation();

  const isAuthenticated = useIsAuthenticated();
  const { instance } = useMsal();

  const handleLogout = () => {
    instance.logoutRedirect();
  };

  return (
    <>
      <Container>
        <Menu borderless>
          <Link to={"/"}>
            <Menu.Item header>
              <svg
                className="udi-logo"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                id="Layer_1"
                x="0px"
                y="0px"
                viewBox="0 0 143.391 75.046"
                enableBackground="new 0 0 143.391 75.046"
              >
                <g>
                  <path
                    fill="#C8373C"
                    d="M45.984,52.058c0,12.698-10.287,22.988-22.988,22.988S0,64.756,0,52.058V0.072h13.531v60.868h18.923V0.072h13.531V52.058z M110.904,23.068c0-12.698-10.294-22.996-22.988-22.996H64.92v74.459h22.996c12.694,0,22.988-10.294,22.988-22.992V23.068z M97.385,60.939H78.453V13.603h18.932V60.939z"
                  />
                  <rect
                    x="129.849"
                    y="0.072"
                    fill="#C8373C"
                    width="13.542"
                    height="74.459"
                  />
                </g>
              </svg>
            </Menu.Item>
          </Link>
          <Menu.Menu position="right">
            <Menu.Item>Norsk | Engelsk</Menu.Item>
            <Menu.Item onClick={isAuthenticated ? handleLogout : undefined}>
              {isAuthenticated ? "Logg ut" : "Logg inn"}
            </Menu.Item>{" "}
          </Menu.Menu>
        </Menu>
      </Container>
      {/* Navbar */}
      <Menu borderless className="green-navbar">
        <Link to={"/"}>
          <Menu.Item className="nav-item" active={location.pathname === "/"}>
            <IoBriefcaseOutline />
            {isAuthenticated ? "Profil" : "Logg inn"}
          </Menu.Item>
        </Link>
        <Link to={"/form/1"}>
          <Menu.Item
            className="nav-item"
            active={location.pathname === "/form/1"}
          >
            <IoBriefcaseOutline />
            Referanse
          </Menu.Item>
        </Link>
        <Link to={"/form/2"}>
          <Menu.Item
            className="nav-item"
            active={location.pathname === "/form/2"}
          >
            <IoBriefcaseOutline />
            Aktørportal
          </Menu.Item>
        </Link>

        <Link to={"/form/3"}>
          <Menu.Item
            className="nav-item"
            active={location.pathname === "/form/3"}
          >
            <IoBriefcaseOutline />
            Bekreftelse
          </Menu.Item>
        </Link>
      </Menu>
    </>
  );
}

export default Header;
