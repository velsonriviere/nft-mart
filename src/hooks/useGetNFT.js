import { useState } from "react";

export const useGetNFT = () => {
    const [error, setError] = useState(null);

    const getnft = async (tokenID) => {
        const response = await fetch(
            `http://localhost:4000/api/nfts/${tokenID}`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ tokenID }),
            }
        ); //

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        }
        if (response.ok) {
            // save the user to local storage
            // update loading state
        }

        return json;
    };

    return { getnft, error };
};
