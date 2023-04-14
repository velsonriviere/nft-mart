import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useNFTcreate = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { user } = useAuthContext();
    const nftcreate = async (
        title,
        description,
        url,
        royalty,
        creator,
        itemPrice,
        onSale,
        tokenID,
        userID,
        userName
    ) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
            "http://localhost:4000/api/nfts-restrict/create",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    title,
                    description,
                    url,
                    royalty,
                    creator,
                    itemPrice,
                    onSale,
                    tokenID,
                    userID,
                    userName,
                }),
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

    return { nftcreate, error };
};
