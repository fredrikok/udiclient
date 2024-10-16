
import { useState } from 'react';
import { Form, Input, Button } from "semantic-ui-react";
import { GoPeople } from "react-icons/go";

import { Grid, } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

function FormQuestions() {
  const [specialID, setSpecialID] = useState("");
  const [orgName, setOrgName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [referenceNr, setReferenceNr] = useState("");



  const [hasObjections, setHasObjections] = useState<boolean | null>(null);
  const [departureDateMismatch, setDepartureDateMismatch] = useState<boolean | null>(null);
  const [proposedDate, setProposedDate] = useState<Date | null>(null);
  const [debtAsCauseOfObjection, setDebtAsCauseOfObjection] = useState<boolean | null>(null);
  const [debtValue, setDebtValue] = useState<number | null>(null);




  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();




    const caseData = {
      caseId: 0,
      dateCreated: new Date().toISOString(),
      orgNr: specialID ? Number(specialID) : 0,
      referenceNr: referenceNr,
      workerName: contactPerson,
      workerEmail: email,
      hasObjections: hasObjections,
      departureDateMismatch: departureDateMismatch,
      proposedDate: proposedDate ? proposedDate.toISOString() : null,
      debtAsCauseOfObjection: debtAsCauseOfObjection,
      debtValue: debtValue !== null ? Number(debtValue) : 0,
    };

    console.log("Submitting caseData:", caseData);

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/case`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(caseData),
        });

      if (!response.ok) {
        throw new Error("Failed to submit case");
      }

      const result = await response.json();
      console.log("Case submitted successfully:", result);
      navigate('/form/3');

    } catch (error) {
      console.error("Error submitting case:", error);
    }
  };

  // function handleNext(): void {
  //   navigate("/form/3", { state: {} });
  // }



  const navigate = useNavigate();


  return (
    <Form onSubmit={handleSubmit}>
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
        <label>Referansenummer</label>
        <Input
          placeholder="Skriv her..."
          value={referenceNr}
          onChange={(e) => setReferenceNr(e.target.value)}
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


      <div>
        <label>
          Spørsmål 1: Er det innsigelser?
          <div>
            <input
              type="radio"
              value="yes"
              checked={hasObjections === true}
              onChange={() => setHasObjections(true)}
              required
            />
            Ja
            <input
              type="radio"
              value="no"
              checked={hasObjections === false}
              onChange={() => setHasObjections(false)}
              required
            />
            Nei
          </div>
        </label>
      </div>


      {hasObjections === true && (
        <div>
          <label>
            Spørsmål 2: Er det utreisedato for bruker som ikke passer?
            <div>
              <input
                type="radio"
                value="yes"
                checked={departureDateMismatch === true}
                onChange={() => setDepartureDateMismatch(true)}
                required
              />
              Ja
              <input
                type="radio"
                value="no"
                checked={departureDateMismatch === false}
                onChange={() => setDepartureDateMismatch(false)}
                required
              />
              Nei
            </div>
          </label>
        </div>
      )}


      {departureDateMismatch === true && (
        <div>
          <label>
            Spørsmål 3: spesifiser dato som ville fungert.
            <input
              type="date"
              value={proposedDate ? proposedDate.toISOString().split('T')[0] : ''}
              onChange={(e) => setProposedDate(new Date(e.target.value))}
              required
            />
          </label>
        </div>
      )}


      {hasObjections === true && (
        <div>
          <label>
            Spørsmål 4: Er det gjeld som er årsak til innsigelsen?
            <div>
              <input
                type="radio"
                value="yes"
                checked={debtAsCauseOfObjection === true}
                onChange={() => setDebtAsCauseOfObjection(true)}
                required
              />
              Ja
              <input
                type="radio"
                value="no"
                checked={debtAsCauseOfObjection === false}
                onChange={() => setDebtAsCauseOfObjection(false)}
                required
              />
              Nei
            </div>
          </label>
        </div>
      )}


      {debtAsCauseOfObjection === true && (
        <div>
          <label>
            Spørsmål 5: spesifiser hvor stor gjelden er.
            <input
              type="number"
              value={debtValue || ''}
              onChange={(e) => setDebtValue(Number(e.target.value))}
              required
            />
          </label>
        </div>
      )}


      <Grid>
        <Grid.Column textAlign="center">
          <Button onClick={() => navigate(-1)}>Forrige side</Button>
          <Button type="submit" positive> Send inn </Button>
          {/* <Button type="button" onClick={handleNext} positive> Neste Side </Button> */}
        </Grid.Column>
      </Grid>


    </Form>

  );

}

export default FormQuestions;





