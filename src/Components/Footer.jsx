import React from "react";

const Footer = (props) => {
  return props.loggedUser === true ? (
    <footer className="footer">
      <div className="footer-redes">
        <div className="derechos">
          <h6>©2021. Todos los derechos reservados</h6>
        </div>
        <div className="redes-links">
          <a
            href="https://www.facebook.com/Megatlon/"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://www.instagram.com/megatlon/"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://www.youtube.com/channel/UCNU3ljQ8sKREQZpTv8mdM6w"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </div>
    </footer>
  ) : (
    <div></div>
  );
};

export default Footer;
