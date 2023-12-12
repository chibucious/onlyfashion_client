import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import SingleBlog from './pages/SingleBlog';
import Category from './pages/Category';
import Contact from './pages/Contact';
import Search from './pages/Search';
import SingleCategory from './pages/SingleCategory';

// import { handleDataTable } from './customjs/script';

const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={ <Home/> } />
            <Route path="/home" element={ <Home/> } />
            <Route path="/search" element={ <Search/> } />
            <Route path="/single-blog" element={ <SingleBlog/> } />
            <Route path="/category" element={ <Category/> } />
            <Route path="/single-category" element={ <SingleCategory/> } />
            <Route path="/contact" element={ <Contact/> } />

            {/* Redirect for unknown routes */}
            {/* <Route path="*" element={ <Dashboard/> } /> */}
            {/* <Route path="/login" element={<Navigate to="/dashboard" />} /> */}
        </Routes>
    )
}

export default AppRoutes