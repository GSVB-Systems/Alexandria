import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { AllBooksAtom } from './BookAtom';
import { API_BASE } from './ApiConfig';

export function useBooksDetails() {
  const [, setAllBooks] = useAtom(AllBooksAtom);

  useEffect(() => {
    fetch(`${API_BASE}/GetAllBooks`)
      .then((res) => res.json())
      .then((allBooks) => setAllBooks(allBooks));
  }, []);
}
