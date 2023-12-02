import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Box } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Navbar from "../components/Navbar";
import axios from "../../../../api/axios";
import ApplicationStore from "../../../../utils/localStorageUtil";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../../context/AuthContext";
const URL = "./doctor/getPresc";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.5)
  ),
  url("https://img.freepik.com/premium-photo/solar-panels-with-sunny-sky-blue-solar-panels-background-photovoltaic-modules-renewable_661495-341.jpg?w=2000")
    center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 80%;
  padding: 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  margin: 20px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;


const FormControlWrapper = styled(FormControl)`
  width: 100%;
  margin: 10px 0;
`;

const InputLabelWrapper = styled(InputLabel)`
  margin-bottom: 10px;
`;

const SelectWrapper = styled(Select)`
  width: 100%;
`;

const TextFieldWrapper = styled(TextField)`
  width: 100%;
  margin-bottom: 10px;
`;

const ButtonWrapper = styled(Button)`
  width: 10%;
  background-color: teal;
  color: white;
  
  margin-top: -100px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0;
`;

const DataGridWrapper = styled.div`
  width: 100%;
  height: 400px;
`;



const Prescription = () => { //this is the coponent funtion 

    const navigate=useNavigate();
    const { user, Logout, trackgeneration } = useAuthContext();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [gender,setGender]=useState('');
    const [date,setDate]=useState('');
    const [status,setStatus] = useState('');
    const [blood_pressure,setBloodPressure] = useState('');
    const [pulse,setPulse]=useState('');
    const [blood_group,setBloodGroup]=useState('');
    const [height,setHeight]=useState('');
    const [weight,setWeight]=useState('');


    useEffect(() => {
       
        console.log("email" + email);
    });

    const handleSearch = async (e) => {
        e.preventDefault();

        loadData();

        
    };


    const loadData = async () => {
        const method = 'POST';
        try {
            const data = { email };
            const mainURL = URL;
            serviceMethod(mainURL, method, data, handleSuccess, handleException);
        } catch (e) {
            console.error(e);
        }
    };

    const serviceMethod = async (mainURL, method, data, handleSuccess, handleException) => {
        try {
            const response = await axios.post(mainURL, data);
            return handleSuccess(response);
        } catch (err) {
            if (!err?.response) {
                console.log('No server response');
            } else {
                return handleException(err?.response.data);
            }
        }
    };

    const handleSuccess = (response) => {
        console.log(response);
        console.log(response.data.data[0].first_name);

        setName(response.data.data[0].first_name);
        setEmail(response.data.data[0].email);
        setContact(response.data.data[0].contact);
        setGender(response.data.data[0].gender);
        setDate(response.data.data[0].date);
        setStatus(response.data.data[0].status);
        setBloodPressure(response.data.data[0].blood_pressure);
        setPulse(response.data.data[0].pulse);
        setBloodGroup(response.data.data[0].blood_group);
        setHeight(response.data.data[0].height);
        setWeight(response.data.data[0].weight);

    };
    const handleException = (data) => {
        console.log(data);

    };

    const handleWrite=()=>{
        //navigate("/Medicine");
        navigate('/Medicine', { state: { useremail:email }});
    }


    return (
        <>
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 card shadow p-3">
                        <div className="section-title text-left">
                            <div className="row">
                                <div className="col-3">
                                    <h3>
                                        <span>Search</span> Patient
                                    </h3>
                                </div>
                                <div className="col-6">
                                    <div className="search-box">
                                        <form onSubmit={handleSearch}>
                                            <input
                                                className="form-control main"
                                                placeholder="Search Here..."
                                                type="search"
                                                id="search"
                                                name="unid"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                style={{
                                                    width: '80%',
                                                    float: 'left',
                                                    marginRight: '15px',
                                                }}
                                            />
                                            <ButtonWrapper
                                                className="btn-style-one"
                                                type="submit"
                                                value=""
                                                name="submit_search"

                                            >
                                                Search
                                            </ButtonWrapper>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-12 mt-3">
                                    <Box sx={{ p: 1, display: 'flex' }}>
                                        <Grid item xs={12}>
                                            <b>Name:</b> {name} <br />
                                            <b>Email:</b> {email} <br />
                                            <b>Contact Number:</b> {contact} <br />
                                            <b>Gender:</b> {gender} <br />
                                            <b>Date:</b> {date} <br />
                                            <b>Status:</b> {status} <br />
                                            <b>blood_pressure:</b> {blood_pressure} <br />
                                            <b>pulse:</b> {pulse} <br />
                                            <b>blood_group:</b> {blood_group} <br />
                                            <b>height:</b> {height} <br />
                                            <b>weight:</b> {weight} <br />

                                        </Grid>
                                    </Box>
                                    
                                </div>
                                
                            </div>
                            
                        </div>
                        <Grid container spacing={2}>
                                        <Grid item xs={8}>
                                            <ButtonWrapper
                                            className="btn-style-one"
                                            type="submit"
                                            value=""
                                            name="submit_search"
                                            onClick={(e) => { handleWrite(e); trackgeneration(e); }}
                                            >
                                            Write New
                                            </ButtonWrapper>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <ButtonWrapper
                                            className="btn-style-one"
                                            type="submit"
                                            value=""
                                            name="submit_search"
                                            >
                                            Old 
                                            </ButtonWrapper>
                                        </Grid>
                                        </Grid>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Prescription;