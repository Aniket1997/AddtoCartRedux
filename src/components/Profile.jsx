import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../redux/slices/authSlice"; // Assuming you have an updateProfile action
import Navbar from "./Navbar";
import { IoCubeOutline } from "react-icons/io5";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import '../CSS/ProfilePage.css'

const Profile = () => {
  const steps = [
    "Order Placed",
    "Order Shipped Succesfully",
    "Expected Delivary : 27th May,2024",
  ];

  const user = useSelector((state) => state.auth.user);
  const orderItems = useSelector((state) => state.OrderSlice);
  console.log(orderItems.orders);
  
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
      <Navbar />
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
                <button
                  className="text-sm text-blue-500"
                  onClick={handleSaveClick}
                >
                  Save
                </button>
              ) : (
                <button
                  className="text-sm text-blue-500"
                  onClick={handleEditClick}
                >
                  Edit Profile
                </button>
              )}
            </div>
            <hr className="my-4" />
            <div className="container">
              <div className="row">
                <div className="col-md-4">
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
                            <span className="font-semibold">Email:</span>{" "}
                            {user?.email}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-semibold">Phone:</span>{" "}
                            {user?.phone}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Address
                    </h3>
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
                            <span className="font-semibold">Street:</span>{" "}
                            {user?.address.street} {user.address.number}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-semibold">City:</span>{" "}
                            {user?.address.city}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-semibold">Zipcode:</span>{" "}
                            {user?.address.zipcode}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                   <div className="order_header">
                   <IoCubeOutline className="order_icon"/>
                    Order Details
                   </div>
                   
                    <div>
                      <div className="container">
                        <div className="row order_details_info">
                          <div className="col-md-2">Image</div>
                          <div className="col-md-2">Title</div>
                          <div className="col-md-2">Quantity</div>
                          <div className="col-md-2">Status</div>
                          <div className="col-md-4">Expected Delivary</div>
                        </div>
                      </div>
                      {orderItems.orders[0].map((item, index) => 
                      (
                        <Accordion key={index} m-1>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${index + 1}-content`}
                            id={`panel${index + 1}-header`}
                          >
                            {" "}
                            <div className="container">
                              <div className="row align-center">
                                <div className="col-md-2">
                                  <img src={item.img} alt={item.title} />
                                </div>
                                <div className="col-md-2">
                                  {item.title.slice(0,20)}...
                                </div>
                                <div className="col-md-2 text-center">
                                  {item.qty}
                                </div>
                                <div className="col-md-2">
                                  <span className="order_status">Shipped</span>
                                </div>
                                <div className="col-md-4 text-center">
                                  <span>27th May,2024</span>
                                </div>
                              </div>
                            </div>
                            {/* Assuming there's a 'title' property in each item */}
                          </AccordionSummary>
                          <AccordionDetails>
                          <Typography>
                            <p><strong>Title:</strong> {item.title}</p>
                            <p><strong>Description:</strong> {item.description}</p>
                            <p><strong>Price:</strong> ${item.price}</p>
                            <p><strong>Payment Method :</strong>{orderItems.method}</p>
                          </Typography>
                              
                              <Box sx={{ width: "100%" }}>
                                <Stepper activeStep={1} alternativeLabel >
                                  {steps.map((label) => (
                                    <Step key={label}>
                                      <StepLabel>{label}</StepLabel>
                                    </Step>
                                  ))}
                                </Stepper>
                              </Box>
                              {/* Assuming there's a 'description' property in each item */}
                            
                          </AccordionDetails>
                          {item.method &&
                            item.method ===
                              "COD" /* Check if 'method' exists and is 'COD' */ && (
                              <AccordionActions>
                                <Button>Cancel Order</Button>
                              </AccordionActions>
                            )}
                        </Accordion>
                        
                      ))}
                      {" "}
                    </div>
                  
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
