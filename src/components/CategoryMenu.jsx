import React, { useEffect, useState } from "react";
import FoodData from "../data/FoodData";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../redux/slices/CategorySlice";

const CategoryMenu = () => {
  const [categories, setCategories] = useState([]);

  const listUniqueCategories = () => {
    const uniqueCategories = [
      ...new Set(FoodData.map((food) => food.category)),
    ];
    setCategories(uniqueCategories);
    console.log(uniqueCategories);
  };

  useEffect(() => {
    listUniqueCategories();
  }, []);

  const dispatch = useDispatch();
  const selectedCategory = useSelector((state) => state.category.category);

  return (
    <div className="container filters">
      <div className="category-menu flex flex-wrap gap-2 justify-center m-4">
        <button
          onClick={() => dispatch(setCategory("All"))}
          className={`px-2 py-1 text-sm sm:px-3 sm:py-2 sm:text-base md:px-4 md:py-3 md:text-lg font-bold rounded-lg hover:bg-blue-500 hover:text-white ${
            selectedCategory === "All" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          All
        </button>
        {categories.map((category, index) => (
          <button
            onClick={() => dispatch(setCategory(category))}
            key={index}
            className={`px-2 py-1 text-sm sm:px-3 sm:py-2 sm:text-base md:px-4 md:py-3 md:text-lg font-bold rounded-lg hover:bg-blue-500 hover:text-white ${
              selectedCategory === category ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryMenu;
