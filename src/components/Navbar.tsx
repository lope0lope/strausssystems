const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5vw] py-5 bg-background/85 backdrop-blur-md border-b border-gold/15">
      <a href="#" className="font-serif text-xl font-medium tracking-wider text-cream no-underline">
        Strauss<span className="text-gold">.</span>Systems
      </a>
      <ul className="hidden md:flex gap-10 list-none">
        <li><a href="#services" className="text-[0.82rem] font-medium tracking-[0.1em] uppercase text-muted-text no-underline hover:text-gold-light transition-colors">Services</a></li>
        <li><a href="#work" className="text-[0.82rem] font-medium tracking-[0.1em] uppercase text-muted-text no-underline hover:text-gold-light transition-colors">Our Work</a></li>
        <li><a href="#about" className="text-[0.82rem] font-medium tracking-[0.1em] uppercase text-muted-text no-underline hover:text-gold-light transition-colors">About</a></li>
      </ul>
      <a href="https://calendly.com/jason-bookings/discover-call" target="_blank" rel="noopener noreferrer" className="text-[0.8rem] font-medium tracking-[0.08em] uppercase text-gold border border-gold px-5 py-2 no-underline rounded-sm hover:bg-gold hover:text-ink transition-colors">
        Book a Call
      </a>
    </nav>
  );
};

export default Navbar;
