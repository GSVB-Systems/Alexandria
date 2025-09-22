
import { useAtom } from "jotai";
import { AllGenresAtom } from "./AuthorGenreAtom.ts";
import {useEffect} from "react";
import { API_BASE } from "./ApiConfig.ts";

export interface Genre {
    id: string
    name: string
    createdat: string
    books: string[]
}

export function useGenreDetails() {

    const [, setAllGenres] = useAtom(AllGenresAtom);


    useEffect(() => {
        fetch(`${API_BASE}/GetAllGenres`)
            .then(result => {
                result.json().then(allGenres => {
                    setAllGenres(allGenres)
                })
            });
    }, [])

}