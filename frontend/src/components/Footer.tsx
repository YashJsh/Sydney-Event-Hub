
const Footer = () => {
  return (
    <div className=" m-8 pt-8 flex flex-col md:flex-row justify-center items-center">
      <p className="text-sm text-gray-500">
        &copy; {new Date().getFullYear()} SydneyEvents. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
