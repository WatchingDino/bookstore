import React, { Fragment } from "react";

const Footer = () => {
  return (
    <Fragment>
      <footer className="py-2 bg-nbTheme">
        <div className="container mx-auto py-5 font-roboto text-md text-black">
          <div className="flex flex-wrap items-center justify-center pb-5">
            <div className="w-full md:w-1/3 flex justify-center mb-3">
              <img
                src="https://res.cloudinary.com/dfxyjskzh/image/upload/v1725391050/national_diaries_logo_ra1noc.png"
                alt="National Diaries Logo"
                className="w-64"
              />
            </div>

            <div className="w-full md:w-1/3 block text-center">
              <p className="text-2xl font-bold pb-2 font-serif ">
                National Diaries
              </p>
              <p className="">
                National Diaries is a specialty retailer offering a curated
                selection of diaries, novels, planners, and other literary
                essentials. Our mission is to provide high-quality, stylish, and
                functional products for readers, writers, and anyone who values
                thoughtful organization. Each item is carefully chosen to
                inspire creativity, encourage planning, and make daily life more
                enjoyable. With National Diaries, you’ll find the perfect tools
                for capturing memories, setting goals, and exploring new
                stories.
              </p>
            </div>

            <div className="w-full md:w-1/3 text-center font-bold">
              <a
                href="#learnMore"
                className="flex items-center justify-center group mb-1"
              >
                <p className="inline-block relative">
                  Explore Our Offerings!
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-black transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
                </p>
              </a>
              <a
                href="#joinCommunity"
                className="flex items-center justify-center group mb-1"
              >
                <p className="inline-block relative">
                  Join Our Community
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-black transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
                </p>
              </a>
              <a
                href="#aboutUs"
                className="flex items-center justify-center group mb-3"
              >
                <p className="inline-block relative">
                  About Us
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-black transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
                </p>
              </a>

              <div className="flex items-center justify-center mb-2">
                <p className="inline-block relative">
                  Contact Us:
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-black transform scale-x-100 transition-transform duration-300 ease-in-out"></span>
                </p>
              </div>

              <div className="flex items-center justify-center mb-1">
                <i className="pi pi-inbox pr-2 text-xl" />
                <p className="inline-block relative">
                  national.diaries2024@gmail.com
                </p>
              </div>

              <div className="flex items-center justify-center mb-1">
                <i className="pi pi-phone pr-2 text-xl" />
                <div className="flex flex-col">
                  <p className="inline-block relative">(+63) 987-6543-210</p>
                  <p className="inline-block relative"> (+63 2) 8765-4321</p>
                </div>
              </div>
            </div>
          </div>

          <hr className="mx-24" />

          <div className="text-center mt-5">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-2 text-3xl"
            >
              <i className="pi pi-facebook" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-2 text-3xl"
            >
              <i className="pi pi-instagram" />
            </a>
            <a
              href="https://www.github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-2 text-3xl"
            >
              <i className="pi pi-github" />
            </a>

            <p className="mt-2 font-bold">
              ©2024 National Diaries. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
