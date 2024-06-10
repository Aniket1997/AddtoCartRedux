import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Sidebar from "./Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import {
  getAllVendors,
  approveVendor,
  rejectVendor,
  getVendorDocument,
} from "../../services/apiService";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import DownloadIcon from "@mui/icons-material/Download";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const VendorListAction = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedVendorId, setSelectedVendorId] = useState(null);
  const [comment, setComment] = useState("");
  const [actionType, setActionType] = useState("");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMore = Boolean(anchorEl);
  const handleMoreButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMoreButtonClose = () => {
    setAnchorEl(null);
  };
  const fetchVendors = async () => {
    try {
      const response = await getAllVendors();
      setVendors(response);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const handleClickOpen = (id, action) => {
    setSelectedVendorId(id);
    setActionType(action);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setComment("");
    setSelectedVendorId(null);
  };

  const handleReject = async () => {
    try {
      await rejectVendor(selectedVendorId, comment);
      setOpen(false);
      setComment("");
      fetchVendors(); // Refresh vendors after rejection
    } catch (error) {
      console.error("Failed to reject vendor:", error);
    }
  };

  const handleApprove = async () => {
    try {
      await approveVendor(selectedVendorId, true);
      setOpen(false);
      fetchVendors(); // Refresh vendors after approval
    } catch (error) {
      console.error("Failed to approve vendor:", error);
    }
  };

  const handleChangeComment = (event) => {
    setComment(event.target.value);
  };

  const handleDownloadDocument = async (vendorId) => {
    try {
      const response = await getVendorDocument(vendorId);
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `vendor_${vendorId}_document.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download document:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const columns = [
    { field: "businessName", headerName: "Business Name", width: 150 },
    { field: "contactPerson", headerName: "Contact Person", width: 150 },
    {
      field: "contactPersonMobNo",
      headerName: "Contact Person Mobile No",
      width: 150,
    },
    { field: "email", headerName: "Email", width: 150 },
    { field: "taxId", headerName: "Tax ID", width: 100 },
    {
      field: "isApproved",
      headerName: "Approved",
      width: 100,
      type: "boolean",
    },
    {
      field: "document",
      headerName: "Document",
      width: 100,
      renderCell: (params) => (
        <Button
          onClick={() => handleDownloadDocument(params.row.id)}
          variant="contained"
          color="primary"
        >
          <DownloadIcon />
        </Button>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 60,
      renderCell: (params) => (
        <>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleMoreButtonClick}
          >
            <MoreVertIcon />
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={openMore}
              onClose={handleMoreButtonClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={() => handleClickOpen(params.row.id, "approve")}
              >
                Approve
              </MenuItem>
              <MenuItem
                onClick={() => handleClickOpen(params.row.id, "reject")}
              >
                My account
              </MenuItem>
            </Menu>
          </Button>
        </>
      ),
    },
  ];

  const rows = vendors.map((vendor) => ({
    id: vendor._id,
    businessName: vendor.businessName,
    contactPerson: vendor.contactPerson,
    contactPersonMobNo: vendor.contactPersonMobNo,
    email: vendor.email,
    taxId: vendor.taxId,
    isApproved: vendor.isApproved,
  }));

  return (
    <>
      <Navbar />
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex flex-col flex-grow">
          <div className="container">
            <div className="row">
              <div className="col-md-12 chart_container">
                <h1 className="text-2xl font-semibold mb-4">Vendors List</h1>
                <div style={{ height: 400, width: "100%" }}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    disableSelectionOnClick
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {actionType === "reject" ? "Reject Vendor" : "Approve Vendor"}
        </DialogTitle>
        <DialogContent>
          {actionType === "reject" && (
            <DialogContentText>
              Please provide comments for rejecting this vendor.
            </DialogContentText>
          )}
          {actionType === "reject" && (
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Comments"
              type="text"
              fullWidth
              variant="standard"
              value={comment}
              onChange={handleChangeComment}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {actionType === "reject" && (
            <Button onClick={handleReject}>Reject</Button>
          )}
          {actionType === "approve" && (
            <Button onClick={handleApprove}>Approve</Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default VendorListAction;
