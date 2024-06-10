import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { signupVendor } from "../../services/apiService";

const VendorSignup = () => {
  const [formData, setFormData] = useState({
    businessName: "",
    contactPerson: "",
    contactPersonMobNo: "",
    email: "",
    password: "",
    street: "",
    number: "",
    city: "",
    zipcode: "",
    taxId: "",
    phone: "",
    document: null,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBusinessDocChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],  // Ensure the file is set directly
    });
  };
  
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      
      const response = await signupVendor(formData);
      console.log('Vendor registered successfully:', response);
      // Handle successful registration (e.g., redirect, show message)
    } catch (error) {
      console.error('Error during vendor signup:', error);
      // Handle errors (e.g., show error message)
    }
  };
  
  
  

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signup-root">
      <Container className="signup-form-container">
        <Typography variant="h4" className="signup-form-title">
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit} autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12} className="signup-form-group">
              <TextField
                fullWidth
                label="Business Name"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} className="signup-form-group">
              <TextField
                fullWidth
                label="Contact Person"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} className="signup-form-group">
              <TextField
                fullWidth
                label="Contact Person Mobile No"
                name="contactPersonMobNo"
                value={formData.contactPersonMobNo}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} className="signup-form-group">
              <TextField
                fullWidth
                type="email"
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} className="signup-form-group">
              <TextField
                fullWidth
                type={showPassword ? "text" : "password"}
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} className="signup-form-group">
              <TextField
                fullWidth
                label="Street"
                name="street"
                value={formData.street}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} className="signup-form-group">
              <TextField
                fullWidth
                label="Number"
                name="number"
                value={formData.number}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} className="signup-form-group">
              <TextField
                fullWidth
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} className="signup-form-group">
              <TextField
                fullWidth
                label="Zipcode"
                name="zipcode"
                value={formData.zipcode}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} className="signup-form-group">
              <TextField
                fullWidth
                label="Tax ID"
                name="taxId"
                value={formData.taxId}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} className="signup-form-group">
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} className="signup-form-group">
            <input type="file" name="document" onChange={handleBusinessDocChange} required />

            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="submit-button"
          >
            Sign Up
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default VendorSignup;
