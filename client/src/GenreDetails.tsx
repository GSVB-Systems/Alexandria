import {useAtom} from "jotai";
import {AllGenresAtom} from "./AuthorGenreAtom.ts";
import {useEffect} from "react";
import {API_BASE} from "./ApiConfig.ts";

export interface Genre {
    id: string
    name: string
    createdat: string
    books: string[]
}

export function useGenreDetails() {
   const [, setAllGenres] = useAtom(AllGenresAtom);

   const getAllGenres = async () => {
       try {
           const response = await fetch(`${API_BASE}/GetAllGenres`);

           if (response.ok) {
               const allGenres = await response.json();
               setAllGenres(allGenres);
               return allGenres;
           }
       } catch (error) {
           console.error('Error fetching genres:', error);
       }
   };

   useEffect(() => {
       getAllGenres();
   }, []);

   return getAllGenres;
}

export function useCreateGenre() {
   const [, setAllGenres] = useAtom(AllGenresAtom);

   return async (name: string) => {
       try {
           const response = await fetch(`${API_BASE}/CreateGenre`, {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
               },
               body: JSON.stringify({name}),
           });

           if (response.ok) {
               const newGenre = await response.json();
               setAllGenres(prev => [...prev, newGenre]);
               return newGenre;
           }
       } catch (error) {
           console.error('Error creating genre:', error);
       }
   };
}

export function useUpdateGenre() {
   const [, setAllGenres] = useAtom(AllGenresAtom);

   return async (id: string, name: string) => {
       try {
           const response = await fetch(`${API_BASE}/UpdateGenre`, {
               method: 'PUT',
               headers: {
                   'Content-Type': 'application/json',
               },
               body: JSON.stringify({id, name}),
           });

           if (response.ok) {
               const updatedGenre = await response.json();
               setAllGenres(prev =>
                   prev.map(genre => genre.id === id ? updatedGenre : genre)
               );
               return updatedGenre;
           }
       } catch (error) {
           console.error('Error updating genre:', error);
       }
   };
}

export function useDeleteGenre() {
   const [, setAllGenres] = useAtom(AllGenresAtom);

   return async (id: string) => {
       try {
           const response = await fetch(`${API_BASE}/DeleteGenre`, {
               method: 'DELETE',
               headers: {
                   'Content-Type': 'application/json',
               },
               body: JSON.stringify({id}),
           });

           if (response.ok) {
               setAllGenres(prev => prev.filter(genre => genre.id !== id));
               return true;
           }
       } catch (error) {
           console.error('Error deleting genre:', error);
       }
   };
}