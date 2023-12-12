import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchData } from '../api/apiService';

const Contact = () => {

    const [fetchedSiteDetails, setfetchedSiteDetails] = useState(null);

    const endpoint_sitedetails = '/sitedetails/fetch';

    useEffect(() => {
        fetchSiteDetailsAsync();
    }, []);

    const fetchSiteDetailsAsync = async () => {
        try {
          const result = await fetchData(endpoint_sitedetails);
          console.log("Site Details ", result);
          setfetchedSiteDetails(result.data[0]);
        } catch (error) {
          console.error('Error:', error.message);
        }
    };

    return (
        <>
            <section class="breadcrumb breadcrumb_bg align-items-center">
                <div class="container">
                    <div class="row align-items-center justify-content-between">
                    <div class="col-sm-6">
                        <div class="breadcrumb_tittle text-left">
                        <h2>Contact Us</h2>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="breadcrumb_content text-right">
                        <p>Home<span>/</span>Contact Us</p>
                        </div>
                    </div>
                    </div>
                </div>
            </section>

            <section className="contact-section section_padding">
                <div className="container">
                    <div class="row">
                        <div class="col-12">
                            <h2 class="contact-title">Get in Touch</h2>
                        </div>
                        <div class="col-lg-8">
                            <form class="form-contact contact_form" method="post" id="contactForm" novalidate="novalidate">
                            <div class="row">
                            <div class="col-12">
                            <div class="form-group">
                            <textarea class="form-control w-100" name="message" id="message" cols="30" rows="9"placeholder="Enter Message"></textarea>
                            </div>
                            </div>
                            <div class="col-sm-6">
                            <div class="form-group">
                            <input class="form-control" name="name" id="name" type="text" placeholder="Enter your name" />
                            </div>
                            </div>
                            <div class="col-sm-6">
                            <div class="form-group">
                            <input class="form-control" name="email" id="email" type="email" placeholder="Enter email address" />
                            </div>
                            </div>
                            <div class="col-12">
                            <div class="form-group">
                            <input class="form-control" name="subject" id="subject" type="text" placeholder="Enter Subject" />
                            </div>
                            </div>
                            </div>
                            <div class="load_btn">
                            <Link class="btn_1">Send Message </Link>
                            </div>
                            </form>
                        </div>

                        <div class="col-lg-4">
                            <div class="media contact-info">
                                <span class="contact-info__icon"><i class="ti-home"></i></span>
                                <div class="media-body">
                                    <h3>{!fetchedSiteDetails ? "Loading..." : fetchedSiteDetails.primary_address}</h3>
                                    <p>{!fetchedSiteDetails ? "Loading..." : fetchedSiteDetails.state_country}</p>
                                </div>
                            </div>
                            <div class="media contact-info">
                                <span class="contact-info__icon"><i class="ti-tablet"></i></span>
                                <div class="media-body">
                                    <h3>{!fetchedSiteDetails ? "Loading..." : fetchedSiteDetails.phone}</h3>
                                    <p>{!fetchedSiteDetails ? "Loading..." : fetchedSiteDetails.work_hours}</p>
                                </div>
                            </div>
                            <div class="media contact-info">
                                <span class="contact-info__icon"><i class="ti-email"></i></span>
                                <div class="media-body">
                                    <h3>
                                    {!fetchedSiteDetails ? (
                                        "Loading..."
                                        ) : (
                                        <a href={`mailto:${fetchedSiteDetails.phone}`}>{fetchedSiteDetails.phone}</a>
                                    )}
                                    </h3>
                                    <p>Send us your query anytime!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="social_connect_part">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="social_connect">
                            <div className="single-social_connect">
                                <div className="social_connect_img"><img src="assets/img/insta/instagram_1.png" alt="blog" />
                                <div className="social_connect_overlay">
                                    {/* <Link to=""><span className="ti-instagram"></span></Link> */}
                                </div>
                                </div>
                            </div>
                            <div className="single-social_connect">
                                <div className="social_connect_img"><img src="assets/img/insta/instagram_2.png" alt="blog" />
                                <div className="social_connect_overlay">
                                    {/* <Link to=""><span className="ti-instagram"></span></Link> */}
                                </div>
                                </div>
                            </div>
                            <div className="single-social_connect">
                                <div className="social_connect_img"><img src="assets/img/insta/instagram_3.png" alt="blog" />
                                <div className="social_connect_overlay">
                                    {/* <Link to=""><span className="ti-instagram"></span></Link> */}
                                </div>
                                </div>
                            </div>
                            <div className="single-social_connect">
                                <div className="social_connect_img"><img src="assets/img/insta/instagram_4.png" alt="blog" />
                                <div className="social_connect_overlay">
                                    {/* <Link to=""><span className="ti-instagram"></span></Link> */}
                                </div>
                                </div>
                            </div>
                            <div className="single-social_connect">
                                <div className="social_connect_img"><img src="assets/img/insta/instagram_5.png" alt="blog" />
                                <div className="social_connect_overlay">
                                    {/* <Link to=""><span className="ti-instagram"></span></Link> */}
                                </div>
                                </div>
                            </div>
                            <div className="single-social_connect">
                                <div className="social_connect_img"><img src="assets/img/insta/instagram_6.png" alt="blog" />
                                <div className="social_connect_overlay">
                                    {/* <Link to=""><span className="ti-instagram"></span></Link> */}
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Contact