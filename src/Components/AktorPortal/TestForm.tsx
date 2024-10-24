

import React, { useState } from "react";

function TestForm() {
    const [referanceNr, setReferanceNr] = useState("");
    const [fullName, setFullName] = useState("");
    const [orgName, setOrgName] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = {
            referanceNr: referanceNr,
            fullName: fullName,
            orgName: orgName
        };

        // Make POST request to the backend API
        fetch(`${import.meta.env.VITE_BASE_URL}/api/User`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Api-Key": `Bearer ${import.meta.env.VITE_API_KEY}`
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                console.log("Success:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <div>
            <h1>Test Form</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Reference Number</label>
                    <input
                        type="text"
                        value={referanceNr}
                        onChange={(e) => setReferanceNr(e.target.value)}
                        placeholder="Enter reference number"
                    />
                </div>
                <div>
                    <label>Full Name</label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter full name"
                    />
                </div>
                <div>
                    <label>Organization Name</label>
                    <input
                        type="text"
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                        placeholder="Enter organization name"
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default TestForm;
