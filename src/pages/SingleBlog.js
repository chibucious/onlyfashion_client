// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
import React, { useEffect, useState } from 'react'
import { decryptData, encryptData, shuffleArray } from '../utilities/reuseablefunctions_variables';
import { fetchData } from '../api/apiService';
import { Link } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const SingleBlog = () => {

    const params = new URLSearchParams(window.location.search);
    const encryptedBlogID = params.get('post');

    const decryptedBlogID = decryptData(encryptedBlogID, 'blogid')

    const [singleBlogPosts, setSingleBlogPosts] = useState(null);
    const [blogPosts, setBlogPosts] = useState(null);
    const [fetchedCategories, setfetchedCategories] = useState(null);

    const endpoint_fetch = '/blog/fetch?id='+decryptedBlogID; // Replace with your API endpoint
    const endpoint_categories = '/category/fetch';
    const endpoint_fetch_all = '/blog/fetch';

    useEffect(() => {
        fetchCategoryAsync();
        fetchSingleBlogAsync();
        fetchBlogAsync();
    }, []);

    const fetchSingleBlogAsync = async () => {
        try {
          const result = await fetchData(endpoint_fetch);
          console.log("Single Blog Posts ", result);
          setSingleBlogPosts(result.data);
        } catch (error) {
          console.error('Error:', error.message);
        }
    };
    

    const fetchSingleBlogAsyncTimeOut = async () => {
        setTimeout(async()=>{
            const paramsReload = new URLSearchParams(window.location.search);
            const encryptedBlogIDReload = paramsReload.get('post');

            const decryptedBlogIDReload = decryptData(encryptedBlogIDReload, 'blogid')
            try {
                const result = await fetchData('/blog/fetch?id='+decryptedBlogIDReload);
                console.log("Single Blog Posts ", result);
                setSingleBlogPosts(result.data);
            } catch (error) {
                console.error('Error:', error.message);
            }
        },500)
    };

    const createMarkup = (content) => {
        return { __html: content };
      };


    const fetchBlogAsync = async (paginationRoute) => {
        try {
        //   const result = await fetchData(!paginationRoute ? endpoint : paginationRoute+"&perpage=2");
          const result = await fetchData(!paginationRoute ? endpoint_fetch_all : paginationRoute);
          console.log("Blog Posts ", result);
          setBlogPosts(result.data);

          
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
            <section class="blog_area single-post-area all_post">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-8 posts-list">
                            {!singleBlogPosts ? "Loading..." : (
                            <>
                                <div class="single-post">
                                    <div class="feature-img" >
                                        <img class="img-fluid" src={singleBlogPosts.image} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} alt="Bimg" />
                                    </div>
                                    <div class="blog_details">
                                        <h2>{singleBlogPosts.title} </h2>
                                        <ul class="blog-info-link mt-3 mb-4">
                                            <li><i class="far fa-user"></i> {getCategoryNameFromID(singleBlogPosts.category)}</li>
                                            {/* <li><Link><i class="far fa-comments"></i> 03 Comments</Link></li> */}
                                        </ul>

                                        <div>
                                            {/* Display the content outside the CKEditor */}
                                            {/* <CKEditor editor={ClassicEditor} data={singleBlogPosts.description}  /> */}
                                            <div dangerouslySetInnerHTML={createMarkup(singleBlogPosts.description)} />
                                        </div>
                                    </div>
                                </div>
                                {/* <div class="navigation-top">
                                    <div class="d-sm-flex justify-content-between text-center">
                                        <p class="like-info"><span class="align-middle"><i class="far fa-heart"></i></span> Lily and 4 people like this</p>
                                        <div class="col-sm-4 text-center my-2 my-sm-0"></div>
                                        <ul class="social-icons">
                                        <li><a href="single-blog.html#"><i class="fab fa-facebook-f"></i></a></li>
                                        <li><a href="single-blog.html#"><i class="fab fa-twitter"></i></a></li>
                                        <li><a href="single-blog.html#"><i class="fab fa-dribbble"></i></a></li>
                                        <li><a href="single-blog.html#"><i class="fab fa-behance"></i></a></li>
                                        </ul>
                                    </div>
                                    <div class="navigation-area">
                                        <div class="row">
                                            <div class="col-lg-6 col-md-6 col-12 nav-left flex-row d-flex justify-content-start align-items-center">
                                                <div class="thumb"><a href="single-blog.html#">
                                                    <img class="img-fluid" src="assets/img/post/preview.png" alt="Bimg" /></a>
                                                </div>
                                                <div class="arrow"><a href="single-blog.html#"><span class="text-white ti-arrow-left"></span></a></div>
                                                <div class="detials">
                                                <p>Prev Post</p><a href="single-blog.html#">
                                                    <h4>Space The Final Frontier</h4>
                                                </a>
                                                </div>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-12 nav-right flex-row d-flex justify-content-end align-items-center">
                                                <div class="detials">
                                                <p>Next Post</p><a href="single-blog.html#">
                                                    <h4>Telescopes 101</h4>
                                                </a>
                                                </div>
                                                <div class="arrow"><a href="single-blog.html#"><span class="text-white ti-arrow-right"></span></a></div>
                                                <div class="thumb"><a href="single-blog.html#"><img class="img-fluid" src="assets/img/post/next.png" alt="Bimg" /></a></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="blog-author">
                                    <div class="media align-items-center"><img src="assets/img/blog/author.png" alt="Bimg" />
                                        <div class="media-body"><a href="single-blog.html#">
                                            <h4>Harvard milan</h4>
                                        </a>
                                        <p>Second divided from form fish beast made. Every of seas all gathered use saying you're, he our dominion twon Second divided from</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="comments-area">
                                    <h4>05 Comments</h4>
                                    <div class="comment-list">
                                        <div class="single-comment justify-content-between d-flex">
                                        <div class="user justify-content-between d-flex">
                                            <div class="thumb"><img src="assets/img/comment/comment_1.png" alt="Bimg" />
                                        </div>
                                            <div class="desc">
                                            <p class="comment"> Multiply sea night grass fourth day sea lesser rule open subdue female fill which them Blessed, give fill lesser bearing multiply sea night grass fourth day sea lesser </p>
                                            <div class="d-flex justify-content-between">
                                                <div class="d-flex align-items-center">
                                                <h5><a href="single-blog.html#">Emilly Blunt</a></h5>
                                                <p class="date">December 4, 2017 at 3:12 pm </p>
                                                </div>
                                                <div class="reply-btn"><a href="single-blog.html#" class="btn-reply text-uppercase">reply</a></div>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div class="comment-list">
                                        <div class="single-comment justify-content-between d-flex">
                                        <div class="user justify-content-between d-flex">
                                            <div class="thumb"><img src="assets/img/comment/comment_2.png" alt="Bimg" />
                                        </div>
                                            <div class="desc">
                                            <p class="comment"> Multiply sea night grass fourth day sea lesser rule open subdue female fill which them Blessed, give fill lesser bearing multiply sea night grass fourth day sea lesser </p>
                                            <div class="d-flex justify-content-between">
                                                <div class="d-flex align-items-center">
                                                <h5><a href="single-blog.html#">Emilly Blunt</a></h5>
                                                <p class="date">December 4, 2017 at 3:12 pm </p>
                                                </div>
                                                <div class="reply-btn"><a href="single-blog.html#" class="btn-reply text-uppercase">reply</a></div>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div class="comment-list">
                                        <div class="single-comment justify-content-between d-flex">
                                        <div class="user justify-content-between d-flex">
                                            <div class="thumb"><img src="assets/img/comment/comment_3.png" alt="Bimg" />
                                        </div>
                                            <div class="desc">
                                            <p class="comment"> Multiply sea night grass fourth day sea lesser rule open subdue female fill which them Blessed, give fill lesser bearing multiply sea night grass fourth day sea lesser </p>
                                            <div class="d-flex justify-content-between">
                                                <div class="d-flex align-items-center">
                                                <h5><a href="single-blog.html#">Emilly Blunt</a></h5>
                                                <p class="date">December 4, 2017 at 3:12 pm </p>
                                                </div>
                                                <div class="reply-btn"><a href="single-blog.html#" class="btn-reply text-uppercase">reply</a></div>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="comment-form">
                                    <h4>Leave a Reply</h4>
                                    <form class="form-contact comment_form" action="single-blog.html#" id="commentForm">
                                        <div class="row">
                                        <div class="col-12">
                                            <div class="form-group"><textarea class="form-control w-100" name="comment" id="comment" cols="30" rows="9" placeholder="Write Comment"></textarea></div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <input class="form-control" name="name" id="name" type="text" placeholder="Name" />
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <input class="form-control" name="email" id="email" type="email" placeholder="Email" />
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="form-group">
                                                <input class="form-control" name="website" id="website" type="text" placeholder="Website" />
                                            </div>
                                        </div>
                                        </div>
                                        <div class="load_btn"><a href="single-blog.html#" class="btn_1">SUBMIT </a></div>
                                    </form>
                                </div> */}
                            </>
                            )}
                        </div>
                        <div class="col-lg-4">
                            <div class="sidebar_widget">
                                <div class="single_sidebar_wiget search_form_widget">
                                    <form action="single-blog.html#">
                                    <div class="form-group">
                                        <input type="text" class="form-control" placeholder="Search Keyword" />
                                        <div class="btn_1">search</div>
                                    </div>
                                    </form>
                                </div>
                                
                                <div className="single_sidebar_wiget">
                                    <div className="sidebar_tittle">
                                    <h3>Categories</h3>
                                    </div>
                                    <div className="single_catagory_item category">
                                    {!fetchedCategories ? "Loading..." : 
                                        <ul className="list-unstyled">
                                            {fetchedCategories.map((data, index) => (
                                                <li key={index}><Link to={`/single-category?name=${data.name}&category=${encryptData(data.id,'categoryid')}`}>{data.name}</Link><span>({data.blog_count})</span></li>
                                                // <li><a href="category.html">Culture</a><span>(15)</span></li>
                                            ))}
                                        </ul>
                                    }
                                    </div>
                                </div>
                                <div className="single_sidebar_wiget">
                                    <div className="sidebar_tittle">
                                        <h3>Popular Feeds</h3>
                                    </div>
                                    
                                    {!blogPosts ? "Loading..." : shuffleArray(blogPosts).slice(0, 3).map((blog,index) => (
                                        <div key={index} className="single_catagory_post post_2 ">
                                            <div className="category_post_img" style={{ height: '124.2px' }}>
                                                <img src={blog.image} alt="Postimg" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                                            </div>
                                            <div className="post_text_1 pr_30">
                                                <Link onClick={fetchSingleBlogAsyncTimeOut} to={`/single-blog?post=${encryptData(blog.id,'blogid')}`}>
                                                    <h3>Subdue lesser beast winged bearing meat tree one</h3>
                                                </Link>
                                                <p><span> By Michal</span> / March 30</p>
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SingleBlog