import { Container } from "semantic-ui-react";
import Footer from "./Constant/Footer";
import Header from "./Components/Header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import ReferenceID from "./Components/Reference/ReferenceID";
import FormWrapperPage from "./Components/AktorPortal/FormWrapperPage";
import SubmittedForm from "./Components/AktorPortal/SubmittedForm";
import TestForm from "./Components/AktorPortal/TestForm";
import FormForAll from "./Components/AktorPortal/FormForAll";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Container>

          <main>
            <Routes>
              <Route path="/" element={<Login />}></Route>
              <Route path="/testform" element={<TestForm />}></Route>
              <Route path="/form/1" element={<ReferenceID />}></Route>
              <Route path="/form/idk" element={<FormWrapperPage />}></Route>
              <Route path="/form/3" element={<SubmittedForm />}></Route>
              <Route path="/form/2" element={<FormForAll />}></Route>
            </Routes>
          </main>
          <Footer />
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
