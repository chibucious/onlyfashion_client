import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchData } from '../api/apiService';
import { encryptData } from '../utilities/reuseablefunctions_variables';

const Category = () => {

    const [fetchedCategories, setfetchedCategories] = useState(null);
    const [fetchedPagination, setFetchedPagination] = useState([]);

    const endpoint_categories = '/category/fetch';

    useEffect(() => {
        fetchCategoryAsync();
    }, []);

    const fetchCategoryAsync = async () => {
        try {
          const result = await fetchData(endpoint_categories);
          console.log("Categories ", result);
          setfetchedCategories(result.data);
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
                        <h2>Category</h2>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="breadcrumb_content text-right">
                        <p>Home<span>/</span>Category</p>
                        </div>
                    </div>
                    </div>
                </div>
            </section>

            <section className="all_post section_padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="sidebar_widget">
                                {/* <div className="single_sidebar_wiget search_form_widget">
                                    <form action="index.html#">
                                        <div className="form-group"><input type="text" className="form-control" placeholder="Search Keyword" />
                                            <div className="btn_1">search</div>
                                        </div>
                                    </form>
                                </div> */}
                                <div className="single_sidebar_wiget">
                                    <div className="sidebar_tittle">
                                    <h3>Categories</h3>
                                    </div>
                                    <div className="single_catagory_item category">
                                    <ul className="list-unstyled">
                                        {!fetchedCategories ? "Loading..." : fetchedCategories.map((data, index) => (
                                            <li key={index}><Link to={`/single-category?name=${data.name}&category=${encryptData(data.id,'categoryid')}`}>{data.name}</Link><span>({data.blog_count})</span></li>
                                            // <li><a href="category.html">Culture</a><span>(15)</span></li>
                                        ))}
                                    </ul>
                                    </div>
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
                            <div className="social_connect_overlay"><Link to=""><span className="ti-instagram"></span></Link></div>
                            </div>
                        </div>
                        <div className="single-social_connect">
                            <div className="social_connect_img"><img src="assets/img/insta/instagram_2.png" alt="blog" />
                            <div className="social_connect_overlay"><Link to=""><span className="ti-instagram"></span></Link></div>
                            </div>
                        </div>
                        <div className="single-social_connect">
                            <div className="social_connect_img"><img src="assets/img/insta/instagram_3.png" alt="blog" />
                            <div className="social_connect_overlay"><Link to=""><span className="ti-instagram"></span></Link></div>
                            </div>
                        </div>
                        <div className="single-social_connect">
                            <div className="social_connect_img"><img src="assets/img/insta/instagram_4.png" alt="blog" />
                            <div className="social_connect_overlay"><Link to=""><span className="ti-instagram"></span></Link></div>
                            </div>
                        </div>
                        <div className="single-social_connect">
                            <div className="social_connect_img"><img src="assets/img/insta/instagram_5.png" alt="blog" />
                            <div className="social_connect_overlay"><Link to=""><span className="ti-instagram"></span></Link></div>
                            </div>
                        </div>
                        <div className="single-social_connect">
                            <div className="social_connect_img"><img src="assets/img/insta/instagram_6.png" alt="blog" />
                            <div className="social_connect_overlay"><Link to=""><span className="ti-instagram"></span></Link></div>
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

export default Category