import React, { useState } from "react";
import FoodCard from "./FoodCard.jsx";
import FoodData from "../data/FoodData.js";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

const FoodItems = () => {
  const category = useSelector((state) => state.category.category);
  const search = useSelector((state) => state.search.search);
  const handleToast = (name) => toast.success(`Added ${name} `);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  // Filter items based on category and search
  const filteredItems = FoodData.filter((food) => {
    if (category === "All") {
      return food.title.toLowerCase().includes(search.toLowerCase());
    } else {
      return (
        category === food.category &&
        food.title.toLowerCase().includes(search.toLowerCase())
      );
    }
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-wrap gap-10 justify-center lg:justify-center mx-6 my-10">
        {currentItems.map((food) => (
          <FoodCard
            key={food.id}
            id={food.id}
            title={food.title}
            price={food.price}
            description={food.description}
            img={food.image}
            rating={food.rating} // Assuming rating is a part of the food data
            handleToast={handleToast}
          />
        ))}
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center my-6 gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default FoodItems;
