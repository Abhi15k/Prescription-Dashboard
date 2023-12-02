import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/components/Login/Login';
import Registration from './pages/components/Login/Registration';
import ProtectedRoutes from './protectedRoutes';
import ChangePassword from './pages/components/Login/ChangePassword';
import AddCategory from './pages/components/Admin/ManageCategory/AddCategory';
import AddItem from './pages/components/Admin/ManageItem/AddItem';
import ProtectedDoctorRoutes from './protectedDoctorRoutes';
import AddStudent from './pages/components/Admin/ManageStudent/AddStudent';
import ViewStudent from './pages/components/Admin/ManageStudent/ViewStudent';
import ViewItem from './pages/components/Admin/ManageItem/ViewItem';
import ViewCategory from './pages/components/Admin/ManageCategory/ViewCategory';
import ViewRecharge from './pages/components/Admin/ManageRecharge/ViewRecharge';
import ViewOrders from './pages/components/Admin/ManageOrders/ViewOrders';
import ViewDetailOrder from './pages/components/Admin/ManageOrders/ViewDetailOrder';
import ViewPayment from './pages/components/Admin/ManagePayment/ViewPayment';
import Home from './pages/components/Main/pages/Home';
import Cart from './pages/components/Main/pages/Cart';
import ProductInfo from './pages/components/Main/pages/ProductInfo';
import Feedback from './pages/components/Main/pages/Feedback';
import Payment from './pages/components/Main/pages/Payment';
import Service from './pages/components/Main/pages/Service';
import Checkout from './pages/components/Main/pages/Checkout';
import ProductList from './pages/components/Main/pages/ProductList';
import HomeStudent from './pages/components/Home/HomeStudent';
import HomeAdmin from './pages/components/Home/HomeAdmin';
import AddCompany from './pages/components/Admin/ManageCompany/AddCompany';
import ViewCompany from './pages/components/Admin/ManageCompany/ViewCompany';
import AddMedicine from './pages/components/Admin/ManageMedicine/AddMedicine';
import ViewMedicine from './pages/components/Admin/ManageMedicine/ViewMedicine';
import AddPharmacy from './pages/components/Admin/ManagePharmacy/AddPharmacy';
import ViewPharmacy from './pages/components/Admin/ManagePharmacy/ViewPharmacy';
import AddDoctor from './pages/components/Admin/ManageDoctor/AddDoctor';
import ViewDoctor from './pages/components/Admin/ManageDoctor/ViewDoctor';
import AddCity from './pages/components/Admin/ManageAddress/ManageCity/AddCity';
import ViewCity from './pages/components/Admin/ManageAddress/ManageCity/ViewCity';
import AddState from './pages/components/Admin/ManageAddress/ManageState/AddState';
import ViewState from './pages/components/Admin/ManageAddress/ManageState/ViewState';
import AddDistrict from './pages/components/Admin/ManageAddress/ManageDistrict/AddDistrict';
import ViewDistrict from './pages/components/Admin/ManageAddress/ManageDistrict/ViewDistrict';
import ViewUser from './pages/components/Admin/ManageUser/ViewUser';
import ViewComplaint from './pages/components/Admin/ManageComplaint/ViewComplaint';
import Complaint from './pages/components/Main/pages/Complaint';
import Patient from './pages/components/Main/pages/Patient';
import Prescription from './pages/components/Main/pages/Prescription';
import Medicine from './pages/components/Main/pages/Medicine';
import MedicalPrescription from './pages/components/Main/pages/MedicalPrescription';
import Setting from './pages/components/Main/pages/Setting';
import About from './pages/components/Main/pages/About';
import Contact from './pages/components/Main/pages/Contact';
import UserPresc from './pages/components/Main/pages/UserPresc';

const MainRoutes = () => {
    return (
        <Routes>
          <Route path="/login" element={ <Login />} />
          <Route path="/Registration" element={ <Registration />} /> 
          <Route element={<ProtectedRoutes/>}>
            <Route path="/" element={<HomeAdmin/>}> 
              <Route path="/AddCompany" element={<AddCompany/>}/>
               <Route path="/ViewCompany" element={<ViewCompany/>}/> 
               <Route path="/AddMedicine" element={<AddMedicine/>}/>
               <Route path="/ViewMedicine" element={<ViewMedicine/>}/>
               <Route path="/AddPharmacy" element={<AddPharmacy/>}/>
               <Route path="/ViewPharmacy" element={<ViewPharmacy/>}/>
               <Route path="/AddDoctor" element={<AddDoctor/>}/>
               <Route path="/ViewDoctor" element={<ViewDoctor/>}/>
               <Route path="/AddCity" element={<AddCity/>}/>
               <Route path="/ViewCity" element={<ViewCity/>}/>
              <Route path="/AddDistrict" element={<AddDistrict/>}/>
              <Route path="/ViewDistrict" element={<ViewDistrict/>}/>
              <Route path="/AddState" element={<AddState/>}/>
              <Route path="/ViewState" element={<ViewState/>}/>
              <Route path="/ViewUser" element={<ViewUser/>}/>
              <Route path="/ViewComplaint" element={<ViewComplaint/>}/>
              <Route path="/ChangePassword" element={<ChangePassword/>}/>
            </Route>
          </Route>
          <Route element={<ProtectedDoctorRoutes/>}>
          <Route path="/" element={<HomeStudent/>}/>
                  <Route path="/CustHome" element={<Home />} />
                  <Route path="/Cart" element={<Cart />} />
                  <Route path="/Product" element={<ProductInfo />} />
                  <Route path="/ProductList" element={<ProductList />} />
                  <Route path="/Feedback" element={<Feedback />} />
                  <Route path="/Payment" element={<Payment />} />
                  <Route path="/Service" element={<Service/>}/>
                  <Route path="/Checkout" element={<Checkout/>}/>
                  <Route path="/Complaint" element={<Complaint/>}/>
                  <Route path="/Patient" element={<Patient/>}/>
                  <Route path="/Prescription" element={<Prescription/>}/>
                  <Route path="/Medicine" element={<Medicine/>}/>
                  <Route path="/MedicalPrescription" element={<MedicalPrescription/>}/>
                  <Route path="/Setting" element={<Setting/>}/>
                  <Route path="/About" element={<About/>}/>
                  <Route path="/Contact" element={<Contact/>}/>
                  <Route path="/UserPresc" element={<UserPresc/>}/>


        </Route>
          

        </Routes>
    ); 
}

export default MainRoutes;
