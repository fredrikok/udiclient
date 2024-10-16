import { useState } from "react";
import { GoPeople } from "react-icons/go";
import { Form, FormGroup, Input } from "semantic-ui-react";

function ContactForm() {
  const [specialID, setSpecialID] = useState("81549300");
  const [orgName, setOrgName] = useState("Lånekassen");
  const [contactPerson, setContactPerson] = useState("Ola Normann");
  const [email, setEmail] = useState("Olanor@lanekassen.no");

  // const handleSubmit = (e: { preventDefault: () => void }) => {
  //   e.preventDefault();
  //   console.log("Special ID submitted:", specialID);
  //   console.log("Organization Name:", orgName);
  //   console.log("Contact Person:", contactPerson);
  //   console.log("Email:", email);
  // };

  return (
    <>
      <FormGroup>
        <h2>
          <GoPeople />
          Kontakt info
        </h2>
        <h3>
          Dersom UDI har spørsmål til denne innsendingen vennligst fyll ut
          kontakt informasjon.
        </h3>

        <Form.Field>
          <label>Organisasjonsnummer</label>
          <Input
            placeholder="Skriv her..."
            value={specialID}
            onChange={(e) => setSpecialID(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </Form.Field>

        <Form.Field>
          <label>Organisasjonsnavn</label>
          <Input
            placeholder="Skriv her..."
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </Form.Field>

        <Form.Field>
          <label>Kontakt informasjon</label>
          <Input
            placeholder="Skriv her..."
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </Form.Field>

        <Form.Field>
          <label>E-post</label>
          <Input
            placeholder="Skriv her..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </Form.Field>
      </FormGroup>
    </>
  );
}

export default ContactForm;
