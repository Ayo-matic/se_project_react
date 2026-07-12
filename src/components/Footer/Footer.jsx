import "./Footer.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__copyright">Developed by Ayomikun</p>
      <p className="footer__year">{year}</p>
    </footer>
  );
}

export default Footer;
