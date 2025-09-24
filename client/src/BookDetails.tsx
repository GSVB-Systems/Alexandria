import { useNavigate, useParams } from "react-router";
import { useAtom } from "jotai";
import { AllBooksAtom } from "./BookAtom.ts";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { API_BASE } from './ApiConfig.ts';


export type BookIdParameter = {
    id: string;
}

export interface Book {
    id: string
    title: string
    pages: number
    createdat: string
    genre: string | null
    authors: string[]
    imgurl?: string      // optional since backend doesn't yet return it
    available?: boolean  // optional since backend doesn't yet return it
}

export default function BookDetails() {
    const params = useParams<BookIdParameter>();
    const [allBooks, setAllBooks] = useAtom(AllBooksAtom);
    const book = allBooks.find(b => b.id === params.id);
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [authors, setAuthors] = useState("");
    const [imgurl, setImgurl] = useState("");

    useEffect(() => {
        setTitle(book?.title ?? "");
        setAuthors(""); // No authors data from backend yet
        setImgurl(book?.imgurl ?? "");
    }, [book]);

    const handleAvailableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        fetch(`${API_BASE}/UpdateBook`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: book?.id,
                title: book?.title,
                author: book?.authors,
                imgurl: book?.imgurl,
                available: e.target.checked
            }),
        })
            .then(async response => {
                if (response.ok) {
                    const updatedBook = await response.json();
                    setAllBooks((books: Book[]) =>
                        books.map(b => b.id === updatedBook.bookid ? updatedBook : b)
                    );
                    toast.success("Book updated successfully.");
                } else {
                    toast.error("Failed to update book.");
                }
            })
            .catch(error => {
                console.error(error);
                toast.error(error);
            });
    };

    const handleDelete = () => { // Why is the deleteBook using Title in the swagger?
        fetch(`${API_BASE}/DeleteBook?id=${book?.id}`, {
            method: 'DELETE',
            body: JSON.stringify({})
        }).then(response => {
            if (response.ok) {
                setAllBooks(books => books.filter(b => b.id !== book?.id));
                toast.success("Book deleted successfully.");
            } else {
                toast.error("Failed to delete book.");
            }
        }).catch(error => {
            console.error(error);
            toast.error(error);
        });

        navigate('/books');
    };

    const handleUpdate = () => {
        fetch(`${API_BASE}/UpdateBook`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: book?.id,
                title,
                author: authors.split(",").map(a => a.trim()),
                imgurl,
                available: book?.available
            }),
        })
            .then(async response => {
                if (response.ok) {
                    const updatedBook = await response.json();
                    setAllBooks((books: Book[]) =>
                        books.map(b => b.id === updatedBook.bookid ? updatedBook : b)
                    );
                    toast.success("Book updated successfully.");
                } else {
                    toast.error("Failed to update book.");
                }
            })
            .catch(error => {
                console.error(error);
                toast.error(error);
            });
    };

    if (!book) return <div>Book not found.</div>;

    return (
        <div>
            <div>
                <img src={book.imgurl} alt={book.title} width={128} />
            </div>
            <div>
                <div>ID: {book.id}</div>
                <div>
                    Title: <input value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div>
                    Authors: <input value={authors} onChange={e => setAuthors(e.target.value)} />
                </div>
                <div>
                    Image URL: <input value={imgurl} onChange={e => setImgurl(e.target.value)} />
                </div>
                <div>
                    Available: <input type="checkbox" checked={book.available} onChange={handleAvailableChange} />
                </div>
                {(book.id !== "1" && book.id !== "2") && (
                    <>
                        <button onClick={handleUpdate}>Edit Book</button>
                        <button onClick={handleDelete}>Delete</button>
                    </>
                )}
            </div>
        </div>
    );
}