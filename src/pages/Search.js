import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchData } from '../api/apiService';
import { addEllipses, encryptData, replaceQuotationMarks, shuffleArray } from '../utilities/reuseablefunctions_variables';

const Search = () => {

    const params = new URLSearchParams(window.location.search);
    const searchterm = params.get('search');

    const [blogPosts, setBlogPosts] = useState(null);
    const [fetchedCategories, setfetchedCategories] = useState(null);
    const [fetchedPagination, setFetchedPagination] = useState([]);
    const endpoint_fetch = '/blog/fetch?search='+searchterm+"&perpage=10"; // Replace with your API endpoint
    const endpoint_categories = '/category/fetch';

    useEffect(() => {
        fetchCategoryAsync();
        fetchBlogAsync();
    }, []);

    const fetchBlogAsync = async (paginationRoute) => {
        try {
        //   const result = await fetchData(!paginationRoute ? endpoint : paginationRoute+"&perpage=2");
          const result = await fetchData(!paginationRoute ? endpoint_fetch : paginationRoute);
          console.log("Blog Posts ", result);
          setBlogPosts(result.data);
          setFetchedPagination(result.links);
        } catch (error) {
          console.error('Error:', error.message);
        }
    };

    const fetchCategoryAsync = async () => {
        try {
          const result = await fetchData(endpoint_categories);
          console.log("Categories ", result);
          setfetchedCategories(result.data);
        } catch (error) {
          console.error('Error:', error.message);
        }
    };

    // RETRIEVE CATEGORY NAME WITH THE HELP OF category id USING THE FETCHCATEGORIES MAPPED API DATA
    const getCategoryNameFromID = (categoryID) => {
        const category = fetchedCategories.find(category => category.id === categoryID);
        console.log(category)
        return category ? category.name : 'Unknown Category';
    };
    // RETRIEVE CATEGORY NAME WITH THE HELP OF category id USING THE FETCHCATEGORIES MAPPED API DATA

    return (
        <>
            <section className="all_post">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className='col row'>
                                <h2>Search term: <span style={{color:'#fc4600'}}>{!searchterm ? "Loading..." : '"'+searchterm+'"'}</span></h2>
                            </div>
                            <div className="col row">

                                {!blogPosts ? "Loading..." : blogPosts.length===0 ? "No found data" : blogPosts.map((blog,index) => (
                                    <>
                                    {!fetchedCategories ? "Loading Categories..." : (
                                        <div key={index} className="col-lg-4 col-sm-6">
                                            <div className="single_post post_1">
                                                <div className="single_post_img" style={{ height: '263.39px' }}>
                                                    <img src={blog.image} alt="Postimg" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                                                </div>
                                                <div className="single_post_text text-center">
                                                    <Link to="/category">
                                                        <h5> Fashion / {getCategoryNameFromID(blog.category)}</h5>
                                                    </Link>
                                                    <Link to={`/single-blog?post=${encryptData(blog.id,'blogid')}`}>
                                                        <h2>{blog.title}</h2>
                                                    </Link>
                                                    <p>Posted on {blog.created_at}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    </>
                                ))}

                            </div>

                            <div className="page_pageniation mb-4">
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination justify-content-center">
                                        {!fetchedPagination ? "" : fetchedPagination.map((data, index) => (
                                            <li key={index} onClick={()=>fetchBlogAsync(data.url)} className={`page-item 
                                            ${data.active ? 'active':'disabled'}`}>
                                                <Link className="page-link">
                                                    {replaceQuotationMarks(data.label).trim()}
                                                </Link>
                                            </li>
                                            // <li className="page-item"><a className="page-link" href="index.html#">1</a></li>
                                            // <li className="page-item"><a className="page-link" href="index.html#">2</a></li>
                                            // <li className="page-item"><a className="page-link" href="index.html#">3</a></li>
                                            // <li className="page-item"><a className="page-link" href="index.html#">Next</a></li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Search