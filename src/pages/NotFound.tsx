import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>Page Not Found | Strauss-Strategies</title>
        <meta
          name="description"
          content="The page you're looking for doesn't exist. Return to the Strauss-Strategies home page."
        />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://strausssystems.lovable.app/404" />
        <meta property="og:title" content="Page Not Found | Strauss-Strategies" />
        <meta
          property="og:description"
          content="The page you're looking for doesn't exist."
        />
        <meta property="og:url" content="https://strausssystems.lovable.app/404" />
      </Helmet>
      <main className="flex min-h-screen items-center bg-ink-soft">
        <div className="site-shell w-full grid md:grid-cols-[0.5fr_1fr] gap-10 items-end">
          <div className="technical-label text-gold">ERROR / 404</div>
          <div className="border-t border-foreground/20 pt-8">
          <h1 className="display-title mb-5">Page not found.</h1>
          <p className="mb-8 text-xl text-muted-text">The page you're looking for doesn't exist.</p>
          <a href="/" className="btn-primary">Return home</a>
          </div>
        </div>
      </main>
    </>
  );
};

export default NotFound;
