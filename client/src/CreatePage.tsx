import { useEffect, useState } from 'react';
import { useCreateAuthor } from './AuthorDetails.tsx';
import { useCreateGenre } from './GenreDetails.tsx';
import { useAtom } from 'jotai';
import { AllBooksAtom } from './BookAtom.ts';
import { API_BASE } from './ApiConfig.ts';
import toast from 'react-hot-toast';

export function CreatePage() {
  // Book form state
  const [bookTitle, setBookTitle] = useState('');
  const [bookPages, setBookPages] = useState('');
  const [bookGenre, setBookGenre] = useState('');
  const [bookAuthors, setBookAuthors] = useState('');
  const [bookImgUrl, setBookImgUrl] = useState('');

  // Author form state
  const [authorName, setAuthorName] = useState('');

  // Genre form state
  const [genreName, setGenreName] = useState('');

  const [, setAllBooks] = useAtom(AllBooksAtom);
  const createAuthor = useCreateAuthor();
  const createGenre = useCreateGenre();

  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);
  const [authors, setAuthors] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(`${API_BASE}/GetAllGenres`);
        if (response.ok) {
          const genresData = await response.json();
          setGenres(genresData);
        }
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch(`${API_BASE}/GetAllAuthors`);
        if (response.ok) {
          const authorsData = await response.json();
          setAuthors(authorsData);
        }
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
    };
    fetchAuthors();
  }, []);

  const handleCreateBook = async () => {
    if (!bookTitle.trim()) {
      toast.error('Book title cannot be empty.');
      return;
    }

    if (!bookPages || parseInt(bookPages) <= 0) {
      toast.error('Please enter a valid number of pages.');
      return;
    }

    if (!bookGenre) {
      toast.error('Please select a genre.');
      return;
    }

    if (!bookAuthors) {
      toast.error('Please select an author.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/CreateBook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: bookTitle,
          pages: parseInt(bookPages),
          genreid: bookGenre,
          authorIds: bookAuthors.split(',').map((a) => a.trim()),
          imgurl: bookImgUrl,
        }),
      });

      if (response.ok) {
        const newBook = await response.json();
        setAllBooks((prev) => [...prev, newBook]);
        toast.success('Book created successfully!');
        setBookTitle('');
        setBookPages('');
        setBookGenre('');
        setBookAuthors('');
        setBookImgUrl('');
      } else {
        const errorData = await response.text();
        toast.error(`Failed to create book: ${errorData || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error creating book:', error);
      toast.error('Network error while creating book.');
    }
  };

  const handleCreateAuthor = async () => {
    if (!authorName.trim()) {
      toast.error('Author name cannot be empty.');
      return;
    }

    const result = await createAuthor(authorName);
    if (result) {
      toast.success('Author created successfully!');
      setAuthorName('');
    } else {
      toast.error('Failed to create author.');
    }
  };

  const handleCreateGenre = async () => {
    if (!genreName.trim()) {
      toast.error('Genre name cannot be empty.');
      return;
    }

    const result = await createGenre(genreName);
    if (result) {
      toast.success('Genre created successfully!');
      setGenreName('');
    } else {
      toast.error('Failed to create genre.');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-4">
      {/* Create Book */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Create Book</h2>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              placeholder="Enter book title"
              className="input input-bordered"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Pages</span>
            </label>
            <input
              type="number"
              placeholder="Enter number of pages"
              className="input input-bordered"
              value={bookPages}
              onChange={(e) => setBookPages(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Genre</span>
            </label>
            <select className="select select-bordered" value={bookGenre} onChange={(e) => setBookGenre(e.target.value)}>
              <option value="">Select a genre</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Author</span>
            </label>
            <select
              className="select select-bordered"
              value={bookAuthors}
              onChange={(e) => setBookAuthors(e.target.value)}
            >
              <option value="">Select authors</option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Image URL</span>
            </label>
            <input
              type="text"
              placeholder="Enter image URL"
              className="input input-bordered"
              value={bookImgUrl}
              onChange={(e) => setBookImgUrl(e.target.value)}
            />
          </div>
          <div className="card-actions justify-end">
            <button className="btn btn-success" onClick={handleCreateBook}>
              Create Book
            </button>
          </div>
        </div>
      </div>

      {/* Create Author */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Create Author</h2>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter author name"
              className="input input-bordered"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
            />
          </div>
          <div className="card-actions justify-end">
            <button className="btn btn-success" onClick={handleCreateAuthor}>
              Create Author
            </button>
          </div>
        </div>
      </div>

      {/* Create Genre */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Create Genre</h2>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter genre name"
              className="input input-bordered"
              value={genreName}
              onChange={(e) => setGenreName(e.target.value)}
            />
          </div>
          <div className="card-actions justify-end">
            <button className="btn btn-success" onClick={handleCreateGenre}>
              Create Genre
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
