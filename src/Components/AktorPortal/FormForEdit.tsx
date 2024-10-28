import React, { useState, useEffect } from "react";
import { Container, Form, Input, Button, Message } from "semantic-ui-react";
import { useNavigate, useLocation } from "react-router-dom";

interface Case {
  referenceNr: string;
  dateCreated: string;
  orgNr: string;
  workerName: string;
  workerEmail: string;
  hasObjections: boolean;
  departureDateMismatch: boolean;
  proposedDate: string;
  debtAsCauseOfObjection: boolean;
  debtValue: number;
}

const FormForEdit: React.FC = () => {
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const location = useLocation();
  const { referenceId } = location.state || {};
  const navigate = useNavigate();

  const fetchCaseData = async (refNr: string) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(`http://localhost:5150/api/Case/${refNr}`);
      if (!response.ok) {
        throw new Error(
          `Feil ved henting av sakdata: ${response.status} ${response.statusText}`
        );
      }
      const data: Case = await response.json();
      setCaseData(data);
    } catch (error) {
      setError("Kunne ikke hente sakdata.");
      setCaseData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateCase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!caseData) return;

    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(
        `http://localhost:5150/api/Case/${caseData.referenceNr}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${import.meta.env.VITE_API_KEY}`,
          },
          body: JSON.stringify(caseData),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Feil ved oppdatering av sak: ${response.status} ${response.statusText}`
        );
      }

      const updatedCase = await response.json();
      setSuccessMessage("Saken ble oppdatert!");
      setCaseData(updatedCase);
    } catch (error) {
      setError("Kunne ikke oppdatere saken.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (referenceId) {
      fetchCaseData(referenceId);
    } else {
      setError("Referansenummer er ikke tilgjengelig.");
    }
  }, [referenceId]);

  const today = new Date().toISOString().split("T")[0];

  return (
    <Container>
      <h1>Rediger Sak</h1>
      {isLoading && <p>Laster...</p>}
      {error && <Message negative>{error}</Message>}
      {successMessage && <Message positive>{successMessage}</Message>}

      {caseData ? (
        <Form onSubmit={handleUpdateCase}>
          <Form.Field>
            <label>Dato opprettet:</label>
            <Input
              type="date"
              value={caseData.dateCreated.split("T")[0]}
              disabled={true}
            />
          </Form.Field>
          <Form.Field>
            <label>Organisasjonsnummer:</label>
            <Input
              type="text"
              value={caseData.orgNr}
              onChange={(e) =>
                setCaseData({ ...caseData, orgNr: e.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Kontaktperson:</label>
            <Input
              type="text"
              value={caseData.workerName}
              onChange={(e) =>
                setCaseData({ ...caseData, workerName: e.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>E-post til kontaktperson:</label>
            <Input
              type="email"
              value={caseData.workerEmail}
              onChange={(e) =>
                setCaseData({ ...caseData, workerEmail: e.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Har innvendinger:</label>
            <Input
              type="radio"
              checked={caseData.hasObjections}
              onChange={() => setCaseData({ ...caseData, hasObjections: true })}
            />{" "}
            Ja
            <Input
              type="radio"
              checked={!caseData.hasObjections}
              onChange={() =>
                setCaseData({ ...caseData, hasObjections: false })
              }
            />{" "}
            Nei
          </Form.Field>
          <Form.Field>
            <label>Er det utreisedato for søker som ikke passer?</label>
            <Input
              type="radio"
              checked={caseData.departureDateMismatch}
              onChange={() =>
                setCaseData({ ...caseData, departureDateMismatch: true })
              }
            />{" "}
            Ja
            <Input
              type="radio"
              checked={!caseData.departureDateMismatch}
              onChange={() =>
                setCaseData({ ...caseData, departureDateMismatch: false })
              }
            />{" "}
            Nei
          </Form.Field>
          <Form.Field>
            <label>Foreslått dato:</label>
            <Input
              type="date"
              value={caseData.proposedDate.split("T")[0]}
              min={today}
              onChange={(e) =>
                setCaseData({
                  ...caseData,
                  proposedDate: e.target.value + "T00:00:00Z",
                })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Gjeld som årsak til innvending:</label>
            <Input
              type="radio"
              checked={caseData.debtAsCauseOfObjection}
              onChange={() =>
                setCaseData({ ...caseData, debtAsCauseOfObjection: true })
              }
            />{" "}
            Ja
            <Input
              type="radio"
              checked={!caseData.debtAsCauseOfObjection}
              onChange={() =>
                setCaseData({ ...caseData, debtAsCauseOfObjection: false })
              }
            />{" "}
            Nei
          </Form.Field>
          <Form.Field>
            <label>Gjeldsbeløp:</label>
            <Input
              type="number"
              value={caseData.debtValue}
              onChange={(e) =>
                setCaseData({
                  ...caseData,
                  debtValue: parseFloat(e.target.value),
                })
              }
            />
          </Form.Field>
          <Button type="submit" color="green">
            Oppdater Sak
          </Button>
        </Form>
      ) : (
        <p>Ingen sakdata tilgjengelig.</p>
      )}
      <Button
        color="blue"
        onClick={() => navigate("/form/1")}
        style={{ marginTop: "20px" }}
      >
        Nytt skjema
      </Button>
    </Container>
  );
};

export default FormForEdit;
