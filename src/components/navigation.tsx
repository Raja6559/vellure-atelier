import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Appointment } from "./appointment";
import { useHydrated } from "./use-hydrated";
const links = [
  ["The Atelier", "#atelier"],
  ["Services", "#services"],
  ["The Edit", "#edit"],
] as const;
export function Navigation() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const ready = useHydrated();
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  useEffect(() => {
    const media = matchMedia("(min-width: 900px)");
    const close = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", close);
    return () => media.removeEventListener("change", close);
  }, []);
  return (
    <>
      <div className="concept-notice">
        Fictional beauty atelier concept by Krelyvo Studio.
      </div>
      <header className="site-header">
        <div className="nav-inner wrap">
          <a
            className="wordmark"
            href="#top"
            aria-label="Vellure Atelier, back to top"
          >
            Vellure<span>Atelier</span>
          </a>
          <nav aria-label="Main navigation" className="desktop-nav">
            {links.map(([name, href]) => (
              <a key={href} href={href}>
                {name}
              </a>
            ))}
          </nav>
          <Appointment quiet className="nav-appointment" />
          <button
            className="menu-toggle icon-button"
            ref={toggle}
            disabled={!ready}
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? (
              <X size={23} aria-hidden="true" />
            ) : (
              <Menu size={23} aria-hidden="true" />
            )}
          </button>
        </div>
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className="mobile-nav wrap"
          hidden={!open}
        >
          {links.map(([name, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {name}
            </a>
          ))}
        </nav>
        <noscript>
          <nav className="noscript-nav wrap" aria-label="Page navigation">
            {links.map(([name, href]) => (
              <a key={href} href={href}>
                {name}
              </a>
            ))}
          </nav>
        </noscript>
      </header>
    </>
  );
}
