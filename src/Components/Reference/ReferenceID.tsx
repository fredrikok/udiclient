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
  const [editId, setEditId] = useState("");
  const [data, setData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    setData(null);
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/User/${id}`
      );
      if (!response.ok) {
        throw new Error(`Error fetching user data: ${response.statusText}`);
      }

      const result: UserData = await response.json();
      if (result && (result.referanceNr || result.referanceNr === 0)) {
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
    } catch (err: any) {
      setError("Feil ved henting av data. Vennligst sjekk ID-en.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditRedirect = async () => {
    if (editId.trim() === "") {
      setError("Vennligst fyll inn en gyldig referanse ID for redigering.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5150/api/Case/${editId}`);
      if (!response.ok) {
        setError("Saken finnes ikke. Vennligst sjekk ID-en.");
        return;
      }

      navigate("/form/edit", {
        state: { referenceId: editId },
      });
    } catch (err: any) {
      setError("Feil ved henting av sakdata.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
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
      <Form onSubmit={handleSubmit}>
        <h3>Fyll inn din referanse ID mottatt i brev fra UDI.</h3>
        <Form.Field>
          <label>Referanse ID</label>
          <Input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Enter ID"
            required
          />
        </Form.Field>
        <Grid>
          <Grid.Column textAlign="center">
            <Button type="button" onClick={() => navigate(-1)}>Forrige side</Button>
            <Button type="submit" positive loading={loading}>
              Neste Side
            </Button>
          </Grid.Column>
        </Grid>
      </Form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* New Input Field for Editing */}
      <h3>Endre eksisterende sak:</h3>
      <Form.Field>
        <label>Referanse ID for redigering</label>
        <Input
          type="text"
          value={editId}
          onChange={(e) => setEditId(e.target.value)}
          placeholder="Enter existing case ID"
        />
      </Form.Field>
      <Button type="button" onClick={handleEditRedirect} positive>
        Gå til redigering
      </Button>
    </Container>
  );
}

export default ReferenceID;
