import { useState } from "react";
import { IoBriefcaseOutline } from "react-icons/io5";
import {
  Form,
  Button,
  Container,
  Grid,
} from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

interface UserData {
  fullName: string;
  orgName: string;
  referanceNr: string;
}

function ReferenceID() {
  const [id, setId] = useState('');
  const [data, setData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [orgName, setOrgName] = useState<string | null>(null);
  const [rfnr, setRrNr] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();

    setData(null);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/User/${id}`);
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const result: UserData = await response.json();
      console.log("Fetched user data:", result);

      setName(result.fullName);
      setOrgName(result.orgName);
      setRrNr(result.referanceNr);
      setData(result);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleNext = () => {
    console.log("Checking reference number:", data);

    if (!data || !data.referanceNr) {
      alert("Referanse nummeret finnes ikke. Vennligst sjekk ID-en.");
      return;
    }


    navigate("/form/2", { state: { name, orgName, rfnr } });
  };

  return (
    <Container className="container-form-style">
      <h2>
        <IoBriefcaseOutline /> Referanse
      </h2>
      <Form onSubmit={handleCheck}>
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
        {data ? (
          <>
            <h4>Er det riktig person?:</h4>
            <h5>Navn</h5>
            <p>{name}</p>
            <h5>din organisasjon</h5>
            <p>{orgName}</p>
            <h5>Referanse nummeret du tastet inn</h5>
            <p>{rfnr}</p>

          </>
        ) :
          (
            <>

            </>
          )
        }

        <Grid>
          <Grid.Column textAlign="center">
            <Button onClick={() => navigate(-1)}>Forrige side</Button>
            <Button type="button" onClick={handleCheck} primary>Check</Button>
            <Button type="button" onClick={handleNext} positive> Neste Side </Button>
          </Grid.Column>
        </Grid>
      </Form>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </Container>
  );
}

export default ReferenceID;
