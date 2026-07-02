const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="">
      <div className="container flex items-center justify-center">
        <div>
          <p>ProShp &copy; {currentYear}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
