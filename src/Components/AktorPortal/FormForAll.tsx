// import { useState, useEffect } from "react";
// import {
//   Form,
//   Input,
//   Button,
//   Message,
//   Radio,
//   Container,
// } from "semantic-ui-react";
// import { GoPeople } from "react-icons/go";
// import { useNavigate, useLocation } from "react-router-dom";
// import { Grid } from "semantic-ui-react";
// import { getCookie } from "../../Cookies/GetCookies";
// import { setCookie } from "../../Cookies/SetCookie";

// function FormQuestions() {
//   const [, setSpecialID] = useState<string>("");
//   const [contactPerson, setContactPerson] = useState<string>("");
//   const [email, setEmail] = useState<string>("");
//   const [referenceNr, setReferenceNr] = useState<string>("");
//   const [hasObjections, setHasObjections] = useState<boolean | null>(null);
//   const [departureDateMismatch, setDepartureDateMismatch] = useState<
//     boolean | null
//   >(null);
//   const [proposedDate, setProposedDate] = useState<Date | null>(null);
//   const [debtAsCauseOfObjection, setDebtAsCauseOfObjection] = useState<
//     boolean | null
//   >(null);
//   const [debtValue, setDebtValue] = useState<number | null>(null);
//   const [orgNavn, setOrgNavn] = useState<string>("");
//   const [orgNr, setOrgNr] = useState<string>("");
//   const [error, setError] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);

//   const navigate = useNavigate();
//   const { state } = useLocation();
//   const orgNavnFromState = state?.orgName || "";
//   const rfnr = state?.rfnr || "";

//   //-------------------------------------------
//   //cookies
//   //-------------------------------------------

//   useEffect(() => {
//     const savedContactPerson = getCookie("contactPerson");
//     const savedEmail = getCookie("email");
//     if (savedContactPerson) setContactPerson(savedContactPerson);
//     if (savedEmail) setEmail(savedEmail);
//   }, []);

//   const handleContactPersonChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const name = e.target.value;
//     setContactPerson(name);
//     setCookie("contactPerson", name, 7);
//   };

//   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const userEmail = e.target.value;
//     setEmail(userEmail);
//     setCookie("email", userEmail, 7);
//   };

//   //--------------------------------------------
//   //Form
//   //--------------------------------------------

//   useEffect(() => {
//     setOrgNavn(orgNavnFromState);
//     setReferenceNr(rfnr);
//     if (orgNavnFromState) {
//       fetchOrgNumber(orgNavnFromState);
//     }
//   }, [orgNavnFromState]);

//   const fetchOrgNumber = async (name: string) => {
//     if (name) {
//       setLoading(true);
//       setError("");
//       const requestUrl = `https://data.brreg.no/enhetsregisteret/api/enheter?navn=${encodeURIComponent(
//         name
//       )}`;
//       try {
//         const response = await fetch(requestUrl);
//         if (!response.ok) {
//           throw new Error(
//             `Failed to fetch organization number. Status: ${response.status}`
//           );
//         }
//         const contentType = response.headers.get("Content-Type");
//         if (contentType && contentType.includes("application/json")) {
//           const data = await response.json();
//           if (data?._embedded?.enheter?.length > 0) {
//             const firstOrg = data._embedded.enheter[0];
//             const orgNr = firstOrg.organisasjonsnummer;
//             setOrgNr(orgNr);
//           } else {
//             setOrgNr("");
//             setError("No organization found with that name.");
//           }
//         } else {
//           setError("Received a non-JSON response from the server.");
//         }
//       } catch (error) {
//         setError("Error");
//       } finally {
//         setLoading(false);
//       }
//     } else {
//       setOrgNr("");
//     }
//   };

//   const handleOrgNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const name = e.target.value.trim();
//     setOrgNavn(name);
//     if (name) {
//       fetchOrgNumber(name);
//     } else {
//       setOrgNr("");
//     }
//   };

//   const handleSubmit = async () => {
//     const caseData = {
//       caseId: 0,
//       dateCreated: new Date().toISOString(),
//       orgNr: orgNr ? Number(orgNr) : 0,
//       referenceNr: referenceNr,
//       workerName: contactPerson,
//       workerEmail: email,
//       hasObjections: hasObjections,
//       departureDateMismatch: departureDateMismatch,
//       proposedDate: proposedDate ? proposedDate.toISOString() : null,
//       debtAsCauseOfObjection: debtAsCauseOfObjection,
//       debtValue: debtValue !== null ? Number(debtValue) : 0,
//     };

//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_BASE_URL}/api/case`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(caseData),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to submit case");
//       }

//       navigate("/form/3", { state: {} });
//     } catch (error) {
//       setError("Error submitting case: ");
//     }
//   };

//   const handleNext = () => {
//     if (contactPerson && email && hasObjections !== null) {
//       handleSubmit();
//     } else {
//       setError("Fyll ut skjema før du sender inn.");
//     }
//   };

//   const handlePrevious = () => {
//     navigate("/form/1");
//   };

//   return (
//     <Container className="container-form-style">
//       <Form>
//         <h2>
//           <GoPeople />
//           Kontakt info
//         </h2>
//         <h3>
//           Dersom UDI har spørsmål til denne innsendingen vennligst fyll ut
//           kontakt informasjon.
//         </h3>

//         {error && (
//           <Message negative>
//             <p>{error}</p>
//           </Message>
//         )}

//         <Form.Field>
//           <label>Organisasjonsnummer</label>
//           <Input
//             placeholder="Skriv her..."
//             value={orgNr}
//             onChange={(e) => setSpecialID(e.target.value)}
//             required
//             style={{ width: "100%" }}
//           />
//         </Form.Field>

//         <Form.Field>
//           <label>Referansenummer</label>
//           <Input
//             placeholder="Skriv her..."
//             value={referenceNr}
//             onChange={(e) => setReferenceNr(e.target.value)}
//             required
//             style={{ width: "100%" }}
//           />
//         </Form.Field>

//         <Form.Field>
//           <label>Organisasjonsnavn</label>
//           <Input
//             placeholder="Skriv her..."
//             value={orgNavn}
//             onChange={handleOrgNameChange}
//             required
//             style={{ width: "100%" }}
//           />
//         </Form.Field>

//         <Form.Field>
//           <label>Kontakt informasjon</label>
//           <Input
//             placeholder="Skriv her..."
//             value={contactPerson}
//             onChange={handleContactPersonChange}
//             required
//             style={{ width: "100%" }}
//           />
//         </Form.Field>

//         <Form.Field>
//           <label>E-post</label>
//           <Input
//             placeholder="Skriv her..."
//             value={email}
//             onChange={handleEmailChange}
//             required
//             style={{ width: "100%" }}
//           />
//         </Form.Field>

//         <Form.Field>
//           <label>Spørsmål 1: Er det innsigelser?</label>
//           <Form.Group>
//             <Form.Field>
//               <Radio
//                 label="Ja"
//                 name="objections"
//                 value="yes"
//                 checked={hasObjections === true}
//                 onChange={() => setHasObjections(true)}
//                 required
//               />
//             </Form.Field>
//             <Form.Field>
//               <Radio
//                 label="Nei"
//                 name="objections"
//                 value="no"
//                 checked={hasObjections === false}
//                 onChange={() => setHasObjections(false)}
//               />
//             </Form.Field>
//           </Form.Group>
//         </Form.Field>

//         {hasObjections === true && (
//           <>
//             <Form.Field>
//               <label>
//                 Spørsmål 2: Er det utreisedato for bruker som ikke passer?
//               </label>
//               <Form.Group>
//                 <Form.Field>
//                   <Radio
//                     label="Ja"
//                     name="departureDateMismatch"
//                     value="yes"
//                     checked={departureDateMismatch === true}
//                     onChange={() => setDepartureDateMismatch(true)}
//                   />
//                 </Form.Field>
//                 <Form.Field>
//                   <Radio
//                     label="Nei"
//                     name="departureDateMismatch"
//                     value="no"
//                     checked={departureDateMismatch === false}
//                     onChange={() => setDepartureDateMismatch(false)}
//                   />
//                 </Form.Field>
//               </Form.Group>
//             </Form.Field>

//             {departureDateMismatch === true && (
//               <Form.Field>
//                 <label>Spørsmål 3: spesifiser dato som ville fungert</label>
//                 <Input
//                   type="date"
//                   value={
//                     proposedDate ? proposedDate.toISOString().split("T")[0] : ""
//                   }
//                   onChange={(e) => setProposedDate(new Date(e.target.value))}
//                 />
//               </Form.Field>
//             )}

//             <Form.Field>
//               <label>Spørsmål 4: Er det gjeld som grunn til innsigelse?</label>
//               <Form.Group>
//                 <Form.Field>
//                   <Radio
//                     label="Ja"
//                     name="debtAsCauseOfObjection"
//                     value="yes"
//                     checked={debtAsCauseOfObjection === true}
//                     onChange={() => setDebtAsCauseOfObjection(true)}
//                   />
//                 </Form.Field>
//                 <Form.Field>
//                   <Radio
//                     label="Nei"
//                     name="debtAsCauseOfObjection"
//                     value="no"
//                     checked={debtAsCauseOfObjection === false}
//                     onChange={() => setDebtAsCauseOfObjection(false)}
//                   />
//                 </Form.Field>
//               </Form.Group>
//             </Form.Field>

//             {debtAsCauseOfObjection === true && (
//               <Form.Field>
//                 <label>Hva er gjeldsbeløpet?</label>
//                 <Input
//                   type="number"
//                   value={debtValue || ""}
//                   onChange={(e) => setDebtValue(Number(e.target.value))}
//                 />
//               </Form.Field>
//             )}
//           </>
//         )}
//         <Grid>
//           <Grid.Column textAlign="center">
//             <Button onClick={handlePrevious}>Forrige side</Button>
//             <Button
//               type="button"
//               onClick={handleNext}
//               disabled={loading}
//               positive
//             >
//               {loading ? "Laster..." : "Send Skjema"}
//             </Button>
//           </Grid.Column>
//         </Grid>
//       </Form>
//     </Container>
//   );
// }

// export default FormQuestions;




import { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Message,
  Radio,
  Container,
} from "semantic-ui-react";
import { GoPeople } from "react-icons/go";
import { useNavigate, useLocation } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import { getCookie } from "../../Cookies/GetCookies";
import { setCookie } from "../../Cookies/SetCookie";

function FormQuestions() {
  const [, setSpecialID] = useState<string>("");
  const [contactPerson, setContactPerson] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [referenceNr, setReferenceNr] = useState<string>("");
  const [hasObjections, setHasObjections] = useState<boolean | null>(null);
  const [departureDateMismatch, setDepartureDateMismatch] = useState<
    boolean | null
  >(null);
  const [proposedDate, setProposedDate] = useState<Date | null>(null);
  const [debtAsCauseOfObjection, setDebtAsCauseOfObjection] = useState<
    boolean | null
  >(null);
  const [debtValue, setDebtValue] = useState<number | null>(null);
  const [orgNavn, setOrgNavn] = useState<string>("");
  const [orgNr, setOrgNr] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const { state } = useLocation();
  const orgNavnFromState = state?.orgName || "";
  const rfnr = state?.rfnr || "";

 

  //-------------------------------------------
  // cookies
  //-------------------------------------------

  useEffect(() => {
    const savedContactPerson = getCookie("contactPerson");
    const savedEmail = getCookie("email");
    if (savedContactPerson) setContactPerson(savedContactPerson);
    if (savedEmail) setEmail(savedEmail);
  }, []);

  const handleContactPersonChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const name = e.target.value;
    setContactPerson(name);
    setCookie("contactPerson", name, 7);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userEmail = e.target.value;
    setEmail(userEmail);
    setCookie("email", userEmail, 7);
  };

  //--------------------------------------------
  // Form
  //--------------------------------------------

  useEffect(() => {
    setOrgNavn(orgNavnFromState);
    setReferenceNr(rfnr);
    if (orgNavnFromState) {
      fetchOrgNumber(orgNavnFromState);
    }
  }, [orgNavnFromState]);
  const apiKey = "12345"; 

  const fetchOrgNumber = async (name: string) => {
    if (name) {
      setLoading(true);
      setError("");
      const requestUrl = `https://data.brreg.no/enhetsregisteret/api/enheter?navn=${encodeURIComponent(
        name
      )}`;
      try {
        const response = await fetch(requestUrl,
          // this is for protectionn
          {
          headers: {
            "X-Api-Key": apiKey, 
          },
        });
        if (!response.ok) {
          throw new Error(
            `Failed to fetch organization number. Status: ${response.status}`
          );
        }
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          if (data?._embedded?.enheter?.length > 0) {
            const firstOrg = data._embedded.enheter[0];
            const orgNr = firstOrg.organisasjonsnummer;
            setOrgNr(orgNr);
          } else {
            setOrgNr("");
            setError("No organization found with that name.");
          }
        } else {
          setError("Received a non-JSON response from the server.");
        }
      } catch (error) {
        setError("Error");
      } finally {
        setLoading(false);
      }
    } else {
      setOrgNr("");
    }
  };

  const handleOrgNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value.trim();
    setOrgNavn(name);
    if (name) {
      fetchOrgNumber(name);
    } else {
      setOrgNr("");
    }
  };

  const handleSubmit = async () => {
    const caseData = {
      caseId: 0,
      dateCreated: new Date().toISOString(),
      orgNr: orgNr ? Number(orgNr) : 0,
      referenceNr: referenceNr,
      workerName: contactPerson,
      workerEmail: email,
      hasObjections: hasObjections,
      departureDateMismatch: departureDateMismatch,
      proposedDate: proposedDate ? proposedDate.toISOString() : null,
      debtAsCauseOfObjection: debtAsCauseOfObjection,
      debtValue: debtValue !== null ? Number(debtValue) : 0,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/case`,
        {
          method: "POST",
          // this is for protectionn
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": apiKey, 
          },
          body: JSON.stringify(caseData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit case");
      }

      navigate("/form/3", { state: {} });
    } catch (error) {
      setError("Error submitting case: ");
    }
  };

  const handleNext = () => {
    if (contactPerson && email && hasObjections !== null) {
      handleSubmit();
    } else {
      setError("Fyll ut skjema før du sender inn.");
    }
  };

  const handlePrevious = () => {
    navigate("/form/1");
  };

  return (
    <Container className="container-form-style">
      <Form>
        <h2>
          <GoPeople />
          Kontakt info
        </h2>
        <h3>
          Dersom UDI har spørsmål til denne innsendingen vennligst fyll ut
          kontakt informasjon.
        </h3>

        {error && (
          <Message negative>
            <p>{error}</p>
          </Message>
        )}

        <Form.Field>
          <label>Organisasjonsnummer</label>
          <Input
            placeholder="Skriv her..."
            value={orgNr}
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
            value={orgNavn}
            onChange={handleOrgNameChange}
            required
            style={{ width: "100%" }}
          />
        </Form.Field>

        <Form.Field>
          <label>Kontakt informasjon</label>
          <Input
            placeholder="Skriv her..."
            value={contactPerson}
            onChange={handleContactPersonChange}
            required
            style={{ width: "100%" }}
          />
        </Form.Field>

        <Form.Field>
          <label>E-post</label>
          <Input
            placeholder="Skriv her..."
            value={email}
            onChange={handleEmailChange}
            required
            style={{ width: "100%" }}
          />
        </Form.Field>

        <Form.Field>
          <label>Spørsmål 1: Er det innsigelser?</label>
          <Form.Group>
            <Form.Field>
              <Radio
                label="Ja"
                name="objections"
                value="yes"
                checked={hasObjections === true}
                onChange={() => setHasObjections(true)}
                required
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label="Nei"
                name="objections"
                value="no"
                checked={hasObjections === false}
                onChange={() => setHasObjections(false)}
              />
            </Form.Field>
          </Form.Group>
        </Form.Field>

        {hasObjections === true && (
          <>
            <Form.Field>
              <label>
                Spørsmål 2: Er det utreisedato for bruker som ikke passer?
              </label>
              <Form.Group>
                <Form.Field>
                  <Radio
                    label="Ja"
                    name="departureDateMismatch"
                    value="yes"
                    checked={departureDateMismatch === true}
                    onChange={() => setDepartureDateMismatch(true)}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label="Nei"
                    name="departureDateMismatch"
                    value="no"
                    checked={departureDateMismatch === false}
                    onChange={() => setDepartureDateMismatch(false)}
                  />
                </Form.Field>
              </Form.Group>
            </Form.Field>

            <Form.Field>
              <label>
                Spørsmål 3: Foreslått dato for utreise
              </label>
              <Input
                type="date"
                placeholder="Skriv her..."
                value={proposedDate ? proposedDate.toISOString().split("T")[0] : ""}
                onChange={(e) => setProposedDate(new Date(e.target.value))}
              />
            </Form.Field>

            <Form.Field>
              <label>
                Spørsmål 4: Er det gjeld som er årsaken til innsigelsene?
              </label>
              <Form.Group>
                <Form.Field>
                  <Radio
                    label="Ja"
                    name="debtAsCauseOfObjection"
                    value="yes"
                    checked={debtAsCauseOfObjection === true}
                    onChange={() => setDebtAsCauseOfObjection(true)}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label="Nei"
                    name="debtAsCauseOfObjection"
                    value="no"
                    checked={debtAsCauseOfObjection === false}
                    onChange={() => setDebtAsCauseOfObjection(false)}
                  />
                </Form.Field>
              </Form.Group>
            </Form.Field>

            {debtAsCauseOfObjection === true && (
              <Form.Field>
                <label>
                  Spørsmål 5: Hva er gjeldsbeløpet?
                </label>
                <Input
                  type="number"
                  placeholder="Skriv her..."
                  value={debtValue !== null ? debtValue : ""}
                  onChange={(e) => setDebtValue(Number(e.target.value))}
                />
              </Form.Field>
            )}
          </>
        )}

        <Button primary onClick={handleNext}>
          Neste
        </Button>
        <Button secondary onClick={handlePrevious}>
          Tilbake
        </Button>
      </Form>
    </Container>
  );
}

export default FormQuestions;
