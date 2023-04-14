import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useNFTpriceUpdate = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { user } = useAuthContext();
    const priceupdate = async (tokenID, itemPrice) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
            `http://localhost:4000/api/nfts-restrict/${tokenID}/price`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({ tokenID, itemPrice }),
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

    return { priceupdate };
};
