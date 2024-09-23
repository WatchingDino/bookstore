import React, { Fragment } from "react";

const Footer = () => {
  return (
    <Fragment>
      <footer
        className="footer py-2"
        style={{
          backgroundColor: "#51438b",
          color: "#171717",
        }}
      >
        <div
          className="container"
          style={{ fontFamily: "'Lucida Bright', serif" }}
        >
          <div className="row align-items-center">
            {/* Logo Section */}
            <div className="col-md-3 d-flex justify-content-center mb-3">
              <img
                src="https://res.cloudinary.com/dfxyjskzh/image/upload/v1725391050/national_diaries_logo_ra1noc.png"
                alt="National_Diaries_Logo"
                style={{ width: "250px" }}
              />
            </div>

            {/* extra */}
            <div className="col-md-3 d-flex justify-content-center">
              <div>
                <a href="#extra" style={{ color: "#171717" }}>
                  <h5>extra</h5>
                </a>
                <a href="#extra" style={{ color: "#171717" }}>
                  <h5>extra</h5>
                </a>
                <a href="#extra" style={{ color: "#171717" }}>
                  <h5>extra</h5>
                </a>
              </div>
            </div>

            {/* extra */}
            <div className="col-md-3 d-flex justify-content-center">
              <div>
                <a href="#extra" style={{ color: "#171717" }}>
                  <h5>extra</h5>
                </a>
                <a href="#extra" style={{ color: "#171717" }}>
                  <h5>extra</h5>
                </a>
                <a href="#extra" style={{ color: "#171717" }}>
                  <h5>extra</h5>
                </a>
              </div>
            </div>

            {/* extra */}
            <div className="col-md-3 d-flex justify-content-center">
              <div>
                <a href="#extra" style={{ color: "#171717" }}>
                  <h5>extra</h5>
                </a>
                <a href="#extra" style={{ color: "#171717" }}>
                  <h5>extra</h5>
                </a>
                <a href="#extra" style={{ color: "#171717" }}>
                  <h5>extra</h5>
                </a>
              </div>
            </div>
          </div>
          <hr />
          <div className="text-center" style={{ marginTop: "80px" }}>
            <a
              href="#facebook"
              style={{ color: "#171717", margin: "0 10px", fontSize: "32px" }}
            >
              <i className="pi pi-facebook"></i>
            </a>
            <a
              href="#instagram"
              style={{ color: "#171717", margin: "0 10px", fontSize: "32px" }}
            >
              <i className="pi pi-instagram"></i>
            </a>
            <a
              href="#github"
              style={{ color: "#171717", margin: "0 10px", fontSize: "32px" }}
            >
              <i className="pi pi-github"></i>
            </a>

            <p style={{ marginTop: "10px", fontWeight: "bold" }}>
              ©2024 National Diaries. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
