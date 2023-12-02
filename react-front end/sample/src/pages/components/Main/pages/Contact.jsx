import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

function Contact(){
return(
    <>
    <Navbar />
    <section class="section contact">
    <div class="container">
        <div class="row">
            <div class="col-md-4">
                <div class="address-block">
                    <div class="media">
                        <i class="fa fa-map-o"></i>
                        <div class="media-body">
                            <h3>Location</h3>
                            <p>St Philomena College, Putturg</p>
                        </div>
                    </div>
                    <div class="media">
                        <i class="fa fa-phone"></i>
                        <div class="media-body">
                            <h3>Phone</h3>
                            <p>
                                +91 7337817188
                                +91 9902669094
                            </p>
                        </div>
                    </div>
                    <div class="media">
                        <i class="fa fa-envelope-o"></i>
                        <div class="media-body">
                            <h3>Email</h3>
                            <p>
                                suramyarai2002@gmail.com
                                veekshajm@gmail.com
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-8">
            <section class="map">
    <div id="map"></div>
</section>
            </div>
        </div>
    </div>
</section>
</>
)
}
export default Contact;