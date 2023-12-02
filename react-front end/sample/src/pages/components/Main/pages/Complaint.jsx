import React, { useState, useEffect } from "react";
import styled from "styled-components";
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
const URL = "./complaint";

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
  width: 100%;
  background-color: teal;
  color: white;
  margin-top: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0;
`;

const DataGridWrapper = styled.div`
  width: 100%;
  height: 400px;
`;



const Complaint = () => {
//   const empid = ApplicationStore().getStorage("empid");
const user_email=ApplicationStore().getStorage("user_email");

  const [complaint_title, setComplaint_title] = useState('');
  const [complaint_description, setComplaint_description] = useState([]);
  const [showDataGridForm, setShowDataGridForm] = useState(false);
  const [feedbacklist, setFeedbacklist] = useState([]);

  const serviceMethod = async (mainURL, method, data, handleSuccess, handleException) => {
    try {
      const response = await axios.post(mainURL, data);
      return handleSuccess(response.data);
    } catch (err) {
      if (!err?.response) {
        console.log("No server response");
      } else {
        return handleException(err?.response.data);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const method = "POST";
    const data = { user_email,complaint_title,complaint_description };
    const mainURL = URL + '/add';
    serviceMethod(mainURL, method, data, handleSuccess, handleException);
    setShowDataGridForm(true);
  };

  useEffect(() => {
    loadData();
    
  }, []);

  
  const loadData = async () => {
    try {
      const response = await axios.get(URL);
      if (response.data.status == 401) {
        setFeedbacklist([]);
      } else {
        setFeedbacklist(response.data.data);
      }
    } catch (err) {
      if (!err?.response) {
        console.log("No server response");
      } else {
        console.log(err?.response.data);
      }
    }
  };
  const handleSuccess = (data) => {
    alert("submitted");
  };

  const handleException = (data) => {
    console.log(data);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "user_email", headerName: "email", width: 130 },
    { field: "complaint_title", headerName: "complaint Title", width: 130 },
    { field: "complaint_description", headerName: "complaint Description", width: 130 },
    { field: "date", headerName: "date", width: 130 },
    { field: "status", headerName: "status", width: 130 },
  ];

  return (
    <>
      <Navbar />
      <Container>
        <Wrapper>
          {showDataGridForm ? (
            <DataGridForm feedbacklist={feedbacklist} columns={columns} />
          ) : (
            <>
              <Title>Your Complaint</Title>
              <Form>
              <TextFieldWrapper
                  id="outlined-multiline-static"
                  label="Complaint Title"
                 
                  value={complaint_title}
                  onChange={(e) => {
                    setComplaint_title(e.target.value);
                  }}
                />
                <TextFieldWrapper
                  id="outlined-multiline-static"
                  label="Complaint Description"
                  multiline
                  rows={4}
                  value={complaint_description}
                  onChange={(e) => {
                    setComplaint_description(e.target.value);
                  }}
                />
                <Agreement>
                  <b></b>
                </Agreement>
                <ButtonWrapper type="submit" onClick={handleSubmit}>
                  SUBMIT
                </ButtonWrapper>
              </Form>
            </>
          )}
        </Wrapper>
      </Container>
    </>
  );
};

const DataGridForm = ({ feedbacklist, columns }) => {
//   if (!feedbacklist || !columns) {
//     return (
//       <DataGridWrapper>
//         <p>Loading...</p>
//       </DataGridWrapper>
//     );
//   }

  return (
    <DataGridWrapper>
      <h3>Your Feedback</h3>
      <DataGrid rows={feedbacklist} columns={columns} pageSize={5} />
    </DataGridWrapper>
  );
};

export default Complaint;
