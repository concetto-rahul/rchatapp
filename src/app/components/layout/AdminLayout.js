import React, { useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import PageLoader from "../PageLoader";


const AdminLayout=(props)=>{
    const {pageLoader,setProfileData,profileData}=props;
    const [profileDropdown,setProfileDropdown]=useState(false);
    const history=useHistory();
    const profileIcon=profileData.profilePhotoURL?profileData.profilePhotoURL:"/img/avatar/avatar-1.png";
    useLayoutEffect(()=>{
      setProfileData();
    },[]);

    const showProfileMenu=()=>{
        setProfileDropdown(!profileDropdown);
    }

    return(
        <>
            { pageLoader?<PageLoader />:"" }
            <div id="app">
                <div className="main-wrapper">
                <div className="navbar-bg"></div>
                <nav className="navbar navbar-expand-lg main-navbar">
                    <ul className="navbar-nav navbar-right w-100">
                        <li className="dropdown dropdown-list-toggle w-50">
                            <Link to="/dashboard" style={{fontSize:'25px',fontWeight:"700"}} data-toggle="dropdown" className="nav-link nav-link-lg message-toggle">
                                Stisla
                            </Link>
                        </li>
                        <li className={profileDropdown?"dropdown w-50 show":"dropdown w-50"}>
                            <a href="#nav" onClick={showProfileMenu} data-toggle="dropdown" className="nav-link dropdown-toggle nav-link-lg nav-link-user float-right">
                                <img alt="" src={profileIcon} className="rounded-circle mr-1"/>
                                <div className="d-sm-none d-lg-inline-block">Hi, {profileData.profileName}</div>
                            </a>
                            <div className={profileDropdown?"dropdown-menu dropdown-menu-right show":"dropdown-menu dropdown-menu-right"}>
                                <div className="dropdown-title">Logged in 5 min ago</div>
                                <Link to="/profile" onClick={showProfileMenu} className="dropdown-item has-icon">
                                    <i className="far fa-user"></i> Profile
                                </Link>
                                <Link to="/dashboard" onClick={showProfileMenu} className="dropdown-item has-icon">
                                    <i className="fas fa-bolt"></i> Activities
                                </Link>
                                <Link to="/profile" onClick={showProfileMenu} className="dropdown-item has-icon">
                                    <i className="fas fa-cog"></i> Settings
                                </Link>
                                <div className="dropdown-divider"></div>
                                <Link to="/profile" onClick={showProfileMenu} className="dropdown-item has-icon text-danger">
                                    <i className="fas fa-sign-out-alt"></i> Logout
                                </Link>
                            </div>
                        </li>
                        
                    </ul>
                </nav>
                <div className="main-content">
                    <section className="section">{ props.children }</section>
                </div>
                <footer className="main-footer">
                    <div className="footer-left">
                    Copyright &copy; 2021 <div className="bullet"></div> Design By <a href="https://www.concettolabs.com/" rel="noreferrer" target="_blank">Concetto Labs</a>
                    </div>
                    <div className="footer-right">
                    2.3.0
                    </div>
                </footer>
                </div>
            </div>
        </>
    )
}

export default AdminLayout