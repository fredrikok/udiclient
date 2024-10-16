import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button, Container } from "semantic-ui-react";

function SubmittedForm() {
  return (
    <Container className="container-form-style submitted-form">
      <div>
        <FaCheckCircle className="big-green-check" />
      </div>
      <h2>Bekreftet</h2>
      <p>Dokumentasjon er sendt inn!</p>
      <p>Du vil motta en bekreftelse på mail hvert øyeblikk</p>

      <Link to={"/"}>
        <Button basic color="blue">
          Nytt skjema
        </Button>
      </Link>
    </Container>
  );
}

export default SubmittedForm;
