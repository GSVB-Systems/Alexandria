import {useAtom} from "jotai";
import {AllAuthorsAtom} from "./AuthorGenreAtom.ts";
import {useEffect} from "react";
import {API_BASE} from "./ApiConfig.ts";

export interface Author {
    id: string
    name: string
    createdat: string
    books: string[]
}

export function useAuthorsDetails() {
    const [, setAllAuthors] = useAtom(AllAuthorsAtom);

    const getAllAuthors = async () => {
        try {
            const response = await fetch(`${API_BASE}/GetAllAuthors`);

            if (response.ok) {
                const allAuthors = await response.json();
                setAllAuthors(allAuthors);
                return allAuthors;
            }
        } catch (error) {
            console.error('Error fetching authors:', error);
        }
    };

    useEffect(() => {
        getAllAuthors();
    }, []);

    return getAllAuthors;
}

export function useCreateAuthor() {
    const [, setAllAuthors] = useAtom(AllAuthorsAtom);

    return async (name: string) => {
        try {
            const response = await fetch(`${API_BASE}/CreateAuthor`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name}),
            });

            if (response.ok) {
                const newAuthor = await response.json();
                setAllAuthors(prev => [...prev, newAuthor]);
                return newAuthor;
            }
        } catch (error) {
            console.error('Error creating author:', error);
        }
    };
}

export function useUpdateAuthor() {
    const [, setAllAuthors] = useAtom(AllAuthorsAtom);

    return async (id: string, name: string) => {
        try {
            const response = await fetch(`${API_BASE}/UpdateAuthor`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id, name}),
            });

            if (response.ok) {
                const updatedAuthor = await response.json();
                setAllAuthors(prev =>
                    prev.map(author => author.id === id ? updatedAuthor : author)
                );
                return updatedAuthor;
            }
        } catch (error) {
            console.error('Error updating author:', error);
        }
    };
}

export function useDeleteAuthor() {
    const [, setAllAuthors] = useAtom(AllAuthorsAtom);

    return async (id: string) => {
        try {
            const response = await fetch(`${API_BASE}/DeleteAuthor`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id}),
            });

            if (response.ok) {
                setAllAuthors(prev => prev.filter(author => author.id !== id));
                return true;
            }
        } catch (error) {
            console.error('Error deleting author:', error);
        }
    };
}