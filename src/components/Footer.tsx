import logo from "@/assets/strauss-strategies-logo.png";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-cream/10 px-[5vw] py-10 flex justify-between items-center flex-wrap gap-5">
      <a href="#" className="inline-flex rounded-full bg-ink-mid/90 px-4 py-2 no-underline">
        <img src={logo} alt="Strauss-Strategies" className="h-6 w-auto object-contain" loading="lazy" width={280} height={40} />
      </a>
      <ul className="flex gap-6 list-none">
        <li><a href="#services" className="text-[0.85rem] text-muted-text no-underline hover:text-gold transition-colors">Services</a></li>
        <li><a href="#work" className="text-[0.85rem] text-muted-text no-underline hover:text-gold transition-colors">Our Work</a></li>
        <li><a href="#about" className="text-[0.85rem] text-muted-text no-underline hover:text-gold transition-colors">About</a></li>
        <li><a href="#contact" className="text-[0.85rem] text-muted-text no-underline hover:text-gold transition-colors">Contact</a></li>
      </ul>
      <p className="text-[0.85rem] text-muted-text">© 2026 Strauss-Strategies · South Africa</p>
    </footer>
  );
};

export default Footer;
