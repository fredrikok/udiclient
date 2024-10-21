import { useMsal } from "@azure/msal-react";

const Login = () => {
  const { instance } = useMsal();

  const handleLogin = async () => {
    const loginRequest = {
      scopes: ["openid", "profile", "User.Read"],
    };

    try {
      const response = await instance.loginPopup(loginRequest);
      console.log("Login successful:", response);
      window.location.href = `${import.meta.env.VITE_BASE_URL}/form/1`;
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
