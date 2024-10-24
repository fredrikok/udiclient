/* eslint-disable @typescript-eslint/no-explicit-any */
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";

export const AzureInfo = () => {
    const isAuthenticated = useIsAuthenticated();
    const { accounts } = useMsal();
    const [userName, setUserName] = useState<string>("");
    const [userEmail, setUserEmail] = useState<string | any>("");

    useEffect(() => {
        if (isAuthenticated && accounts.length > 0) {
            const account = accounts[0];
            const azureUserName = account.name || account.idTokenClaims?.name || "";
            const azureEmail = account.username || account.idTokenClaims?.username || undefined;

            setUserName(azureUserName);
            setUserEmail(azureEmail);
        }
    }, [isAuthenticated, accounts]);

    return { userName, userEmail };
};
