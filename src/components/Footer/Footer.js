import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCurrentYear } from '../../utilities/reuseablefunctions_variables'
import { fetchData } from '../../api/apiService';

const Footer = () => {

    const [fetchedSiteDetails, setfetchedSiteDetails] = useState(null);
    const [fetchedSocialMedias, setfetchedSocialMedias] = useState(null);

    const endpoint_sitedetails = '/sitedetails/fetch';
    const endpoint_socialmedias = '/socialmedia/fetch';

    useEffect(() => {
        fetchSiteDetailsAsync();
        fetchSocialMediasAsync();
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

    const fetchSocialMediasAsync = async () => {
        try {
          const result = await fetchData(endpoint_socialmedias);
          console.log("Social Medias ", result);
          setfetchedSocialMedias(result.data);
        } catch (error) {
          console.error('Error:', error.message);
        }
    };


    return (
        <footer className="footer-area">
            <div className="container">
                <div className="row">
                    <div className="col-xl-4 col-lg-4 col-sm-6 mb-4 mb-xl-0 single-footer-widget">
                    <h4>about us</h4>
                    <p>We are your one-stop destination for the latest trends, curated collections, and fashion inspiration. Discover, express, and elevate your style with OnlyFashion.</p>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-sm-6 mb-4 mb-xl-0 single-footer-widget">
                    <h4>Contact Info</h4>
                    <ul>
                        <li>
                            <p>Address : {!fetchedSiteDetails ? "Loading..." : fetchedSiteDetails.primary_address}</p>
                            </li>
                            <li>
                            <p>Phone : {!fetchedSiteDetails ? "Loading..." : fetchedSiteDetails.phone}</p>
                            </li>
                            <li>
                            <p>Email :&nbsp;
                            {!fetchedSiteDetails ? (
                                "Loading..."
                                ) : (
                                <a href={`mailto:${fetchedSiteDetails.email}`}>{fetchedSiteDetails.email}</a>
                            )}

                            </p>
                        </li>
                    </ul>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-sm-6 mb-4 mb-xl-0 single-footer-widget">
                    <h4>Important Link</h4>
                    <ul>
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/category">Category</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                    </div>
                    {/* <div className="col-xl-3 col-lg-6 col-sm-6 mb-4 mb-xl-0 single-footer-widget">
                        <div className="form-wrap" id="mc_embed_signup">
                            <form target="_blank" action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&amp;id=92a4423d01" method="get" className="form-inline">
                                <input className="form-control" name="EMAIL" placeholder="Your Email Address"/>
                                <button className="click-btn btn btn-default text-uppercase"><i className="ti-arrow-right"></i></button>
                                <div style={{position:"absolute", left: "-5000px"}}>
                                    <input name="b_36c4fd991d266f23781ded980_aefe40901a" tabIndex="-1" value type="text" />
                                </div>
                                <div className="info"></div>
                            </form>
                        </div>
                    </div> */}
                </div>
                <div className="copyright_text">
                    <div className="row align-items-center">
                    <div className="col-lg-8">
                        <div className="copyright_part">
                        <p className="footer-text m-0">Copyright © {getCurrentYear()} All rights reserved <span className="px-2">
                            |</span> Onlyfashion
                            {/* This template is Made with <a href="https://colorlib.com"><i className="ti-heart"></i></a> by <a href="https://colorlib.com">Colorlib</a> */}
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-4 text-center text-lg-right">
                        <div className="footer-social">
                        {
                            !fetchedSocialMedias ? "Loading..." : (
                                <>
                                <Link to={`https://facebook.com/${fetchedSocialMedias[0].handle.slice(1)}`} target='_blank'><i className="ti-facebook"></i></Link>
                                <Link to={`https://twitter.com/${fetchedSocialMedias[2].handle.slice(1)}`} target='_blank'><i className="ti-twitter"></i></Link>
                                <Link to={`https://www.instagram.com/${fetchedSocialMedias[5].handle.slice(1)}`} target='_blank'><i className="ti-instagram"></i></Link>
                                <Link to={`https://www.youtube.com/${fetchedSocialMedias[1].handle.slice(1)}`} target='_blank'><i className="ti-youtube"></i></Link>
                                </>
                            )
                        }

                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer