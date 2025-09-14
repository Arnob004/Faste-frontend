import { useState, useEffect } from "react";
import generateId from "../utils/generateId";

const useUser = () => {
    const [user, setUser] = useState({ name: "", photo: "", uid: "" });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRandomUser = async () => {
            try {
                const randomId = Math.floor(Math.random() * 1024) + 1;
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
                const data = await response.json();
                setUser({
                    name: data.name,
                    photo: data.sprites.front_default,
                    uid: generateId(5),
                });
            } catch (error) {
                console.error("Failed to fetch Pokémon:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRandomUser();
    }, []);

    return { user, loading };
};

export default useUser;
