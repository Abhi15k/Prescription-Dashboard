import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

function About(){
return(
    <>
    <Navbar />
<section class="story">
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                {/* <img src="images/services/service-one.jpg" class="responsive" alt="story"> */}
            </div>
            <div class="col-md-6">
                <div class="story-content">
                    <h2>Our Story</h2>
                    <p>Medicare is a web application in which the patients need not have to carry the Prescription given by the doctors with them to the pharmacy store. In this project Patients, Doctors and Pharmacy is brought together in one platform. Medicare is to automate the process of saving and retrieving information of Patients, Drugs and Bill Payments. The application helps Pharmacists to provide prescription for the patients and keep track of the revisits and maintaining the history of the same.</p>
                    <h6>Mission</h6>
                    <p>To enchance the quality and effectiveness of health care by fostering excellence and professionalism in the practice of medicine.</p>
                    <h6>Vision</h6>
                    <p>To be recognized globally as the leader in promoting quality patient care, advocacy, education and career fulfillment in internal medicine and its subspecialtiens.</p>
                </div>
            </div>
        </div>
    </div>
</section>
</>
)
}
export default About;