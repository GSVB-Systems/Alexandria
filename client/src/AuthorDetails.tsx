
import { useAtom } from "jotai";
import { AllAuthorsAtom } from "./AuthorGenreAtom.ts";
import {useEffect} from "react";
import { API_BASE } from "./ApiConfig.ts";

export interface Author {
    id: string
    name: string
    createdat: string
    books: string[]
}

export function useAuthorsDetails() {

    const [, setAllAuthors] = useAtom(AllAuthorsAtom);


    useEffect(() => {
        fetch(`${API_BASE}/GetAllAuthors`)
            .then(result => {
                result.json().then(allAuthors => {
                    setAllAuthors(allAuthors)
                })
            });
    }, [])

}