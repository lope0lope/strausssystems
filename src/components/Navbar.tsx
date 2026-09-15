import logo from "@/assets/strauss-strategies-logo.png";

const Navbar = () => {
  return (
    <nav className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[92vw] max-w-[1200px] flex items-center justify-between px-5 py-3 rounded-full glass-panel">
      <a href="#" className="flex items-center no-underline rounded-full bg-ink-mid/90 px-4 py-2">
        <img
          src={logo}
          alt="Strauss-Strategies"
          className="h-6 w-auto object-contain"
          width={280}
          height={40}
        />
      </a>
      <ul className="hidden md:flex gap-9 list-none">
        <li><a href="#services" className="text-[0.9rem] text-cream-mid no-underline hover:text-gold transition-colors">Services</a></li>
        <li><a href="#work" className="text-[0.9rem] text-cream-mid no-underline hover:text-gold transition-colors">Our Work</a></li>
        <li><a href="#about" className="text-[0.9rem] text-cream-mid no-underline hover:text-gold transition-colors">About</a></li>
      </ul>
      <a
        href="https://calendly.com/jason-bookings/discover-call"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary !px-5 !py-2 !text-[0.85rem]"
      >
        Book a Call
      </a>
    </nav>
  );
};

export default Navbar;
