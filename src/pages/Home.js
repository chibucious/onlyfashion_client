import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchData } from '../api/apiService';
import { addEllipses, encryptData, replaceQuotationMarks, shuffleArray } from '../utilities/reuseablefunctions_variables';

const Home = () => {

    const [blogPosts, setBlogPosts] = useState(null);
    const [fetchedCategories, setfetchedCategories] = useState(null);
    const [fetchedPagination, setFetchedPagination] = useState([]);
    const endpoint_fetch = '/blog/fetch'; // Replace with your API endpoint
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
          if(result.links){
            setFetchedPagination(result.links);
          }else{
            setFetchedPagination([]);
          }
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
            <section className="banner_post">
                <div className="container-fluid">
                    <div className="row justify-content-between">
                        {!blogPosts ? <div className='container'>Loading...</div> : blogPosts.length<1 ? 
                        <h4 className='container'>No Post Yet</h4> : blogPosts.slice(0, 3).map((blog,index) => (
                            <>
                            {!fetchedCategories ? "Loading Categories..." : (
                                <div key={index} className="banner_post_1 banner_post_bg_1" style={{backgroundImage: `url('${blog.image}')`}}>
                                    <div className="banner_post_iner text-center">
                                        <Link to={`/single-category?name=${getCategoryNameFromID(blog.category)}&category=${blog.category}`}>
                                            <h5> Fashion / {addEllipses(getCategoryNameFromID(blog.category), 30)}</h5>
                                            {/* <h4>{blog.image}</h4> */}
                                        </Link>
                                        <Link to={`/single-blog?post=${encryptData(blog.id,'blogid')}`}>
                                            <h2><strong>{addEllipses(blog.title, 45)}</strong></h2>
                                        </Link>
                                        <p>Posted on {blog.created_at}</p>
                                    </div>
                                </div>
                            )}
                            </>
                            // <div className="banner_post_1 banner_post_bg_1" style={{backgroundImage:'url(https://filesapi.growsel.com/files/ZOWADOC6559e0c37ab56Untitled-1.jpg)'}}>
                            //     <div className="banner_post_iner text-center">
                            //         <Link to="/category">
                            //             <h5> Fashion / Life style</h5>
                            //         </Link>
                            //         <Link to={`/single-blog?post=${encryptData(blog.id,'blogid')}`}>
                            //             <h2>All said replenish years void kind say void </h2>
                            //         </Link>
                            //         <p>Posted on April 15, 2019</p>
                            //     </div>
                            // </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="all_post section_padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="row">

                                {!blogPosts ? "Loading..." : blogPosts.slice(3, 4).map((blog,index) => (
                                    <>
                                    {!fetchedCategories ? "Loading Categories..." : (
                                        <div key={index} className="col-lg-12">
                                            <div className="single_post post_1 feature_post">
                                                <div className="single_post_img" style={{ height: '349.72px' }}>
                                                    <img src={blog.image} alt="Postimg" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                                                </div>
                                                <div className="single_post_text text-center">
                                                    <Link to={`/single-category?name=${getCategoryNameFromID(blog.category)}&category=${blog.category}`}>
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
                                    // <div className="col-lg-12">
                                    //     <div className="single_post post_1 feature_post">
                                    //         <div className="single_post_img">
                                    //             <img src="assets/img/post/post_12.png" alt="Postimg" />
                                    //         </div>
                                    //         <div className="single_post_text text-center">
                                    //             <Link to="/category">
                                    //                 <h5> Fashion / Life style</h5>
                                    //             </Link>
                                    //             <Link to={`/single-blog?post=${encryptData(blog.id,'blogid')}`}>
                                    //                 <h2>All said replenish years void kind say void </h2>
                                    //             </Link>
                                    //             <p>Posted on April 15, 2019</p>
                                    //         </div>
                                    //     </div>
                                    // </div>
                                ))}

                                {!blogPosts ? "Loading..." : blogPosts.slice(4, 11).map((blog,index) => (
                                    <>
                                    {!fetchedCategories ? "Loading Categories..." : (
                                        <div key={index} className="col-lg-6 col-sm-6">
                                            <div className="single_post post_1">
                                                <div className="single_post_img" style={{ height: '263.39px' }}>
                                                    <img src={blog.image} alt="Postimg" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                                                </div>
                                                <div className="single_post_text text-center">
                                                    <Link to={`/single-category?name=${getCategoryNameFromID(blog.category)}&category=${blog.category}`}>
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
                            <div className="page_pageniation">
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination justify-content-center">
                                        {fetchedPagination.map((data, index) => (
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
                        <div className="col-lg-4">
                            <div className="sidebar_widget">
                                {/* <div className="single_sidebar_wiget search_form_widget">
                                    <form action="">
                                    <div className="form-group"><input type="text" className="form-control" placeholder="Search Keyword" />
                                        <div className="btn_1">search</div>
                                    </div>
                                    </form>
                                </div> */}
                                {/* <div className="single_sidebar_wiget">
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
                                </div> */}
                                <div className="single_sidebar_wiget">
                                    <div className="sidebar_tittle">
                                        <h3>Popular Feeds</h3>
                                    </div>
                                    
                                    {!blogPosts ? (
  "Loading..."
) : (
  shuffleArray(blogPosts)
    .slice(0, 3)
    .map((blog, index) => {
      let author = blog.author_details;
      return (
        <div key={index} className="single_catagory_post post_2">
          <div className="category_post_img" style={{ height: '124.2px' }}>
            <img
              src={blog.image}
              alt="Postimg"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'top',
              }}
            />
          </div>
          <div className="post_text_1 pr_30">
            <Link to={`/single-blog?post=${encryptData(blog.id, 'blogid')}`}>
              <h3>{addEllipses(blog.title, 50)}</h3>
            </Link>
            <p>
              <span> By {!author ? "..." : author.username}</span> / March 30
            </p>
          </div>
        </div>
      );
    }))}

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
                            {!blogPosts ? "Loading..." : shuffleArray(blogPosts).slice(0, 6).map((blog,index) => (
                                <div key={index} className="single-social_connect">
                                    <div className="social_connect_img" style={{ height: '200px' }}>
                                        <img src={blog.image} alt="blog" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                                        {/* <div className="social_connect_overlay">
                                            <a href="index.html#">
                                                <span className="ti-instagram"></span>
                                            </a>
                                        </div> */}
                                    </div>
                                </div>
                            ))}
                            {/* <div className="single-social_connect">
                                <div className="social_connect_img"><img src="assets/img/insta/instagram_2.png" alt="blog" />
                                <div className="social_connect_overlay"><a href="index.html#"><span className="ti-instagram"></span></a></div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home