import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../redux/slices/authSlice"; // Assuming you have an updateProfile action
import Navbar from "./Navbar";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstname: user.name.firstname,
    lastname: user.name.lastname,
    email: user.email,
    phone: user.phone,
    street: user.address.street,
    number: user.address.number,
    city: user.address.city,
    zipcode: user.address.zipcode,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    dispatch(updateProfile(formData)); // Assuming you have an action to update the profile in your Redux slice
    setIsEditing(false);
  };

  return (
    <>
    <Navbar/>
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                className="h-16 w-16 rounded-full object-cover"
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="Profile"
              />
              <div className="ml-4">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleInputChange}
                      className="text-xl font-bold text-gray-800"
                    />
                    <input
                      type="text"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleInputChange}
                      className="text-xl font-bold text-gray-800"
                    />
                  </>
                ) : (
                  <h2 className="text-xl font-bold text-gray-800">{`${user?.name.firstname} ${user?.name.lastname}`}</h2>
                )}
              </div>
            </div>
            {isEditing ? (
              <button className="text-sm text-blue-500" onClick={handleSaveClick}>
                Save
              </button>
            ) : (
              <button className="text-sm text-blue-500" onClick={handleEditClick}>
                Edit Profile
              </button>
            )}
          </div>
          <hr className="my-4" />
          <div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Contact Information
              </h3>
              <div className="mt-2">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="text-sm text-gray-600"
                    />
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="text-sm text-gray-600"
                    />
                  </>
                ) : (
                  <>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Email:</span> {user?.email}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Phone:</span> {user?.phone}
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800">Address</h3>
              <div className="mt-2">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      className="text-sm text-gray-600"
                    />
                    <input
                      type="text"
                      name="number"
                      value={formData.number}
                      onChange={handleInputChange}
                      className="text-sm text-gray-600"
                    />
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="text-sm text-gray-600"
                    />
                    <input
                      type="text"
                      name="zipcode"
                      value={formData.zipcode}
                      onChange={handleInputChange}
                      className="text-sm text-gray-600"
                    />
                  </>
                ) : (
                  <>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Street:</span> {user?.address.street} {user.address.number}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">City:</span> {user?.address.city}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Zipcode:</span> {user?.address.zipcode}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Profile;
