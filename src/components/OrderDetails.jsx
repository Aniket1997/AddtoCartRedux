import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Navbar from './Navbar';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import ItemCard from './ItemCard';
import { removeFromCart, incrementQty, decrementQty,removeAllFromCart } from '../redux/slices/CartSlice';
import { updateProfile } from '../redux/slices/authSlice';
import { setOrderDetailsAndMethod } from '../redux/slices/OrderDetailSlice';
import { toast } from 'react-hot-toast';
import Card from 'react-bootstrap/Card';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function OrderDetails() {
  const [activeStep, setActiveStep] = useState(0);
  const [coupon, setCoupon] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
  });
  const [upiId, setUpiId] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const cartItems = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.auth.user);
  const [paymentMethod, setPaymentMethod] = useState('');
  
  
  const [addressData, setAddressData] = useState({
    phone: user.phone,
    street: user.address.street,
    number: user.address.number,
    city: user.address.city,
    zipcode: user.address.zipcode,
  });

  const totalItemPrice = cartItems.reduce((total, item) => total + item.qty * parseFloat(item.price), 0);
  const platformFee = 100; // Example platform fee
  const gst = totalItemPrice * 0.05; // Example GST calculation (5%)
  const grandTotal = totalItemPrice + platformFee + gst;

  const handleNext = () => {
    if (activeStep === 2) {
      if (paymentMethod === 'COD') {
        dispatch(setPaymentMethod('COD'));
      } else if (paymentMethod === 'UPI') {
        dispatch(setPaymentMethod('UPI'));
      } else if (paymentMethod === 'Card') {
        dispatch(setPaymentMethod('Card'));
      }
      navigate('/profile');
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleConfirmNext=()=>{
   dispatch(setOrderDetailsAndMethod({ method: 'COD', order: cartItems }));
   dispatch(removeAllFromCart())
    navigate('/profile');
  }

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
    dispatch(setPaymentMethod(e.target.value));
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Grid container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
          <Grid item xs={12} md={8}>
            <Box sx={{ maxWidth: { xs: 300, sm: 500, md: 700 }, mx: 'auto' }}>
              <Stepper activeStep={activeStep} orientation="vertical">
                <Step>
                  <StepLabel>Please Confirm Your Order Details</StepLabel>
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
                          remove={() => {
                            dispatch(removeFromCart({ id: food.id }));
                            toast(`${food.title} Removed!`, { icon: '👋' });
                          }}
                        />
                      ))}
                    <Box sx={{ mb: 2 }}>
                      <div>
                        <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                          Continue
                        </Button>
                        <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                          Back
                        </Button>
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
                              onChange={(e) => setAddressData({ ...addressData, phone: e.target.value })}
                              sx={{ mb: 2 }}
                            />
                            <TextField
                              label="Street"
                              variant="outlined"
                              fullWidth
                              value={addressData.street}
                              onChange={(e) => setAddressData({ ...addressData, street: e.target.value })}
                              sx={{ mb: 2 }}
                            />
                            <TextField
                              label="Number"
                              variant="outlined"
                              fullWidth
                              value={addressData.number}
                              onChange={(e) => setAddressData({ ...addressData, number: e.target.value })}
                              sx={{ mb: 2 }}
                            />
                            <TextField
                              label="City"
                              variant="outlined"
                              fullWidth
                              value={addressData.city}
                              onChange={(e) => setAddressData({ ...addressData, city: e.target.value })}
                              sx={{ mb: 2 }}
                            />
                            <TextField
                              label="Zipcode"
                              variant="outlined"
                              fullWidth
                              value={addressData.zipcode}
                              onChange={(e) => setAddressData({ ...addressData, zipcode: e.target.value })}
                              sx={{ mb: 2 }}
                            />
                            <Button onClick={handleSave} variant="contained" color="primary">
                              Save
                            </Button>
                          </Box>
                        ) : (
                          <div className="container">
                            <div className="row">
                              <div className="col-md-10">
                                <Typography>{`Phone: ${user.phone}`}</Typography>
                                <Typography>{`Street: ${user.address.street}`}</Typography>
                                <Typography>{`Number: ${user.address.number}`}</Typography>
                                <Typography>{`City: ${user.address.city}`}</Typography>
                                <Typography>{`Zipcode: ${user.address.zipcode}`}</Typography>
                              </div>
                              <div className="col-md-2">
                                <Button onClick={handleEdit}>Edit</Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </Card.Body>
                    </Card>
                    <Box sx={{ mb: 2 }}>
                      <div>
                        <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                          Continue
                        </Button>
                        <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
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
                    Payment Method
                  </StepLabel>
                  <StepContent>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Select Payment Method</FormLabel>
                      <RadioGroup
                        aria-label="payment-method"
                        name="payment-method"
                        value={paymentMethod}
                        onChange={handlePaymentMethodChange}
                      >
                        <FormControlLabel value="COD" control={<Radio />} label="Cash On Delivery" />
                        <FormControlLabel value="UPI" control={<Radio />} label="GPay, PayTm, PhonePe" />
                        <FormControlLabel value="Card" control={<Radio />} label="Credit/Debit Card" />
                      </RadioGroup>
                    </FormControl>

                    {paymentMethod === 'UPI' && (
                      <TextField
                        label="Enter your UPI ID"
                        variant="outlined"
                        fullWidth
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        sx={{ mt: 2 }}
                      />
                    )}

                    {paymentMethod === 'Card' && (
                      <Box sx={{ mt: 2, background: 'white', padding: '14px' }}>
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
                          label="Name on Card"
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
                        <Button variant="contained" onClick={handleConfirmNext} sx={{ mt: 1, mr: 1 }}>
                          Finish
                        </Button>
                        <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
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
        </Grid>
      </Container>
    </>
  );
}
