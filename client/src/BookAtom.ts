import {atom} from "jotai";
import type {Book} from "./BookDetails.tsx";

export const AllBooksAtom = atom<Book[]>([]);