import { useState, useEffect } from "react";
import { IoBriefcaseOutline } from "react-icons/io5";
import { Form, Button, Container, Grid } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

interface UserData {
  fullName: string;
  orgName: string;
  referanceNr: number | string;
}

function ReferenceID() {
  const [id, setId] = useState("");
  const [data, setData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [orgName, setOrgName] = useState<string | null>(null);
  const [rfnr, setRrNr] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = setTimeout(() => {
      if (id) {
        fetchUserData();
      } else {
        setData(null);
        setError(null);
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [id]);

  const fetchUserData = async () => {
    setData(null);
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/User/${id}`
      );
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const result: UserData = await response.json();
      if (result && (result.referanceNr || result.referanceNr === 0)) {
        setName(result.fullName);
        setOrgName(result.orgName);
        setRrNr(result.referanceNr.toString());
        setData(result);
      } else {
        setError("Referanse nummeret finnes ikke. Vennligst sjekk ID-en.");
      }
    } catch (err: any) {
      setError("Feil ved henting av data. Vennligst sjekk ID-en.");
    }
  };

  const handleNext = () => {
    if (!data || data.referanceNr === undefined || data.referanceNr === null) {
      setError("Referanse nummeret finnes ikke. Vennligst sjekk ID-en.");
      return;
    }

    const referenceNumber = data.referanceNr.toString();

    if (referenceNumber.trim() === "") {
      setError("Referanse nummeret finnes ikke. Vennligst sjekk ID-en.");
      return;
    }

    navigate("/form/2", { state: { name, orgName, rfnr } });
  };

  return (
    <Container className="container-form-style">
      <h2>
        <IoBriefcaseOutline /> Referanse
      </h2>
      <Form>
        <h3>Fyll inn din referanse ID mottat i brev fra UDI.</h3>
        <Form.Field>
          <label>Referanse ID</label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Enter ID"
            required
          />
        </Form.Field>
        <Grid>
          <Grid.Column textAlign="center">
            <Button onClick={() => navigate(-1)}>Forrige side</Button>
            <Button type="button" onClick={handleNext} positive>
              {" "}
              Neste Side{" "}
            </Button>
          </Grid.Column>
        </Grid>
      </Form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </Container>
  );
}

export default ReferenceID;
