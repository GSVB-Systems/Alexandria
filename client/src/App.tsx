import { useNavigate } from 'react-router-dom'
import { AllBooksAtom } from "../../../Alexandria/client/src/BookAtom.ts";
import alexandriaLogo from './assets/alex.svg'
import menuDots from './assets/menu-dots.svg'
import './App.css'
import {useAtom} from "jotai";

function App() {
    const [allBooks, ] = useAtom(AllBooksAtom)
    const navigate = useNavigate();

    // If there are no books, add a placeholder book
    if (allBooks.length === 0) {
        for (let i = 0; i < 10; i++) {
            allBooks.push({
                bookid: i.toString(),
                title: "Placeholder Book",
                author: "Unknown Author",
                imgurl: "https://via.placeholder.com/98x150?text=Book+Cover",
                published: false
            });
        }
    }

    const handleLogoClick = () => {
        window.location.href = '/';
    }
    const handleMenuClick = () => {
        const drawerCheckbox = document.getElementById('my-drawer-4') as HTMLInputElement;
        if (drawerCheckbox) {
            drawerCheckbox.checked = true;
        }
    }

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
                                    <img src={menuDots} className="logo w-5 h-5 m-3" alt="Menu Dots" />
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="w-screen box-border">
                        <div className="px-[60px] w-full">
                            <div className="book-list-container flex flex-col" >
                                {allBooks.length === 0 ? (
                                    <div className="bg-white p-8 text-center">No books found.</div>
                                ) : (
                                    allBooks.map(book => (
                                        <div
                                            key={book.bookid}
                                            className="bg-white flex items-stretch mb-[30px] rounded shadow w-full h-[220px]"
                                            style={{ minHeight: 200 }}
                                            onClick={() => navigate('/book/' + book.bookid)}
                                        >
                                            <img
                                                src={book.imgurl}
                                                alt={book.title}
                                                className="w-[98px] h-full object-cover m-[25px] rounded"
                                            />
                                            <div className="flex-1 flex flex-col justify-between py-[25px] pr-[25px] h-full">
                                                <div>
                                                    <div className="text-lg font-medium">{book.title}</div>
                                                    <div className="text-base text-gray-500 mt-2">by {book.author}</div>
                                                </div>
                                                <div className="text-sm text-gray-400">
                                                    pages 260
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                </div>
                <div className="drawer-side z-50">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                        {/* Sidebar content here */}
                        <li><a>Sidebar Item 1</a></li>
                        <li><a>Sidebar Item 2</a></li>
                    </ul>
                </div>
            </div>
        </>
    )
}


export default App
