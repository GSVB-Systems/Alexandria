import { atom } from 'jotai';
import type { Author } from './AuthorDetails.tsx';
import type { Genre } from './GenreDetails.tsx';

export const AllAuthorsAtom = atom<Author[]>([]);
export const AllGenresAtom = atom<Genre[]>([]);
