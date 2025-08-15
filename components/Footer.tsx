import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#EEEEEE] px-6 py-16">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-12">
        {/* Top Section: Logo + Links */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
          {/* Logo + Contact Info */}
          <div className="flex flex-col gap-4 items-center md:items-start text-sm">
            <img
              src="/logo.png"
              alt="logo"
              className="max-w-[160px] md:max-w-[220px]"
            />
            <div className="flex gap-3 items-center justify-center md:justify-start">
              <img src="/sms.png" alt="sms" />
              <p className="text-[#666666]">Enquiry@VibeStrings.com</p>
            </div>
            <div className="flex gap-3 items-center justify-center md:justify-start">
              <img src="/location.png" alt="location" />
              <p className="text-[#666666]">San Francisco</p>
            </div>
          </div>

          {/* Pages */}
          <div className="flex flex-col gap-4">
            <h2 className="text-black text-lg font-bold">PAGES</h2>
            <a href="#" className="text-sm text-[#666666] hover:text-black transition">
              Store
            </a>
            <a href="#" className="text-sm text-[#666666] hover:text-black transition">
              Collections
            </a>
            <a href="#" className="text-sm text-[#666666] hover:text-black transition">
              Support
            </a>
          </div>

          {/* Product */}
          <div className="flex flex-col gap-4">
            <h2 className="text-black text-lg font-bold">PRODUCT</h2>
            <a href="#" className="text-sm text-[#666666] hover:text-black transition">
              Terms
            </a>
            <a href="#" className="text-sm text-[#666666] hover:text-black transition">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-[#666666] hover:text-black transition">
              Copyright
            </a>
          </div>

          {/* Follow Us */}
          <div className="flex flex-col gap-4">
            <h2 className="text-black text-lg font-bold">FOLLOW US</h2>
            <div className="flex justify-center md:justify-start gap-6">
              <img src="/Facebook.png" alt="facebook" className="w-7" />
              <img src="/Twitter.png" alt="twitter" className="w-7" />
              <img src="/Instagram.png" alt="instagram" className="w-7" />
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="pt-6 w-full">
          <p className="text-sm text-[#666666] text-center">
            © 2022 VibeStrings. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
