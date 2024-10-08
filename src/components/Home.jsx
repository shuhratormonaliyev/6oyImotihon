import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import https from "../../axios";

function Home() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"))
  const minPagesRef = useRef();
  const maxPagesRef = useRef();
  const navigate = useNavigate();
  const [filteredBooks, setFilteredBooks] = useState([])
  const fetchAllBooks = () => {
    https
      .get("https://fn27.vimlc.uz/books")
      .then((response) => setBooks(response.data))
      .catch((error) => console.error("Error fetching all books:", error));
  };

  const searchBooks = (e) => {
    e.preventDefault();
    https
      .get(`https://fn27.vimlc.uz/books/search?query=${query}`)
      .then((response) => setFilteredBooks(response.data))
      .catch((error) => console.error("Error searching books:", error));
  };

  const filterByPages = (e) => {
    e.preventDefault();
    const minPages = minPagesRef.current.value;
    const maxPages = maxPagesRef.current.value;
    https
      .get(
        `https://fn27.vimlc.uz/books/filter?minPages=${minPages}&maxPages=${maxPages}`
      )
      .then((response) => setFilteredBooks(response.data))
      .catch((error) => console.error(error));
    console.log(filteredBooks);
  };
  
  const handleViewDetails = (id) => {
    if(!token){
      navigate("/login")
      return
    }
    navigate(`/books/${id}`);
  };

  useEffect(() => {
    fetchAllBooks();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <form onSubmit={searchBooks} className="flex space-x-2">
        
          <input
            type="text"
            placeholder="Qidiruv...  "
            className="border border-gray-300 p-2 rounded w-full"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 rounded hover:bg-blue-700"
          >
            Qidiruv
          </button>
        </form>
        <form onSubmit={filterByPages} className="flex space-x-2">
          <input
            type="number"
            placeholder="min"
            className="border border-gray-300 p-2 rounded"
            ref={minPagesRef}
          />
          <input
            type="number"
            placeholder="max"
            className="border border-gray-300 p-2 rounded"
            ref={maxPagesRef}
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 rounded hover:bg-green-700"
          >
            Filter
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        { filteredBooks.length == 0 && books.map((book) => (
            <div
              key={book.id}
              className="border border-gray-300 p-4 rounded shadow-lg"
            >
              <h2 className="text-lg font-bold">Kitob ma'lumotlari</h2>
              <img
                src={book.thumbnailUrl}
                alt={book.title}
                className="w-full h-auto mb-2"
              />
              <p>{book.title}</p>
              <p>Page Count: {book.pageCount}</p>
              <button
                onClick={() => handleViewDetails(book.id)}
                className="mt-4 bg-purple-500 text-white p-2 rounded hover:bg-purple-700"
              >
                View Details
              </button>
            </div>
          ))}
          { filteredBooks.length > 0  && filteredBooks.map((book) => (
            <div
              key={book.id}
              className="border border-gray-300 p-4 rounded shadow-lg"
            >
              <h2 className="text-lg font-bold">Kitob ma'lumotlari</h2>
              <img
                src={book.thumbnailUrl}
                alt={book.title}
                className="w-full h-auto mb-2"
              />
              <p>{book.title}</p>
              <p>Page Count: {book.pageCount}</p>
              <button
                onClick={() => handleViewDetails(book.id)}
                className="mt-4 bg-purple-500 text-white p-2 rounded hover:bg-purple-700"
              >
                View Details
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
