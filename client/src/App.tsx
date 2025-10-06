import { useNavigate, Routes, Route, Link, useSearchParams } from 'react-router-dom';
import { AllBooksAtom } from './BookAtom.ts';
import { AllAuthorsAtom, AllGenresAtom } from './AuthorGenreAtom.ts';
import alexandriaLogo from './assets/alex.svg';
import menuDots from './assets/menu-dots.svg';
import './App.css';
import { useAtom } from 'jotai';
import BookDetails from './BookDetails.tsx';
import { useBooksDetails } from './BookDetailsHook.ts';
import { useAuthorsDetails } from './AuthorDetails.tsx';
import { useGenreDetails } from './GenreDetails.tsx';
import { CreatePage } from './CreatePage.tsx';
import {EditPage} from "./EditPage.tsx";
import {Toaster} from "react-hot-toast";
import { useState, useEffect } from 'react';

interface Book {
  id: string;
  title: string;
  pages: number;
  createdat: string;
  genre: {
    id: string;
    name: string;
    createdat: string;
    books: never[];
  } | null;
  authors: {
    id: string;
    name: string;
    createdat: string;
  }[];
  imgurl?: string;
  available?: boolean;
}

interface Author {
  id: string;
  name: string;
  createdat: string;
  books?: string[];
}

interface Genre {
  id: string;
  name: string;
  createdat: string;
  books?: string[];
}

function BookList({ allBooks, pageNumber, itemsPerPage, navigate, }:
                  { allBooks: Book[]; pageNumber: number; itemsPerPage: number; onPageChange: (newPage: number) => void; navigate: (path: string) => void; })
{
  return (
    <div className="book-list-container flex flex-col">
      {allBooks.length === 0 ? (
        <div className="bg-white p-8 text-center">No books found.</div>
      ) : (
        allBooks.map((book) => (
          <div
            key={book.id}
            className="bg-white flex items-stretch mb-[30px] rounded shadow w-full h-[220px]"
            style={{ minHeight: 200 }}
            onClick={() => navigate('/book/' + book.id)}
          >
            <img
              src={book.imgurl}
              alt={book.title}
              width={98}
              height={150}
              className="object-cover m-[25px] rounded"
              style={{ minWidth: 98, minHeight: 150, maxWidth: 98, maxHeight: 150 }}
            />
            <div className="flex-1 flex flex-col justify-between py-[25px] pr-[25px] h-full">
              <div>
                <div className="text-lg font-medium">{book.title}</div>
                <div className="text-base text-gray-500 mt-2">
                  by {book.authors?.length ? book.authors.map((author) => author.name).join(', ') : 'No authors'}
                </div>
                <div className="text-sm text-gray-500 mt-1">{book.genre?.name ?? 'No genre'}</div>
              </div>
              <div className="text-sm text-gray-400">{book.pages}</div>
            </div>
          </div>
        ))
      )}
      <div className="flex justify-between mt-4">
        <button className="btn" onClick={() => {
          const newPageNumber = pageNumber-1;
          navigate('./?itemsPerPage='+itemsPerPage+'&pageNumber='+newPageNumber);
        }}>
          Previous page
        </button>
        <button className="btn" onClick={() => {
          const newPageNumber = pageNumber+1;
          navigate('./?itemsPerPage='+itemsPerPage+'&pageNumber='+newPageNumber);
        }}>
          Next page
        </button>
      </div>
    </div>
  );
}

// Update Authors component to match BookList styling
function Authors() {
  useAuthorsDetails();
  const [allAuthors] = useAtom(AllAuthorsAtom);

  return (
    <div className="book-list-container flex flex-col">
      {allAuthors.length === 0 ? (
        <div className="bg-white p-8 text-center">No authors found.</div>
      ) : (
        allAuthors.map((author: Author) => (
          <div
            key={author.id}
            className="bg-white flex items-stretch mb-[30px] rounded shadow w-full h-[220px]"
            style={{ minHeight: 200 }}
          >
            <div className="w-[98px] h-[150px] m-[25px] bg-gray-200 rounded flex items-center justify-center">
              <span className="text-gray-500 text-sm">Author</span>
            </div>
            <div className="flex-1 flex flex-col justify-between py-[25px] pr-[25px] h-full">
              <div>
                <div className="text-lg font-medium">{author.name}</div>
                <div className="text-base text-gray-500 mt-2">ID: {author.id}</div>
                <div className="text-base text-gray-500 mt-1">Created: {author.createdat}</div>
              </div>
              <div className="text-sm text-gray-400">
                {author.books?.length ? `${author.books.length} books` : 'No books'}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

// Update Genres component to match BookList styling
function Genres() {
  useGenreDetails();
  const [allGenres] = useAtom(AllGenresAtom);

  return (
    <div className="book-list-container flex flex-col">
      {allGenres.length === 0 ? (
        <div className="bg-white p-8 text-center">No genres found.</div>
      ) : (
        allGenres.map((genre: Genre) => (
          <div
            key={genre.id}
            className="bg-white flex items-stretch mb-[30px] rounded shadow w-full h-[220px]"
            style={{ minHeight: 200 }}
          >
            <div className="w-[98px] h-[150px] m-[25px] bg-gray-200 rounded flex items-center justify-center">
              <span className="text-gray-500 text-sm">Genre</span>
            </div>
            <div className="flex-1 flex flex-col justify-between py-[25px] pr-[25px] h-full">
              <div>
                <div className="text-lg font-medium">{genre.name}</div>
                <div className="text-base text-gray-500 mt-2">ID: {genre.id}</div>
                <div className="text-base text-gray-500 mt-1">Created: {genre.createdat}</div>
              </div>
              <div className="text-sm text-gray-400">
                {genre.books?.length ? `${genre.books.length} books` : 'No books'}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

function App() {
  useBooksDetails();
  const [allBooks] = useAtom(AllBooksAtom);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };
  const handleMenuClick = () => {
    const drawerCheckbox = document.getElementById('my-drawer-4') as HTMLInputElement;
    if (drawerCheckbox) {
      drawerCheckbox.checked = true;
    }
  };
  const [searchParams, setSearchParams] = useSearchParams();
  const [paginatedBooks, setPaginatedBooks] = useState<Book[]>([]);
  const pageNumber = parseInt(searchParams.get('pageNumber') || '1');
  const itemsPerPage = parseInt(searchParams.get('itemsPerPage') || '3');

  useEffect(() => {
    const start = (pageNumber - 1) * itemsPerPage;
    setPaginatedBooks(allBooks.slice(start, start + itemsPerPage));
  }, [allBooks, pageNumber, itemsPerPage]);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ pageNumber: String(newPage), itemsPerPage: String(itemsPerPage) });
  };

  return (
    <>
      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <div className="fixed top-0 left-0 right-0 p-4 z-50">
            {/* Navbar */}
            <div className="navbar bg-base-100 shadow-sm">
              <div className="flex items-center flex-none">
                <span onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
                  <img src={alexandriaLogo} className="logo h-8 m-1" alt="Alexandria Logo" />
                </span>
                <span onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
                  <span className="text-xl font-semibold mx-2 leading-none">Alexandria</span>
                </span>
              </div>
              <div className="flex-1">
                <input type="text" placeholder="Type here" className="input w-full max-w-md" />
              </div>
              <div className="flex-none">
                <span onClick={handleMenuClick} style={{ cursor: 'pointer' }}>
                  <img src={menuDots} className="logo w-5 h-5 m-3 dark:invert" alt="Menu Dots" />
                </span>
              </div>
            </div>
          </div>
          <div className="w-screen box-border">
            <div className="px-[60px] w-full">
              <Routes>
                <Route path="/" element={<BookList allBooks={paginatedBooks} pageNumber={pageNumber} itemsPerPage={itemsPerPage} onPageChange={handlePageChange} navigate={navigate} />} />
                <Route path="/create" element={<CreatePage />} />
                  <Route path="/edit" element={<EditPage />} />
                <Route path="/book/:id" element={<BookDetails />} />
                <Route path="/authors" element={<Authors />} />
                <Route path="/genres" element={<Genres />} />
              </Routes>
            </div>
          </div>
        </div>
        <div className="drawer-side z-50">
          <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li>
              <Link to="/create">Create</Link>
            </li>
            <li>
                <Link to="/edit">Edit</Link>
            </li>
            <li>
              <Link to="/">Books</Link>
            </li>
            <li>
              <Link to="/authors">Authors</Link>
            </li>
            <li>
              <Link to="/genres">Genres</Link>
            </li>
          </ul>
        </div>
        <Toaster />
      </div>
    </>
  );
}



export default App;
