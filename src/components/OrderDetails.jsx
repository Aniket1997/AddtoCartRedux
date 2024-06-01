import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Navbar from "./Navbar";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import ItemCard from "./ItemCard";
import {
  removeFromCart,
  incrementQty,
  decrementQty,
  removeAllFromCart,
} from "../redux/slices/CartSlice";

import { updateProfile } from "../redux/slices/authSlice";
import {
  setOrderDetailsAndMethod,
  removeFromOrder,
} from "../redux/slices/OrderDetailSlice";
import { toast } from "react-hot-toast";
import Card from "react-bootstrap/Card";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import "../CSS/OrderDetails.css";

const platformFee = 100; // Example platform fee
const deliveryFee = 50; // Example delivery fee

export default function OrderDetails() {
  const [activeStep, setActiveStep] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  });
  const [upiId, setUpiId] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderItems = useSelector((state) => state.OrderSlice.orders);
  const user = useSelector((state) => state.auth.user);
  const [paymentMethod, setPaymentMethod] = useState("");

  const [addressData, setAddressData] = useState({
    phone: user?.phone || "",
    street: user?.address?.street || "",
    number: user?.address?.number || "",
    city: user?.address?.city || "",
    zipcode: user?.address?.zipcode || "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const totalItemPrice = orderItems.reduce(
    (total, item) => total + item.qty * parseFloat(item.price),
    0
  );
  const gst = totalItemPrice * 0.05; // Example GST calculation (5%)
  const grandTotal = totalItemPrice + platformFee + deliveryFee + gst;
  const totalQty = orderItems.reduce(
    (totalQty, item) => totalQty + item.qty,
    0
  );

  const handleNext = () => {
    if (activeStep === 2) {
      if (paymentMethod === "COD") {
        dispatch(
          setOrderDetailsAndMethod({
            method: "COD",
            order: orderItems,
            total: grandTotal,
          })
        );
      } else if (paymentMethod === "UPI") {
        dispatch(
          setOrderDetailsAndMethod({
            method: "UPI",
            order: orderItems,
            total: grandTotal,
          })
        );
      } else if (paymentMethod === "Card") {
        dispatch(
          setOrderDetailsAndMethod({
            method: "Card",
            order: orderItems,
            total: grandTotal,
          })
        );
      }
      navigate("/profile");
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleConfirmNext = () => {
    dispatch(
      setOrderDetailsAndMethod({
        method: paymentMethod,
        order: orderItems,
        total: grandTotal,
      })
    );
    dispatch(removeAllFromCart());
    navigate("/profile");
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch(updateProfile(addressData));
    setIsEditing(false);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  if (!user) {
    return null; // or return a loader, or a message indicating that the user is being redirected
  }

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 4, md: 6 } }}>
        <Grid container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
          <Grid item xs={12} md={8}>
            <Box sx={{ maxWidth: { xs: 300, sm: 500, md: 700 }, mx: "auto" }}>
              <Stepper activeStep={activeStep} orientation="vertical">
                <Step>
                  <StepLabel>Please Confirm Your Order Details</StepLabel>
                  <StepContent>
                    <div
                      className={
                        !orderItems || orderItems.length === 0
                          ? "empty_order_container"
                          : "order_details_container"
                      }
                    >
                      {orderItems ? (
                        <>
                          {orderItems.map((food) => (
                            <ItemCard
                              key={food.id}
                              id={food.id}
                              title={food.title}
                              price={food.price}
                              description={food.description}
                              location="order"
                              img={food.img}
                              qty={food.qty}
                              remove={() => {
                                dispatch(removeFromOrder({ id: food.id }));
                                toast(`${food.title} Removed!`, { icon: "👋" });
                              }}
                            />
                          ))}
                        </>
                      ) : (
                        <>
                          <h1>Your order details is empty</h1>
                        </>
                      )}
                    </div>
                    <Box sx={{ mb: 2 }}>
                      <div>
                        {orderItems && orderItems.length !== 0 ? (
                          <>
                            <Button
                              variant="contained"
                              onClick={handleNext}
                              sx={{ mt: 1, mr: 1 }}
                            >
                              Continue
                            </Button>
                            <Button
                              disabled={activeStep === 0}
                              onClick={handleBack}
                              sx={{ mt: 1, mr: 1 }}
                            >
                              Back
                            </Button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => navigate("/")}
                              style={{ backgroundColor: "rgb(210 210 210)" }}
                              className="bg-grey-500 font-bold px-3 text-black py-2 rounded-lg mt-3"
                            >
                              Continue Shopping
                            </button>
                          </>
                        )}
                      </div>
                    </Box>
                  </StepContent>
                </Step>
                <Step>
                  <StepLabel>Confirm Your Address</StepLabel>
                  <StepContent>
                    <Card>
                      <Card.Body>
                        {isEditing ? (
                          <Box component="form" noValidate autoComplete="off">
                            <TextField
                              label="Phone"
                              variant="outlined"
                              fullWidth
                              value={addressData.phone}
                              onChange={(e) =>
                                setAddressData({
                                  ...addressData,
                                  phone: e.target.value,
                                })
                              }
                              sx={{ mb: 2 }}
                            />
                            <TextField
                              label="Street"
                              variant="outlined"
                              fullWidth
                              value={addressData.street}
                              onChange={(e) =>
                                setAddressData({
                                  ...addressData,
                                  street: e.target.value,
                                })
                              }
                              sx={{ mb: 2 }}
                            />
                            <TextField
                              label="Number"
                              variant="outlined"
                              fullWidth
                              value={addressData.number}
                              onChange={(e) =>
                                setAddressData({
                                  ...addressData,
                                  number: e.target.value,
                                })
                              }
                              sx={{ mb: 2 }}
                            />
                            <TextField
                              label="City"
                              variant="outlined"
                              fullWidth
                              value={addressData.city}
                              onChange={(e) =>
                                setAddressData({
                                  ...addressData,
                                  city: e.target.value,
                                })
                              }
                              sx={{ mb: 2 }}
                            />
                            <TextField
                              label="Zipcode"
                              variant="outlined"
                              fullWidth
                              value={addressData.zipcode}
                              onChange={(e) =>
                                setAddressData({
                                  ...addressData,
                                  zipcode: e.target.value,
                                })
                              }
                              sx={{ mb: 2 }}
                            />
                            <Button onClick={handleSave} sx={{ mt: 1, mr: 1 }}>
                              Save
                            </Button>
                          </Box>
                        ) : (
                          <Box>
                            <Typography variant="subtitle1" gutterBottom>
                              Phone: {addressData.phone}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                              Street: {addressData.street}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                              Number: {addressData.number}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                              City: {addressData.city}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                              Zipcode: {addressData.zipcode}
                            </Typography>
                            <Button onClick={handleEdit} sx={{ mt: 1, mr: 1 }}>
                              Edit
                            </Button>
                          </Box>
                        )}
                      </Card.Body>
                    </Card>
                    <Box sx={{ mb: 2 }}>
                      <div>
                        <Button
                          variant="contained"
                          onClick={handleNext}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          Continue
                        </Button>
                        <Button
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          Back
                        </Button>
                      </div>
                    </Box>
                  </StepContent>
                </Step>
                <Step>
                  <StepLabel>Payment Method</StepLabel>
                  <StepContent>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">
                        Select Payment Method
                      </FormLabel>
                      <RadioGroup
                        aria-label="payment-method"
                        name="payment-method"
                        value={paymentMethod}
                        onChange={handlePaymentMethodChange}
                      >
                        <FormControlLabel
                          value="COD"
                          control={<Radio />}
                          label="Cash On Delivery"
                        />
                        <FormControlLabel
                          value="UPI"
                          control={<Radio />}
                          label="UPI"
                        />
                        <FormControlLabel
                          value="Card"
                          control={<Radio />}
                          label="Card"
                        />
                      </RadioGroup>
                    </FormControl>
                    {paymentMethod === "Card" && (
                      <Box component="form" noValidate autoComplete="off">
                        <TextField
                          label="Card Number"
                          variant="outlined"
                          fullWidth
                          value={cardDetails.cardNumber}
                          onChange={(e) =>
                            setCardDetails({
                              ...cardDetails,
                              cardNumber: e.target.value,
                            })
                          }
                          sx={{ mb: 2 }}
                        />
                        <TextField
                          label="Expiry Date"
                          variant="outlined"
                          fullWidth
                          value={cardDetails.expiryDate}
                          onChange={(e) =>
                            setCardDetails({
                              ...cardDetails,
                              expiryDate: e.target.value,
                            })
                          }
                          sx={{ mb: 2 }}
                        />
                        <TextField
                          label="CVV"
                          variant="outlined"
                          fullWidth
                          value={cardDetails.cvv}
                          onChange={(e) =>
                            setCardDetails({
                              ...cardDetails,
                              cvv: e.target.value,
                            })
                          }
                          sx={{ mb: 2 }}
                        />
                        <TextField
                          label="Card Name"
                          variant="outlined"
                          fullWidth
                          value={cardDetails.cardName}
                          onChange={(e) =>
                            setCardDetails({
                              ...cardDetails,
                              cardName: e.target.value,
                            })
                          }
                          sx={{ mb: 2 }}
                        />
                      </Box>
                    )}
                    <Box sx={{ mb: 2 }}>
                      <div>
                        <Button
                          variant="contained"
                          onClick={handleConfirmNext}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          Confirm Order
                        </Button>
                        <Button
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          Back
                        </Button>
                      </div>
                    </Box>
                  </StepContent>
                </Step>
              </Stepper>
              {activeStep === 3 && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                  <Typography>All steps completed - you're finished</Typography>
                  <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                    Reset
                  </Button>
                </Paper>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <Card.Body>
                <Typography variant="h6" gutterBottom>
                  Order Summary
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Product Quantity: {totalQty}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Total Price: {totalItemPrice.toFixed(2)}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Platform Fee: {platformFee.toFixed(2)}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Delivery Fee: {deliveryFee.toFixed(2)}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  GST: {gst.toFixed(2)}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Total: {grandTotal.toFixed(2)}
                </Typography>
              </Card.Body>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
