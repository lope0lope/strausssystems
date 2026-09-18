import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/strauss-strategies-logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <nav className="site-nav" aria-label="Primary navigation">
      <div className="site-shell flex h-[72px] items-center justify-between">
        <a href="#hero" className="brand-field" aria-label="Strauss-Strategies home" onClick={close}>
          <img src={logo} alt="Strauss-Strategies" className="h-7 w-auto object-contain" width={280} height={40} />
        </a>
        <ul className="hidden md:flex items-center gap-9 list-none">
          <li><a href="#services" className="nav-link">Services</a></li>
          <li><a href="#work" className="nav-link">Our Work</a></li>
          <li><a href="#about" className="nav-link">About</a></li>
        </ul>
        <div className="flex items-center gap-3">
          <a href="https://calendly.com/jason-bookings/discover-call" target="_blank" rel="noopener noreferrer" className="btn-primary hidden sm:inline-flex">
            Book a Call
          </a>
          <Button variant="ghost" size="icon" className="md:hidden rounded-sm" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation" : "Open navigation"}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      {open && (
        <div id="mobile-navigation" className="md:hidden border-t border-border bg-background">
          <div className="site-shell flex flex-col py-5">
            <a href="#services" onClick={close} className="mobile-nav-link">Services</a>
            <a href="#work" onClick={close} className="mobile-nav-link">Our Work</a>
            <a href="#about" onClick={close} className="mobile-nav-link">About</a>
            <a href="https://calendly.com/jason-bookings/discover-call" target="_blank" rel="noopener noreferrer" className="mobile-nav-link text-gold">Book a Call</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
