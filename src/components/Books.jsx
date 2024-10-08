import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import https from "../../axios";

const Books = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = () => {
      https
        .get(`https://fn27.vimlc.uz/books/${id}`)
        .then((response) => {
          setBook(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching book details:", error);
          setError("Kitob ma'lumotlarini olishda xato yuz berdi.");
          setLoading(false);
        });
    };

    fetchBookDetails();
  }, [id]);

  if (loading)
    return (
      <div className="mx-auto size-20">
        <span className="loading loading-spinner w-40 h-40 mx-auto mt-32"></span>
      </div>
    );
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-avto p-6">
      <button
        onClick={() => navigate("/")} 
        className="mb-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
      >
        Orqaga
      </button>
      <div className="flex gap-4">
        <div className="w-1/1 p-4 border rounded-md bg-orange-200">
          <img
            src={book.thumbnailUrl}
            alt={book.title}
            className="w-40 h-52 "
          />
        </div>
        <div className="w-1/1 p-4 border rounded-md bg-stone-400">
          <h2 className="text-xl font-bold text-black font-sans">{book.title}</h2>
          <p className="text-black font-sans">ISBN: {book.isbn}</p>
          <p className="text-black font-sans">Page Count: {book.pageCount}</p>
          <h3 className="font-bold mt-2 text-black font-sans">Authors:</h3>
          <ul className="list-disc ml-4 text-black font-sans">
            {book.authors.map((author, index) => (
              <li key={index}>{author}</li>
            ))}
          </ul>
          <h3 className="font-bold mt-2 text-black font-sans">Categories:</h3>
          <p className="text-black font-sans">{book.categories.join(", ")}</p>
        </div>
      </div>
    </div>
  );
};

export default Books;