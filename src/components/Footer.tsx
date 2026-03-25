const Footer = () => {
  return (
    <footer className="bg-ink-soft border-t border-cream/[0.06] px-[5vw] py-10 flex justify-between items-center flex-wrap gap-4">
      <a href="#" className="font-serif text-lg font-medium tracking-wider text-cream no-underline">
        Strauss<span className="text-gold">.</span>Systems
      </a>
      <ul className="flex gap-6 list-none">
        <li><a href="#services" className="text-[0.8rem] text-muted-text no-underline hover:text-gold-light transition-colors">Services</a></li>
        <li><a href="#work" className="text-[0.8rem] text-muted-text no-underline hover:text-gold-light transition-colors">Our Work</a></li>
        <li><a href="#about" className="text-[0.8rem] text-muted-text no-underline hover:text-gold-light transition-colors">About</a></li>
        <li><a href="#contact" className="text-[0.8rem] text-muted-text no-underline hover:text-gold-light transition-colors">Contact</a></li>
      </ul>
      <p className="text-[0.8rem] text-muted-text">© 2026 Strauss Systems · South Africa</p>
    </footer>
  );
};

export default Footer;
