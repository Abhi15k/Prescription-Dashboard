const router =require("express").Router();

const authRouter=require("../Auth/auth.router");
const companyRouter=require("../Company/company.router");
const medicineRouter=require("../Medicine/medicine.router");
const medicalRouter=require("../Medical/medical.router");
const doctorRouter=require("../Doctor/doctor.router");
const stateRouter=require("../State/state.router");
const districtRouter=require("../District/district.router");
const cityRouter=require("../City/city.router");
const userRouter=require("../User/user.router");
const complaintRouter=require("../Complaint/complaint.router");
const presRouter=require("../Prescription/pres.router");
const newpresRouter=require("../AddPresc/add.router");


router.use("/api/auth",authRouter);
router.use("/api/company",companyRouter);
router.use("/api/medicine",medicineRouter);
router.use("/api/medical",medicalRouter);
router.use("/api/doctor",doctorRouter);
router.use("/api/state",stateRouter);
router.use("/api/district",districtRouter);
router.use("/api/city",cityRouter);
router.use("/api/user",userRouter);
router.use("/api/complaint",complaintRouter);
router.use("/api/prescription",presRouter);
router.use("/api/newpresc",newpresRouter);



module.exports=router;