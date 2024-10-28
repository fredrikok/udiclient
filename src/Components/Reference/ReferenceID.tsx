import { useState } from "react";
import { IoBriefcaseOutline } from "react-icons/io5";
import { Form, Button, Container, Grid, Input } from "semantic-ui-react";
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
  const navigate = useNavigate();

  const handleFormRedirect = async () => {
    if (id.trim() === "") {
      setError("Vennligst fyll inn en gyldig referanse ID.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/User/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${import.meta.env.VITE_API_KEY}`,
          },
        }
      );

      if (!response.ok) {
        setError("Referanse nummeret finnes ikke. Vennligst sjekk ID-en.");
        return;
      }

      const result: UserData = await response.json();
      setData(result);

      navigate("/form/2", {
        state: {
          name: result.fullName,
          orgName: result.orgName,
          rfnr: result.referanceNr.toString(),
        },
      });
    } catch (err) {
      setError("Feil ved henting av data. Vennligst sjekk ID-en.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleFormRedirect();
  };

  return (
    <Container className="container-form-style">
      <h2>
        <IoBriefcaseOutline /> Referanse
      </h2>
      <Form onSubmit={handleSubmit}>
        <h3>Fyll inn din referanse ID mottatt i brev fra UDI.</h3>
        <Form.Field>
          <label>Referanse ID</label>
          <Input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Enter ID"
          />
        </Form.Field>
        <Grid>
          <Grid.Column textAlign="center">
            <Button type="button" onClick={() => navigate(-1)}>
              Forrige side
            </Button>
            <Button type="submit" positive loading={loading}>
              Neste Side
            </Button>
          </Grid.Column>
        </Grid>
      </Form>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
    </Container>
  );
}

export default ReferenceID;
