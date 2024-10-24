/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
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
  const [, setData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [, setName] = useState<string | null>(null);
  const [, setOrgName] = useState<string | null>(null);
  const [, setRrNr] = useState<string | null>(null);
  const navigate = useNavigate();


  const fetchUserData = async () => {
    setData(null);
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/User/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": `${import.meta.env.VITE_API_KEY}`
        },
      })

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const result: UserData = await response.json();
      if (result && (result.referanceNr || result.referanceNr === 0)) {
        setName(result.fullName);
        setOrgName(result.orgName);
        setRrNr(result.referanceNr.toString());
        setData(result);

        navigate("/form/2", {
          state: {
            name: result.fullName,
            orgName: result.orgName,
            rfnr: result.referanceNr.toString(),
          },
        });
      } else {
        setError("Referanse nummeret finnes ikke. Vennligst sjekk ID-en.");
      }
    } catch (err) {
      setError("Feil ved henting av data. Vennligst sjekk ID-en.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (id.trim() === "") {
      setError("Vennligst fyll inn en gyldig referanse ID.");
      return;
    }
    fetchUserData();
  };

  return (
    <Container className="container-form-style">
      <h2>
        <IoBriefcaseOutline /> Referanse
      </h2>
      <Form>
        <h3>Fyll inn din referanse ID mottatt i brev fra UDI.</h3>
        <Form.Field>
          <label>Referanse ID</label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Referanse ID"
            required
          />
        </Form.Field>
        <Grid>
          <Grid.Column textAlign="center">
            {/* <Button onClick={() => navigate(0)}>Forrige side</Button> */}
            <Button
              type="button"
              onClick={handleSubmit}
              positive
              loading={loading}
            >
              Neste Side
            </Button>
          </Grid.Column>
        </Grid>
      </Form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </Container>
  );
}

export default ReferenceID;
