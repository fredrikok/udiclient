import { Form, FormGroup, FormRadio, Input } from "semantic-ui-react";
import { GoPeople } from "react-icons/go";
import { useState } from "react";

function FormQuestions({ step }: { step: number }) {
  const [specialID, setSpecialID] = useState("81549300");
  const [orgName, setOrgName] = useState("Lånekassen");
  const [contactPerson, setContactPerson] = useState("Ola Normann");
  const [email, setEmail] = useState("Olanor@lanekassen.no");


  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Special ID submitted:");
  };

  return (
    <>
      {/* Form questions 1 */}
      <Form onSubmit={handleSubmit}>
        {step === 1 && (
          <FormGroup grouped>
            <label> er det innsigelser?</label>
            <FormRadio label="Ja" value="yes" />
            <FormRadio label="Nei" value="no" />
          </FormGroup>
        )}

        {step === 2 && (
          <FormGroup grouped>
            <label>Er det utreisedato for bruker som ikke passer? </label>
            <FormRadio label="Ja" value="yes" />
            <FormRadio label="Nei" value="no" />
            <FormRadio label="Vet ikke" value="idk" />
          </FormGroup>
        )}

        {step === 3 && (
          <FormGroup grouped>
            <label>spesifiser dato som ville fungert</label>
            <FormRadio label="Nei" value="no" />
          </FormGroup>
        )}
{/* //Er det gjeld som er årsak til innsigelsen? */}
        {step === 4 && (
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
        )}
      </Form>
    </>
  );
}

export default FormQuestions;
