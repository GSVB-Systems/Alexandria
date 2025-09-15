import { useNavigate, useParams } from "react-router";
import { useAtom } from "jotai";
import { AllBooksAtom } from "../../../libraryProcejt/Client/src/BookAtom.ts";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { API_BASE } from '../../../libraryProcejt/Client/src/ApiConfig';

export type BookIdParameter = {
    bookid: string;
}

export interface Book {
    bookid: string
    title: string
    author: string
    imgurl: string
    published: boolean
}

export default function BookDetails() {
    const params = useParams<BookIdParameter>();
    const [allBooks, setAllBooks] = useAtom(AllBooksAtom);
    const book = allBooks.find(b => b.bookid === params.bookid);
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [imgurl, setImgurl] = useState("");

    useEffect(() => {
        setTitle(book?.title ?? "");
        setAuthor(book?.author ?? "");
        setImgurl(book?.imgurl ?? "");
    }, [book]);

    const handlePublishedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        fetch(`${API_BASE}/UpdateBook`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                bookid: book?.bookid,
                title: book?.title,
                author: book?.author,
                imgurl: book?.imgurl,
                published: e.target.checked
            }),
        })
            .then(async response => {
                if (response.ok) {
                    const updatedBook = await response.json();
                    setAllBooks((books: Book[]) =>
                        books.map(b => b.bookid === updatedBook.bookid ? updatedBook : b)
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

    const handleDelete = () => {
        fetch(`${API_BASE}/DeleteBook?id=${book?.bookid}`, {
            method: 'DELETE',
            body: JSON.stringify({})
        }).then(response => {
            if (response.ok) {
                setAllBooks(books => books.filter(b => b.bookid !== book?.bookid));
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
                bookid: book?.bookid,
                title,
                author,
                imgurl,
                published: book?.published
            }),
        })
            .then(async response => {
                if (response.ok) {
                    const updatedBook = await response.json();
                    setAllBooks((books: Book[]) =>
                        books.map(b => b.bookid === updatedBook.bookid ? updatedBook : b)
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
                <div>ID: {book.bookid}</div>
                <div>
                    Title: <input value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div>
                    Author: <input value={author} onChange={e => setAuthor(e.target.value)} />
                </div>
                <div>
                    Image URL: <input value={imgurl} onChange={e => setImgurl(e.target.value)} />
                </div>
                <div>
                    Published: <input type="checkbox" checked={book.published} onChange={handlePublishedChange} />
                </div>
                {(book.bookid !== "1" && book.bookid !== "2") && (
                    <>
                        <button onClick={handleUpdate}>Edit Book</button>
                        <button onClick={handleDelete}>Delete</button>
                    </>
                )}
            </div>
        </div>
    );
}