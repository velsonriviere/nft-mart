import { useState } from "react";

export const useGetUsers = () => {
    const [error, setError] = useState(null);
    const [users, setUsers] = useState(null);

    const getusers = async () => {
        const response = await fetch(`http://localhost:4000/api/users/`, {
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
            setUsers(json.users);
        }
    };

    return { getusers, users, error };
};
