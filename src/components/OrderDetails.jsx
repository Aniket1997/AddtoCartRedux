import React, { useState } from "react";
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
} from "../redux/slices/CartSlice";
import { toast } from "react-hot-toast";
import Card from "react-bootstrap/Card";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

export default function OrderDetails() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [coupon, setCoupon] = React.useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === 2) {
      navigate("/profile");
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const cartItems = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.auth.user);
  const [addressData, setAddressData] = useState({
    phone: user.phone,
    street: user.address.street,
    number: user.address.number,
    city: user.address.city,
    zipcode: user.address.zipcode,
  });
  const totalItemPrice = cartItems.reduce(
    (total, item) => total + item.qty * parseFloat(item.price),
    0
  );

  const platformFee = 100; // Example platform fee
  const gst = totalItemPrice * 0.05; // Example GST calculation (5%)
  const grandTotal = totalItemPrice + platformFee + gst;

  const applyCoupon = () => {
    const discount = totalItemPrice * 0.1; // Assume 10% discount for simplicity
    const discountedTotal = totalItemPrice - discount;
    const newGrandTotal = discountedTotal + platformFee + gst;
    setGrandTotal(newGrandTotal);
  };

  const dispatch = useDispatch();

  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Grid container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
          <Grid item xs={12} md={8}>
            <Box sx={{ maxWidth: { xs: 300, sm: 500, md: 700 }, mx: "auto" }}>
              <Stepper activeStep={activeStep} orientation="vertical">
                <Step>
                  <StepLabel style={{ fontSize: "30px !important" }}>
                    Please Confirm Your order Details
                  </StepLabel>
                  <StepContent>
                    {cartItems &&
                      cartItems.map((food) => (
                        <ItemCard
                          key={food.id}
                          id={food.id}
                          title={food.title}
                          price={food.price}
                          description={food.description}
                          location={food.location}
                          img={food.img}
                          qty={food.qty}
                          increment={() =>
                            dispatch(incrementQty({ id: food.id }))
                          }
                          decrement={() =>
                            dispatch(decrementQty({ id: food.id }))
                          }
                          remove={() => {
                            dispatch(removeFromCart({ id: food.id }));
                            toast(`${food.title} Removed!`, { icon: "👋" });
                          }}
                        />
                      ))}
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
                  <StepLabel>Confirm Your Address</StepLabel>
                  <StepContent>
                    {/* <Typography>
                      An ad group contains one or more ads which target a shared set of keywords.
                    </Typography> */}
                    <Card>
                      <Card.Body>
                        {/* {isEditing ? (
                          // If editing mode is enabled, display edit form
                          <EditForm user={user} />
                        ) : (
                          // Otherwise, display user details
                          <> */}
                        <Typography>{`Phone: ${user.phone}`}</Typography>
                        <Typography>{`Street: ${user.address.street}`}</Typography>
                        <Typography>{`Number: ${user.address.number}`}</Typography>
                        <Typography>{`City: ${user.address.city}`}</Typography>
                        <Typography>{`Zipcode: ${user.address.zipcode}`}</Typography>

                        <Button>Edit</Button>
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
                  <StepLabel
                    optional={
                      <Typography variant="caption">Last step</Typography>
                    }
                  >
                    Choose Your Payment Method
                  </StepLabel>
                  <StepContent>
                    <Box sx={{ mb: 2 }}>
                      <div>
                        {/* Radio buttons for payment options */}
                        <FormControl>
      
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="COD" control={<Radio />} label="Cash On Deleivary" />
        <FormControlLabel value="UPI" control={<Radio />} label="GPay,PayTm,PhonePay" />
        <FormControlLabel value="Card" control={<Radio />} label="Credit/DebitCard" />
        
      </RadioGroup>
    </FormControl>
                      </div>
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Finish
                      </Button>
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button>
                    </Box>
                  </StepContent>
                </Step>
              </Stepper>
              {activeStep === Step.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                  <Typography>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                    Reset
                  </Button>
                </Paper>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                p: 3,
                backgroundColor: "white",
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Payment Details
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1">
                  Total Price: ₹{totalItemPrice.toFixed(2)}
                </Typography>
                <Typography variant="body1">
                  Platform Fee: ₹{platformFee}
                </Typography>
                <Typography variant="body1">GST: ₹{gst.toFixed(2)}</Typography>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Grand Total: ₹{grandTotal.toFixed(2)}
                </Typography>
              </Box>
              <TextField
                label="Coupon Code"
                variant="outlined"
                fullWidth
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={applyCoupon}
              >
                Apply Coupon
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
