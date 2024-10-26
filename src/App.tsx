import { Container } from "semantic-ui-react";
import Footer from "./Constant/Footer";
import Header from "./Components/Header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import ReferenceID from "./Components/Reference/ReferenceID";
import SubmittedForm from "./Components/AktorPortal/SubmittedForm";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./authConfig";
import ProtectedRoute from "./ProtectedRoute";
import FormQuestions from "./Components/AktorPortal/FormForAll";
import FormForEdit from "./Components/AktorPortal/FormForEdit";

const msalInstance = new PublicClientApplication(msalConfig);

function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <Router>
        <Container>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/form/1" element={<ReferenceID />} />
                <Route path="/form/2" element={<FormQuestions />} />
                <Route path="/form/edit" element={<FormForEdit />} />
                <Route path="/form/bekreftet" element={<SubmittedForm />} />
              </Route>
            </Routes>
          </main>
          <Footer />
        </Container>
      </Router>
    </MsalProvider>
  );
}

export default App;
