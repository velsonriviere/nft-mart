import { useState } from "react";

export const useGetNFTs = () => {
    const [error, setError] = useState(null);
    const [nfts, setNfts] = useState(null);

    const getnfts = async () => {
        const response = await fetch(`http://localhost:4000/api/nfts/`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        }
        if (response.ok) {
            // save the user to local storage
            // update loading state
            setNfts(json.nft);
        }
    };

    return { getnfts, nfts, error };
};
