import { useEffect, type RefObject } from "react";
export function useMotion(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    let disposed = false;
    let clean: (() => void) | undefined;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
      .then(([{ gsap }, { ScrollTrigger }]) => {
        if (disposed || !root.current) return;
        gsap.registerPlugin(ScrollTrigger);
        const media = gsap.matchMedia();
        const context = gsap.context(() => {
          media.add("(prefers-reduced-motion: no-preference)", () => {
            gsap.from(".hero-title", {
              y: 24,
              opacity: 0.4,
              duration: 1,
              ease: "power2.out",
              clearProps: "all",
            });
            gsap.from(".hero-frame", {
              scale: 0.98,
              opacity: 0.5,
              duration: 1.2,
              ease: "power2.out",
              clearProps: "all",
            });
            gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) =>
              ScrollTrigger.create({
                trigger: el,
                start: "top 94%",
                once: true,
                onEnter: () => {
                  gsap.from(el, {
                    y: 20,
                    opacity: 0.6,
                    duration: 0.65,
                    clearProps: "all",
                  });
                },
              }),
            );
          });
          media.add(
            "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
            () => {
              const edit = root.current?.querySelector<HTMLElement>("#edit");
              if (!edit) return;
              edit.classList.add("lookbook-enhanced");
              edit
                .querySelectorAll<HTMLElement>(".lookbook-photo")
                .forEach((el, i) => {
                  gsap.fromTo(
                    el,
                    {
                      y: 60,
                      rotate: i % 2 ? 3 : -3,
                      clipPath: "inset(6% 3% 3% 3%)",
                    },
                    {
                      y: 0,
                      rotate: 0,
                      clipPath: "inset(0% 0% 0% 0%)",
                      ease: "none",
                      scrollTrigger: {
                        trigger: el,
                        start: "top 95%",
                        end: "top 42%",
                        scrub: 0.6,
                      },
                    },
                  );
                });
              return () => edit.classList.remove("lookbook-enhanced");
            },
          );
        }, root);
        clean = () => {
          media.revert();
          context.revert();
        };
      })
      .catch(() => {
        /* Content stays visible without motion. */
      });
    return () => {
      disposed = true;
      clean?.();
    };
  }, [root]);
}
