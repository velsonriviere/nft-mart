import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useNFTurlUpdate = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { user } = useAuthContext();
    const urlupdate = async (id, url) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
            `http://localhost:4000/api/nfts-restrict/${id}/url`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({ id, url }),
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

    return { urlupdate };
};
