import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchData } from '../../api/apiService';

const Header = () => {

    const [fetchedSocialMedias, setfetchedSocialMedias] = useState(null);

    const endpoint_socialmedias = '/socialmedia/fetch';

    useEffect(() => {
        fetchSocialMediasAsync();
    }, []);

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
        <header className="main_menu">
        <div className="container">
            <div className="row align-items-center">
            <div className="col-lg-12">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <Link className="navbar-brand" to="/home">
                        <img src="../assets/img/onlyfashionlogo2.png" alt="logo" width={120} height={70} />
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse main-menu-item justify-content-center" id="navbarSupportedContent">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/category"> Category</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">Contact</Link>
                            </li>
                            {/* <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Pages </Link>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link className="dropdown-item" to="/single-blog">Single blog</Link>
                                </div>
                            </li> */}
                        </ul>
                    </div>
                    <div className="header_social_icon d-none d-lg-block">
                        <ul>
                            <li>
                                <div id="wrap">
                                    <form action="/search" autoComplete="on">
                                        <input id="search" name="search" type="text" placeholder="Search here" />
                                        <span className="ti-search"></span>
                                    </form>
                                </div>
                            </li>
                            {
                                !fetchedSocialMedias ? "Loading..." : (
                                    <>
                                    <li><Link to={`https://facebook.com/${fetchedSocialMedias[0].handle.slice(1)}`} target='_blank' className="d-none d-lg-block"><i className="ti-facebook"></i></Link></li>
                                    <li><Link to={`https://twitter.com/${fetchedSocialMedias[2].handle.slice(1)}`} target='_blank' className="d-none d-lg-block"><i className="ti-twitter-alt"></i></Link></li>
                                    <li><Link to={`https://www.instagram.com/${fetchedSocialMedias[5].handle.slice(1)}`} target='_blank' className="d-none d-lg-block"><i className="ti-instagram"></i></Link></li>
                                    <li><Link to={`https://www.youtube.com/${fetchedSocialMedias[1].handle.slice(1)}`} target='_blank' className="d-none d-lg-block"><i className="ti-youtube"></i></Link></li>
                                    </>
                                )
                            }

                        </ul>
                    </div>
                </nav>
            </div>
            </div>
        </div>
        </header>
    )
}

export default Header