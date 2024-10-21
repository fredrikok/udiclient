import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "semantic-ui-react";

const Login = () => {
  const isAuthenticated = useIsAuthenticated();
  const { instance, accounts } = useMsal();
  const [name, setName] = useState<string>("");

  useEffect(() => {
    if (isAuthenticated && accounts.length > 0) {
      // Extract the name from the idTokenClaims
      const account = accounts[0];
      const userName = account.name || account.idTokenClaims?.name || "";
      setName(userName);
    }
  }, [isAuthenticated, accounts]);

  const handleLogin = async () => {
    const loginRequest = {
      scopes: ["openid", "profile", "User.Read"],
    };

    try {
      const response = await instance.loginPopup(loginRequest);
      console.log("Login successful:", response);

      window.location.href = "form/1";
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div>
      <Container className="container-form-style submitted-form">
        {isAuthenticated ? (
          <>
            <h2>Velkommen, {name}</h2>
            <Link to={"/form/1"}>
              <Button className="ConfirmedButton" basic color="blue">
                Nytt skjema
              </Button>
            </Link>
          </>
        ) : (
          <>
            <h1>Velkommen, vennligst logg på bruker.</h1>
            <button onClick={handleLogin}>Login</button>
          </>
        )}
      </Container>
    </div>
  );
};

export default Login;
