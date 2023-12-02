import React, { useState, useEffect } from 'react';
import {
  Button, Box, FormControl, Input, InputLabel, MenuItem, Select, TextField, Grid,Checkbox,FormGroup,
} from '@mui/material';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import { DataGrid } from '@mui/x-data-grid';
import { useAuthContext } from '../../../../context/AuthContext';
import axios from '../../../../api/axios';
import Navbar from "../components/Navbar";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import FormLabel from '@mui/material/FormLabel';
import ApplicationStore from '../../../../utils/localStorageUtil';
// import SalAdd from './SalAdd';

const URL = './newpresc';

const Medicine = () => {
  const user_email=ApplicationStore().getStorage('user_email');  
    const {trackNo} = useAuthContext();
  const [id, setId] = useState('');
  const [medicine_name, setMedicine_name] = useState([]);
  const [no_of_days, setNo_of_days] = useState('');
  const [productlist, setProduct_list] = useState([]);
  const [timings, setTimings] = useState();
  const [dataList, setDataList] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const [refreshComponent, setRefreshComponent] = useState(false);
  const [isAddButton, setIsAddButton] = useState(true);
  const [open, setOpen] = useState(false);
  const [trackno, setTrackno] = useState('');
  const [userEmail,setUserEmail] = useState('');
  const {state} = useLocation();
  const searchedData = state ? state.useremail : null;
 

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'medicine_id', headerName: 'medicine name', width: 150 },
    { field: 'no_of_days', headerName: 'no of days', width: 150 },
    { field: 'timings', headerName: 'timings', width: 150 },
    // { field: 'trackno', headerName: 'trackno', width: 150 },

    

    {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width:150,
        cellClassName:'actions',
        getActions : (params) => {
            return [
                   
                    <DeleteData selectedRow={params.row} />                       
                    
            ];            
        }            
    },
  ];

  useEffect(() => {
    loadData(); 
    setTrackno(trackNo);  
    setUserEmail(searchedData);
    console.log("track"+trackNo);     
},[refreshData,trackNo,searchedData]);

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
    try {
      const productURL = './medicine/';
      const response = await axios.get(productURL);
      if (response.data.status === 401) {
        setProduct_list('');
      } else {
        setProduct_list(response.data.data);
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
      const data = { medicine_id: medicine_name, no_of_days,timings, trackno };
      const mainURL = URL + '/add';
      serviceMethod(mainURL, method, data, handleSuccess, handleException);
    } catch (e) {
      console.error(e);
    }
  };

  const handlePurchase = (e) => {
    e.preventDefault();
    const method = 'POST';
    try {
      const data = { user_email:userEmail,doctor_email:user_email,trackno:trackno };
      const mainURL = URL + '/presc';
      serviceMethod(mainURL, method, data, handleSuccess, handleException);
    } catch (e) {
      console.error(e);
    }
  };
  const serviceMethodUpdate = async (mainURL,data,handleSuccess,handleException) => {
    try{        

        const response = await axios.delete(mainURL,data);
        return handleSuccess(response.data);  
    }catch(err){
        if(!err?.response){
            console.log("No server response");                
        }else{                
            return handleException(err?.response.data);
        }
    }                  
};

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
    alert("added successfully");
  };

  

  const DeleteData = (props) => {
    return (
        <DeleteIcon 
            onClick={() => {
                console.log(props.selectedRow.id);
                const data = {id:props.selectedRow.id};
                const mainURL = URL +'/'+data.id+ '/delete';
                serviceMethodUpdate(mainURL,data, handleSuccess, handleException);
            }}
        />
    );
};
const handleException = (data) => {
    console.log(data);
  };


  return (
    <>
    <Navbar />
    <div style={{ display: 'flex', gap: '16px' }}>
    <form onSubmit={handleSubmit} style={{ flex: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            value={trackno}
            margin="dense"
            id="outlined-basic"
            label="Trackno"
            variant="outlined"
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Medicine Name</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={medicine_name}
              label="Product Name"
              onChange={(e) => {
                setMedicine_name(e.target.value);
              }}
            >
              {productlist.map((product) => (
                <MenuItem value={product.id}>{product.medicine_name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={no_of_days}
            margin="dense"
            id="outlined-basic"
            label="No Of Days"
            variant="outlined"
            required
            fullWidth
            onChange={(e) => {
              setNo_of_days(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
        <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Timings</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        value={timings}
          onChange={(e)=>{
            setTimings(e.target.value);
          }}

      >
        <FormControlLabel value="morning" control={<Radio />} label="morning" />
        <FormControlLabel value="afternoon" control={<Radio />} label="afternoon" />
        <FormControlLabel value="night" control={<Radio />} label="night" />
      </RadioGroup>
    </FormControl>
        </Grid>
        <Grid item xs={6}>
          <Button
            size="large"
            variant="contained"
            type="submit"
            fullWidth
            onClick={handleSubmit}
          >
            Add
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
          size="large"
            onClick={handlePurchase}
            variant="contained"
            fullWidth
          >
            Purchase
          </Button>
        </Grid>
      </Grid>
    </form>
    <div style={{ flex: 2 }}>
    <Box sx={{ flexGrow: 3, padding: '0px', height: 400, width: '90%' }}>

      <DataGrid rows={dataList} columns={columns} />
      {/* <SalAdd
        isAddButton={isAddButton}
        setOpen={setOpen}
        open={open}
        setRefreshData={setRefreshData}
        trackno={trackno}
        refreshComponent={refreshComponent}
      /> */}
      </Box>
    </div>
  </div>
  </>
  );
};

export default Medicine;
