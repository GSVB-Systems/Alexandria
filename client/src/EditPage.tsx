import { useEffect, useState } from 'react';
        import { useAtom } from 'jotai';
        import { AllBooksAtom } from './BookAtom.ts';
        import { API_BASE } from './ApiConfig.ts';
        import toast from 'react-hot-toast';

        interface Book {
          id: string;
          title: string;
          pages: number;
          createdat: string;
          genre: {
            id: string;
            name: string;
            createdat: string;
            books: string[];
          };
          authors: Array<{
            id: string;
            name: string;
            createdat: string;
          }>;
          imgurl: string;
        }

        interface Author {
          id: string;
          name: string;
        }

        interface Genre {
          id: string;
          name: string;
        }

        export function EditPage() {
          // Selected items
          const [selectedBookId, setSelectedBookId] = useState('');
          const [selectedAuthorId, setSelectedAuthorId] = useState('');
          const [selectedGenreId, setSelectedGenreId] = useState('');

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
          const [genres, setGenres] = useState<Genre[]>([]);
          const [authors, setAuthors] = useState<Author[]>([]);
          const [books, setBooks] = useState<Book[]>([]);

          useEffect(() => {
            const fetchData = async () => {
              try {
                const [genresResponse, authorsResponse, booksResponse] = await Promise.all([
                  fetch(`${API_BASE}/GetAllGenres`),
                  fetch(`${API_BASE}/GetAllAuthors`),
                  fetch(`${API_BASE}/GetAllBooks`)
                ]);

                if (genresResponse.ok) {
                  const genresData = await genresResponse.json();
                  setGenres(genresData);
                }

                if (authorsResponse.ok) {
                  const authorsData = await authorsResponse.json();
                  setAuthors(authorsData);
                }

                if (booksResponse.ok) {
                  const booksData = await booksResponse.json();
                  setBooks(booksData);
                }
              } catch (error) {
                console.error('Error fetching data:', error);
              }
            };
            fetchData();
          }, []);

          // Load selected book data
          useEffect(() => {
            if (selectedBookId) {
              const book = books.find(b => b.id === selectedBookId);
              if (book) {
                setBookTitle(book.title);
                setBookPages(book.pages.toString());
                setBookGenre(book.genre?.id || '');
                setBookAuthors(book.authors?.[0]?.id || '');
                setBookImgUrl(book.imgurl);
              }
            } else {
              setBookTitle('');
              setBookPages('');
              setBookGenre('');
              setBookAuthors('');
              setBookImgUrl('');
            }
          }, [selectedBookId, books]);

          // Load selected author data
          useEffect(() => {
            if (selectedAuthorId) {
              const author = authors.find(a => a.id === selectedAuthorId);
              if (author) {
                setAuthorName(author.name);
              }
            } else {
              setAuthorName('');
            }
          }, [selectedAuthorId, authors]);

          // Load selected genre data
          useEffect(() => {
            if (selectedGenreId) {
              const genre = genres.find(g => g.id === selectedGenreId);
              if (genre) {
                setGenreName(genre.name);
              }
            } else {
              setGenreName('');
            }
          }, [selectedGenreId, genres]);

          const handleUpdateBook = async () => {
            if (!selectedBookId) {
              toast.error('Please select a book to update.');
              return;
            }

            if (!bookTitle.trim()) {
              toast.error('Book title cannot be empty.');
              return;
            }

            if (!bookPages || parseInt(bookPages) <= 0) {
              toast.error('Please enter a valid number of pages.');
              return;
            }

            if (!bookGenre) { // Add this validation
              toast.error('Please select a genre.');
              return;
            }

            if (!bookAuthors) { // Add this validation
              toast.error('Please select an author.');
              return;
            }

            try {
              const response = await fetch(`${API_BASE}/UpdateBook`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  id: selectedBookId,
                  title: bookTitle,
                  pages: parseInt(bookPages),
                  genre: bookGenre,
                  authors: bookAuthors,
                  imgurl: bookImgUrl,
                }),
              });

              if (response.ok) {
                const updatedBook = await response.json();
                setAllBooks((prev) => prev.map(book => book.id === selectedBookId ? updatedBook : book));
                setBooks((prev) => prev.map(book => book.id === selectedBookId ? updatedBook : book));
                toast.success('Book updated successfully!');
              } else {
                const errorData = await response.text();
                toast.error(`Failed to update book: ${errorData || 'Unknown error'}`);
              }
            } catch (error) {
              console.error('Error updating book:', error);
              toast.error('Network error while updating book.');
            }
          };

          const handleDeleteBook = async () => {
            if (!selectedBookId) {
              toast.error('Please select a book to delete.');
              return;
            }

            try {
              const response = await fetch(`${API_BASE}/DeleteBook`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: selectedBookId }),
              });

              if (response.ok) {
                setAllBooks((prev) => prev.filter(book => book.id !== selectedBookId));
                setBooks((prev) => prev.filter(book => book.id !== selectedBookId));
                setSelectedBookId('');
                setBookTitle('');
                setBookPages('');
                setBookGenre('');
                setBookAuthors('');
                setBookImgUrl('');
                toast.success('Book deleted successfully!');
              } else {
                const errorData = await response.text();
                toast.error(`Failed to delete book: ${errorData || 'Unknown error'}`);
              }
            } catch (error) {
              console.error('Error deleting book:', error);
              toast.error('Network error while deleting book.');
            }
          };

          const handleUpdateAuthor = async () => {
            if (!selectedAuthorId) {
              toast.error('Please select an author to update.');
              return;
            }

            if (!authorName.trim()) {
              toast.error('Author name cannot be empty.');
              return;
            }

            try {
              const response = await fetch(`${API_BASE}/UpdateAuthor`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  id: selectedAuthorId,
                  name: authorName
                }),
              });

              if (response.ok) {
                const updatedAuthor = await response.json();
                setAuthors((prev) => prev.map(author => author.id === selectedAuthorId ? updatedAuthor : author));
                toast.success('Author updated successfully!');
              } else {
                const errorData = await response.text();
                toast.error(`Failed to update author: ${errorData || 'Unknown error'}`);
              }
            } catch (error) {
              console.error('Error updating author:', error);
              toast.error('Network error while updating author.');
            }
          };

          const handleDeleteAuthor = async () => {
            if (!selectedAuthorId) {
              toast.error('Please select an author to delete.');
              return;
            }

            try {
              const response = await fetch(`${API_BASE}/DeleteAuthor`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: selectedAuthorId }),
              });

              if (response.ok) {
                setAuthors((prev) => prev.filter(author => author.id !== selectedAuthorId));
                setSelectedAuthorId('');
                setAuthorName('');
                toast.success('Author deleted successfully!');
              } else {
                const errorData = await response.text();
                toast.error(`Failed to delete author: ${errorData || 'Unknown error'}`);
              }
            } catch (error) {
              console.error('Error deleting author:', error);
              toast.error('Network error while deleting author.');
            }
          };

          const handleUpdateGenre = async () => {
            if (!selectedGenreId) {
              toast.error('Please select a genre to update.');
              return;
            }

            if (!genreName.trim()) {
              toast.error('Genre name cannot be empty.');
              return;
            }

            try {
              const response = await fetch(`${API_BASE}/UpdateGenre`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  id: selectedGenreId,
                  name: genreName
                }),
              });

              if (response.ok) {
                const updatedGenre = await response.json();
                setGenres((prev) => prev.map(genre => genre.id === selectedGenreId ? updatedGenre : genre));
                toast.success('Genre updated successfully!');
              } else {
                const errorData = await response.text();
                toast.error(`Failed to update genre: ${errorData || 'Unknown error'}`);
              }
            } catch (error) {
              console.error('Error updating genre:', error);
              toast.error('Network error while updating genre.');
            }
          };

          const handleDeleteGenre = async () => {
            if (!selectedGenreId) {
              toast.error('Please select a genre to delete.');
              return;
            }

            try {
              const response = await fetch(`${API_BASE}/DeleteGenre`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: selectedGenreId }),
              });

              if (response.ok) {
                setGenres((prev) => prev.filter(genre => genre.id !== selectedGenreId));
                setSelectedGenreId('');
                setGenreName('');
                toast.success('Genre deleted successfully!');
              } else {
                const errorData = await response.text();
                toast.error(`Failed to delete genre: ${errorData || 'Unknown error'}`);
              }
            } catch (error) {
              console.error('Error deleting genre:', error);
              toast.error('Network error while deleting genre.');
            }
          };

          return (
            <div className="flex flex-col lg:flex-row gap-8 p-4">
              {/* Edit Book */}
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">Edit Book</h2>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Select Book</span>
                    </label>
                    <select
                      className="select select-bordered"
                      value={selectedBookId}
                      onChange={(e) => setSelectedBookId(e.target.value)}
                    >
                      <option value="">Select a book to edit</option>
                      {books.map((book) => (
                        <option key={book.id} value={book.id}>
                          {book.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  {selectedBookId && (
                    <>
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
                          <span className="label-text">Authors</span>
                        </label>
                        <select
                          className="select select-bordered"
                          value={bookAuthors}
                          onChange={(e) => setBookAuthors(e.target.value)}
                        >
                          <option value="">Select an author</option>
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
                      <div className="card-actions justify-end gap-2">
                        <button className="btn btn-primary" onClick={handleUpdateBook}>
                          Update Book
                        </button>
                        <button className="btn btn-error" onClick={handleDeleteBook}>
                          Delete Book
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Edit Author */}
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">Edit Author</h2>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Select Author</span>
                    </label>
                    <select
                      className="select select-bordered"
                      value={selectedAuthorId}
                      onChange={(e) => setSelectedAuthorId(e.target.value)}
                    >
                      <option value="">Select an author to edit</option>
                      {authors.map((author) => (
                        <option key={author.id} value={author.id}>
                          {author.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {selectedAuthorId && (
                    <>
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
                      <div className="card-actions justify-end gap-2">
                        <button className="btn btn-primary" onClick={handleUpdateAuthor}>
                          Update Author
                        </button>
                        <button className="btn btn-error" onClick={handleDeleteAuthor}>
                          Delete Author
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Edit Genre */}
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">Edit Genre</h2>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Select Genre</span>
                    </label>
                    <select
                      className="select select-bordered"
                      value={selectedGenreId}
                      onChange={(e) => setSelectedGenreId(e.target.value)}
                    >
                      <option value="">Select a genre to edit</option>
                      {genres.map((genre) => (
                        <option key={genre.id} value={genre.id}>
                          {genre.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {selectedGenreId && (
                    <>
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
                      <div className="card-actions justify-end gap-2">
                        <button className="btn btn-primary" onClick={handleUpdateGenre}>
                          Update Genre
                        </button>
                        <button className="btn btn-error" onClick={handleDeleteGenre}>
                          Delete Genre
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        }