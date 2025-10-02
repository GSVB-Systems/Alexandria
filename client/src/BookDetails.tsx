import { useNavigate, useParams } from 'react-router';
    import { useAtom } from 'jotai';
    import { AllBooksAtom } from './BookAtom.ts';
    import toast from 'react-hot-toast';
    import { API_BASE } from './ApiConfig.ts';

    export type BookIdParameter = {
      id: string;
    };

    export interface Book {
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
    }

    export default function BookDetails() {
      const params = useParams<BookIdParameter>();
      const [allBooks, setAllBooks] = useAtom(AllBooksAtom);
      const book = allBooks.find((b) => b.id === params.id);
      const navigate = useNavigate();

      const handleDelete = () => {
        fetch(`${API_BASE}/DeleteBook?id=${book?.id}`, {
          method: 'DELETE',
          body: JSON.stringify({}),
        })
          .then((response) => {
            if (response.ok) {
              setAllBooks((books) => books.filter((b) => b.id !== book?.id));
              toast.success('Book deleted successfully.');
              navigate('/');
            } else {
              toast.error('Failed to delete book.');
            }
          })
          .catch((error) => {
            console.error(error);
            toast.error('Failed to delete book.');
          });
      };

      if (!book) {
        return (
          <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
              <div className="max-w-md">
                <div className="alert alert-error">
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Book not found</span>
                </div>
                <button onClick={() => navigate('/')} className="btn btn-primary mt-4">
                  Return to Library
                </button>
              </div>
            </div>
          </div>
        );
      }

      return (
        <div className="min-h-screen py-8">
          <div className="container mx-auto px-4 max-w-6xl">
            {/* Navigation */}
            <div className="breadcrumbs text-sm mb-6">
              <ul>
                <li>
                  <button onClick={() => navigate('/')} className="btn btn-ghost btn-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
                    </svg>
                    Library
                  </button>
                </li>
                <li>Book Details</li>
              </ul>
            </div>

            <div className="grid lg:grid-cols-5 gap-8">
              {/* Book Cover Section */}
              <div className="lg:col-span-2">
                <div className="card bg-base-100 shadow-xl">
                  <figure className="px-8 pt-8">
                    <img
                      src={book.imgurl || '/placeholder-book.png'}
                      alt={book.title}
                      className="rounded-lg w-full max-w-sm h-full object-cover shadow-lg"
                    />
                  </figure>
                </div>
              </div>

              {/* Book Information Section */}
              <div className="lg:col-span-3">
                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    {/* Title and Genre */}
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                      <div>
                        <h1 className="card-title text-3xl font-bold mb-2">{book.title}</h1>
                        {book.genre && (
                          <div className="badge badge-secondary badge-lg">{book.genre.name}</div>
                        )}
                      </div>
                      <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01" />
                          </svg>
                        </div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                          {book.id !== '1' && book.id !== '2' && (
                            <li>
                              <button onClick={handleDelete} className="text-error">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Delete Book
                              </button>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>

                    {/* Authors */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2">Authors</h3>
                      <div className="flex flex-wrap gap-2">
                        {book.authors.map((author) => (
                          <div key={author.id} className="badge badge-outline badge-lg">
                            {author.name}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Book Details Grid */}
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-figure text-primary">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div className="stat-title">Pages</div>
                        <div className="stat-value text-2xl">{book.pages}</div>
                      </div>

                      <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-figure text-secondary">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="stat-title">Added</div>
                        <div className="stat-value text-xl">{new Date(book.createdat).toLocaleDateString()}</div>
                      </div>
                    </div>

                    {/* Book ID */}
                    <div className="text-sm text-base-content/60">
                      Book ID: <span className="font-mono">{book.id}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }