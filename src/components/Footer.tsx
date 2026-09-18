import logo from "@/assets/strauss-strategies-logo.png";

const Footer = () => {
  return (
    <footer className="bg-dark border-t border-dark-foreground/15 text-dark-foreground">
      <div className="site-shell py-10 flex justify-between items-center flex-wrap gap-7">
      <a href="#hero" className="brand-field no-underline">
        <img src={logo} alt="Strauss-Strategies" className="h-6 w-auto object-contain" loading="lazy" width={280} height={40} />
      </a>
      <ul className="flex gap-6 list-none">
        <li><a href="#services" className="footer-link">Services</a></li>
        <li><a href="#work" className="footer-link">Our Work</a></li>
        <li><a href="#about" className="footer-link">About</a></li>
        <li><a href="#contact" className="footer-link">Contact</a></li>
      </ul>
      <p className="text-[0.85rem] text-dark-muted">© 2026 Strauss-Strategies · South Africa</p>
      </div>
    </footer>
  );
};

export default Footer;
