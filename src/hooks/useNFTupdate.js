import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useNFTupdate = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { user } = useAuthContext();
    const update = async (tokenID, owner, userID, userName) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
            `http://localhost:4000/api/nfts-restrict/`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({ tokenID, owner, userID, userName }),
            }
        ); //

        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        }
        if (response.ok) {
            // save the user to local storage
            // update loading state
            setIsLoading(false);
        }

        return json;
    };

    return { update };
};
