import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { AllBooksAtom } from './BookAtom';
import { API_BASE } from './ApiConfig';

export function useBooksDetails() {
  const [, setAllBooks] = useAtom(AllBooksAtom);

  useEffect(() => {
    fetch(`${API_BASE}/GetAllBooks`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        skip: 3,
        take: 1,
        ordering: 0,
      })
    })
      const circularRefsHandled = resolveRefs(result)
      .then((res) => res.json())
      .then((allBooks) => setAllBooks(circularRefsHandled));
  }, []);
}
