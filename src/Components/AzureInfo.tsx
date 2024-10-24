/* eslint-disable @typescript-eslint/no-explicit-any */
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";

export const AzureInfo = () => {
    const isAuthenticated = useIsAuthenticated();
    const { accounts } = useMsal();
    const [name, setName] = useState<string>("");
    const [userEmail, setUserEmail] = useState<string | any>("");

    useEffect(() => {
        if (isAuthenticated && accounts.length > 0) {
            const account = accounts[0];
            const userName = account.name || account.idTokenClaims?.name || "";
            const azureEmail = account.username || account.idTokenClaims?.username || undefined;

            setName(userName);
            setUserEmail(azureEmail);
        }
    }, [isAuthenticated, accounts]);

    return { name, userEmail };
};
