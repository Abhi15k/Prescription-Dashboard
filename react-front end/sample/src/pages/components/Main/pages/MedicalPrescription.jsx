import React, { useState, useEffect } from 'react';
import {
  Button, Box, FormControl, Input, InputLabel, MenuItem, Select, TextField, Grid,Dialog,DialogTitle,DialogContent,DialogActions
} from '@mui/material';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import { DataGrid } from '@mui/x-data-grid';
import axios from '../../../../api/axios';
import Navbar from "../components/Navbar";
import { useAuthContext } from '../../../../context/AuthContext';

// import SalAdd from './SalAdd';

const URL = './prescription/track';

const ViewPayment = () => {
  const [id, setId] = useState('');
  const [product_id, setProd_id] = useState('');
  const [dataList, setDataList] = useState([]);
  const [dataList2, setDataList2] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const [refreshComponent, setRefreshComponent] = useState(false);
  const [isAddButton, setIsAddButton] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [open, setOpen] = useState(false);
  const [trackno, setTrackno] = useState('');
  const [subTotal, setSubTotal] = useState(0);
  const [user_email,setUserEmail]=useState('');
  const [price,setPrice]=useState('');

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'user_email', headerName: 'user_email', width: 150 },
    { field: 'doctor_email', headerName: 'doctor_email', width: 150 },
    { field: 'date', headerName: 'date', width: 150 },
    { field: 'trackno', headerName: 'trackno', width: 150 },
    
    {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width:150,
        cellClassName:'actions',
        getActions : (params) => {
            return [
                    <EditData selectedRow={params.row}/>,
                   
            ];            
        }            
    },

    // { field: 'Total', headerName: 'Total', width: 150, renderCell: (params) => <div>{params.row.quantity * params.row.price}</div> },
   
  ];
  const columns2 = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'medicine_id', headerName: 'medicine', width: 150 },
    { field: 'no_of_days', headerName: 'no_of_days', width: 150 },
    { field: 'timings', headerName: 'timings', width: 150 },
    { field: 'date', headerName: 'date', width: 150 },
    
    // {
    //     field: 'actions',
    //     type: 'actions',
    //     headerName: 'Actions',
    //     width:150,
    //     cellClassName:'actions',
    //     getActions : (params) => {
    //         return [
    //                 <EditData selectedRow={params.row}/>,
                   
    //         ];            
    //     }            
    // },

    // { field: 'Total', headerName: 'Total', width: 150, renderCell: (params) => <div>{params.row.quantity * params.row.price}</div> },
   
  ];
      const EditData = (props) => {
        return (
            <Button 
                size="small" 
                variant="outlined"
                style={{ cursor: "pointer" }} onClick={(e) => {
                e.stopPropagation();
                console.log(props.selectedRow.id);
                console.log(props.selectedRow.trackno);
                setId(props.selectedRow.id);
                setTrackno(props.selectedRow.trackno);
                setOpen(true); 
                handleSubmit2(e);              
            }}>View</Button>
        );
    }

  useEffect(() => {
    // loadData();

  }, [refreshData]);

  const loadData = async () => {
    try {
      const response = await axios.get(URL);
      if (response.data.status === 401) {
        setDataList('');
      } else {
        setDataList(response.data.data);
      }
    } catch (err) {
      if (!err?.response) {
        console.log('No server response');
      } else {
        console.log(err?.response.data);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = 'POST';
    try {
      const data = { trackno: trackno };
      const mainURL = URL;
      serviceMethod(mainURL, method, data, handleSuccess, handleException);
    } catch (e) {
      console.error(e);
    }
  };
  const handleSubmit2 = (e) => {
    e.preventDefault();
    const method = 'POST';
    const URL2="./prescription/ViewPresc";
    try {
       
      const data = { trackno: trackno };
      const mainURL = URL2;
      serviceMethod(mainURL, method, data, handleSuccess, handleException);
    } catch (e) {
      console.error(e);
    }
  };
//   const serviceMethodUpdate = async (mainURL, data, handleSuccess, handleException) => {
//     try {

//       const response = await axios.delete(mainURL, data);
//       return handleSuccess(response.data);
//     } catch (err) {
//       if (!err?.response) {
//         console.log("No server response");
//       } else {
//         return handleException(err?.response.data);
//       }
//     }
//   };

  const serviceMethod = async (mainURL, method, data, handleSuccess, handleException) => {
    try {
      const response = await axios.post(mainURL, data);
      return handleSuccess(response.data);
    } catch (err) {
      if (!err?.response) {
        console.log('No server response');
      } else {
        return handleException(err?.response.data);
      }
    }
  };

  const handleSuccess = (data) => {
    setDataList(data.data.barCodeItems);
    setDataList2(data.data.barCodeItems);

  };

//   const calculateSubTotal = (cart) => {
//     let total = 0;
//     if (cart.length > 0) {
//       cart.forEach(item => {
//         total += parseInt(item.price) * parseInt(item.quantity);
//       });
//     }
//     setSubTotal(total);
//   }

  const CustomFooterStatusComponent = (props) => {
    return (
      <Box sx={{ p: 1, display: 'flex' }}>
        <Grid item xs={2}>
          <b>Grand Total:</b> &nbsp;{subTotal} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </Grid>
        <Grid item xs={2}>
          <b>PaymentStatus:</b> {paymentStatus}
        </Grid>

      </Box>
    );
  }

//   const DeleteData = (props) => {
//     return (
//       <DeleteIcon
//         onClick={() => {
//           console.log(props.selectedRow.id);
//           const data = { id: props.selectedRow.id };
//           const mainURL = URL + '/' + data.id + '/delete';
//           serviceMethodUpdate(mainURL, data, handleSuccess, handleException);
//         }}
//       />
//     );
//   };
  const handleException = (data) => {
    console.log(data);
    setDataList([]);
    setPaymentStatus('');
    setSubTotal('');
  };

//   const updatePayment = () => {
//      console.log("hello clocike", trackno);
//      const method = 'POST';
//       try {
//         const data = { trackno: trackno };
//         const mainURL = "booking/bookingStatusUpdate";
//         serviceMethod(mainURL, method, data, handleSuccess, handleException);
//       } catch (e) {
//         console.error(e);
//       }
//   }


  const handleSave=()=>{
   
    const method = 'POST';
    const URL2="./prescription/UpdatePrice";
    try {
       
      const data = { price: price,trackno:trackno };
      const mainURL = URL2;
      serviceMethod(mainURL, method, data, handleSuccess2, handleException);
    } catch (e) {
      console.error(e);
    }

  }
  const handleSuccess2 = (data) => {
    alert("paid");
  };


  return (
    <>
    <Navbar/>
    <Dialog
            
            maxWidth = "lg"
            sx = {{'& .MuiDialog-paper':{width: '100%' }}}
            open={open}
        >
            <div style={{ flex: 2 }}>
            <Box sx={{ flexGrow: 3, padding: '0px', height: 400, width: '90%' }}>
                    <DataGrid rows={dataList2} columns={columns2}
                        slots={{
                        footer: CustomFooterStatusComponent,
                        }} />
                    </Box>
                    </div>
            <form >
            <DialogTitle>
                {"PAYMENT"}
            </DialogTitle>        
            <DialogContent>
                <Grid item xs={12}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={12}>
                            <FormControl fullWidth>                      
                                    <TextField 
                                        fullWidth
                                        value={price}
                                        margin = "dense"
                                        id = "outlined-basic"
                                        label = "Price"
                                        variant = "outlined"
                                        required
                                        onChange={(e) => { setPrice(e.target.value)}}
                                    />
                                </FormControl>
                        </Grid>
                    </Grid>
                </Grid>                  
           </DialogContent>
          <DialogActions sx = {{ margin: '10px' }} >
                <Button 
                   size = "small"
                   variant = "outlined"
                   autoFocus 
                   onClick={(e)=>{
                          setOpen(false);
                    }} >
                   Cancel 
               </Button> 
               <Button 
                    onClick={handleSave}                
                   size="small"
                   variant ="contained"
                   type = "submit">  {"Payment"}
                   
               </Button> 
            </DialogActions> 
            </form>   
        </Dialog>
    <div style={{ display: 'flex', gap: '16px' }}>
      <form onSubmit={handleSubmit} style={{ flex: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              value={trackno}
              margin="dense"
              id="outlined-basic"
              label="Trackno"
              onChange={(e) => {
                setTrackno(e.target.value);
              }}
              variant="outlined"
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>

          </Grid>
          <Grid item xs={12}>

          </Grid>
          <Grid item xs={6}>
            <Button
              size="large"
              variant="contained"
              type="submit"
              fullWidth
            >
              Search
            </Button>
          </Grid>
          {/* <Grid item xs={6}>

            <Button
              size="large"
              variant="contained"
              type="submit"
              fullWidth
              onClick = {updatePayment}
            >
              Pay Now
            </Button>
          </Grid> */}
        </Grid>
      </form>
      <div style={{ flex: 2 }}>
        <Box sx={{ flexGrow: 3, padding: '0px', height: 400, width: '90%' }}>
          <DataGrid rows={dataList} columns={columns}
            slots={{
              footer: CustomFooterStatusComponent,
            }} />
        </Box>
      </div>
    </div>
    </>
  );
};

export default ViewPayment;
