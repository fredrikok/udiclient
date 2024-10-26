/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { AzureInfo } from "../AzureInfo";
import { FaAsterisk } from "react-icons/fa";

function FormQuestions() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [contactPerson, setContactPerson] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [referenceNr, setReferenceNr] = useState<string>("");
    const [hasObjections, setHasObjections] = useState<boolean | null>(null);
    const [departureDateMismatch, setDepartureDateMismatch] = useState<null | boolean>(null);
    const [proposedDate, setProposedDate] = useState<Date | null>(null);
    const [debtAsCauseOfObjection, setDebtAsCauseOfObjection] = useState<null | boolean>(null);
    const [debtValue, setDebtValue] = useState<number | null>(null);
    const [orgNavn, setOrgNavn] = useState<string>("");
    const [orgNr, setOrgNr] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();
    const { state } = useLocation();
    const applicantName = state?.name || "";
    const orgNavnFromState = state?.orgName || "";
    const rfnr = state?.rfnr || "";

    const [contactError, setContactError] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");

    const { userName, userEmail } = AzureInfo();

    const today = new Date().toISOString().split("T")[0];

    console.log(name)

    // Cookie logic
    useEffect(() => {
        if (contactPerson === "") {
            const savedContactPerson = getCookie("contactPerson");
            if (savedContactPerson == "") {
                setContactPerson(userName);
            }

            const savedEmail = getCookie("email");
            if (savedEmail == "") {
                setEmail(userEmail);
            }

            if (savedContactPerson) {
                setContactPerson(savedContactPerson);
            }
            if (savedEmail) setEmail(savedEmail);
        }
    }, [name, userEmail]);

    const handleContactPersonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContactError("");
        const name = e.target.value;
        setContactPerson(name);
        setCookie("contactPerson", name, 7);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailError("");
        const userEmail = e.target.value;
        setEmail(userEmail);
        setCookie("email", userEmail, 7);
    };

    useEffect(() => {
        setOrgNavn(orgNavnFromState);
        setReferenceNr(rfnr);
        if (orgNavnFromState) {
            fetchOrgNumber(orgNavnFromState);
        }
    }, [orgNavnFromState]);

    const fetchOrgNumber = async (name: string) => {
        if (name) {
            setLoading(true);
            setError("");
            const requestUrl = `https://data.brreg.no/enhetsregisteret/api/enheter?navn=${encodeURIComponent(name)}`;
            try {
                const response = await fetch(requestUrl);
                if (!response.ok) throw new Error(`Failed to fetch organization number.`);
                const data = await response.json();
                if (data?._embedded?.enheter?.length > 0) {
                    const orgNr = data._embedded.enheter[0].organisasjonsnummer;
                    setOrgNr(orgNr);
                } else {
                    setOrgNr("");
                    setError("No organization found.");
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
        if (name) fetchOrgNumber(name);
        else setOrgNr("");
    };

    const handleNextPage = () => {
        let valid = true;

        if (!contactPerson.trim()) {
            setContactError("Kontaktinformasjon er påkrevd.");
            valid = false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
            setEmailError("E-post er påkrevd.");
            valid = false;
        } else if (!emailPattern.test(email)) {
            setEmailError("Ugyldig e-postadresse.");
            valid = false;
        }

        if (valid) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePreviousPage = () => {
        setCurrentPage((prev) => prev - 1);
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
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": `${import.meta.env.VITE_API_KEY}`
                    },
                    body: JSON.stringify(caseData),
                }
            );

            if (!response.ok) throw new Error("Failed to submit case");
            navigate("/form/bekreftet");
        } catch (error) {
            setError("Error submitting case.");
        }
    };

    const renderPage = () => {
        switch (currentPage) {
            case 1:
                return (
                    <>
                        <h2><GoPeople /> Kontakt info</h2>
                        <Form.Field>
                            <label>Organisasjonsnummer</label>
                            <Input disabled value={orgNr} />
                        </Form.Field>
                        <Form.Field>
                            <label>Referansenummer</label>
                            <Input disabled value={referenceNr} />
                        </Form.Field>
                        <Form.Field>
                            <label>Organisasjonsnavn</label>
                            <Input disabled value={orgNavn} onChange={handleOrgNameChange} />
                        </Form.Field>
                        <Form.Field>
                            <div className="labelWrapper">
                                <FaAsterisk />
                                <label>Kontakt informasjon</label>
                            </div>
                            <Input value={contactPerson} onChange={handleContactPersonChange} />
                            {contactError && <Message negative>{contactError}</Message>}
                        </Form.Field>
                        <Form.Field>
                            <div className={emailError ? "labelWrapper Error" : "labelWrapper "}>
                                <FaAsterisk />
                                <label>E-post</label>
                                {emailError && <p>{emailError}</p>}
                            </div>
                            <Input
                                className={emailError ? " Error" : ""}
                                value={email} onChange={handleEmailChange} />
                            {/* {emailError && <Message negative>{emailError}</Message>} */}
                        </Form.Field>
                    </>
                );
            case 2:
                return (
                    <>
                        <Form.Field>
                            <label>Spørsmål 1: Har innvendinger?</label>
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
                                        Spørsmål 2: Er det utreisedato for søker som ikke passer?
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

                                {departureDateMismatch === true && (
                                    <Form.Field>
                                        <label>Spørsmål 3: spesifiser dato</label>
                                        <Input
                                            type="date"
                                            min={today}
                                            value={proposedDate ? proposedDate.toISOString().split("T")[0] : ""}
                                            onChange={(e) => {
                                                const selectedDate = new Date(e.target.value);
                                                if (selectedDate >= new Date(today)) {
                                                    setProposedDate(selectedDate);
                                                } else {
                                                    setError("Datoen må være i fremtiden.");
                                                }
                                            }}
                                        />
                                    </Form.Field>
                                )}

                                <Form.Field>
                                    <label>Spørsmål 4: Er det gjeld som grunn til innsigelse?</label>
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
                                        <label>Hva er gjeldsbeløpet?</label>
                                        <Input
                                            type="number"
                                            value={debtValue || ""}
                                            onChange={(e) => setDebtValue(Number(e.target.value))}
                                        />
                                    </Form.Field>
                                )}
                            </>
                        )}
                    </>
                );
            case 3:
                return (
                    <>
                        <h2>Sammendrag</h2>
                        <p>Søker: {applicantName}</p>
                        <p>Kontaktperson: {contactPerson}</p>
                        <p>E-post: {email}</p>
                        <p>Referansenummer: {referenceNr}</p>
                        <p>Organisasjonsnummer: {orgNr}</p>
                        <p>Organisasjonsnavn: {orgNavn}</p>

                        {departureDateMismatch && <p>Foreslått dato: {proposedDate?.toLocaleDateString()}</p>}
                        {debtAsCauseOfObjection && <p>Gjeldsbeløp: {debtValue}</p>}
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <Container className="container-form-style">
            <Form>
                {error && <Message negative>{error}</Message>}
                {renderPage()}
                <Grid>
                    <Grid.Column textAlign="center">
                        {currentPage > 1 && <Button onClick={handlePreviousPage}>Forrige side</Button>}
                        {currentPage < 3 && <Button onClick={handleNextPage}>Neste side</Button>}
                        {currentPage === 3 && (
                            <Button positive onClick={handleSubmit}>
                                Send skjema
                            </Button>
                        )}
                    </Grid.Column>
                </Grid>
            </Form>
        </Container>
    );
}

export default FormQuestions;