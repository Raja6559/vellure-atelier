import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Navigation } from "../components/navigation";
import { Appointment } from "../components/appointment";
import { Photo } from "../components/photo";
import { Services } from "../components/services";
import { Gallery } from "../components/gallery";
import { useMotion } from "../components/use-motion";
import { images } from "../data/images";
export const Route = createFileRoute("/")({ component: Vellure });
const moments = [
  {
    number: "01",
    title: "The mood",
    copy: "A reference. A texture. A feeling to follow.",
    image: images.mood,
  },
  {
    number: "02",
    title: "The craft",
    copy: "A considered touch, down to the last detail.",
    image: images.craft,
  },
  {
    number: "03",
    title: "The expression",
    copy: "A look that speaks in your own language.",
    image: images.expression,
  },
];
function Vellure() {
  const root = useRef<HTMLDivElement>(null);
  useMotion(root);
  return (
    <div ref={root} id="top">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navigation />
      <main id="main">
        <section className="hero wrap">
          <div className="hero-copy">
            <p className="eyebrow">Beauty / Expression / Ritual</p>
            <h1 className="hero-title">
              A little pause.
              <br />A little <em>you.</em>
            </h1>
            <p className="hero-description">
              A space for self-expression, considered details and a moment away
              from the everyday.
            </p>
            <div className="hero-actions">
              <a className="button" href="#services">
                Explore services
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              <Appointment quiet />
            </div>
            <a href="#atelier" className="scroll-cue">
              <ArrowDown size={16} aria-hidden="true" />A moment to discover
            </a>
          </div>
          <figure className="hero-visual">
            <div className="hero-frame">
              <Photo
                image={images.interior}
                priority
                sizes="(max-width: 900px) 100vw, 48vw"
              />
            </div>
            <figcaption>
              <span>A different kind of reflection.</span>
              <span>V / 01</span>
            </figcaption>
          </figure>
        </section>
        <div className="editorial-rule wrap">
          <span>Considered beauty.</span>
          <span>Individual expression.</span>
          <span>A moment that's yours.</span>
        </div>
        <section id="atelier" className="atelier section wrap">
          <figure className="atelier-image" data-reveal>
            <Photo image={images.studio} />
            <figcaption>{images.studio.label}</figcaption>
          </figure>
          <div className="atelier-copy" data-reveal>
            <p className="eyebrow">01 / Meet the atelier</p>
            <h2>
              Beauty, with a<br />
              <em>point of view.</em>
            </h2>
            <p className="standfirst">
              Less rush.
              <br />
              More room to be yourself.
            </p>
            <p>
              Vellure imagines a different rhythm. A calm space to consider a
              new direction, find inspiration in the details and make a look
              your own.
            </p>
            <p>
              From the light at the mirror to the last finishing touch, the idea
              is simple: a little time for the way you want to feel.
            </p>
            <a className="text-link" href="#edit">
              Discover the expression
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </section>
        <Services />
        <section id="edit" className="lookbook">
          <div className="wrap">
            <div className="section-heading" data-reveal>
              <div>
                <p className="eyebrow">03 / The Vellure edit</p>
                <h2>
                  Your look.
                  <br />
                  Your <em>language.</em>
                </h2>
              </div>
              <p>
                An editorial study in
                <br />
                mood, craft and self-expression.
              </p>
            </div>
            <div className="lookbook-grid">
              {moments.map((moment) => (
                <figure key={moment.title} className="lookbook-card">
                  <div className="lookbook-photo">
                    <Photo
                      image={moment.image}
                      sizes="(max-width: 700px) 100vw, 35vw"
                    />
                  </div>
                  <figcaption>
                    <div className="lookbook-title">
                      <span>{moment.number}</span>
                      <h3>{moment.title}</h3>
                    </div>
                    <p>{moment.copy}</p>
                    <small>AI-generated concept image</small>
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="lookbook-note">
              An imagined creative direction. These images illustrate a concept,
              rather than real clients or treatment results.
            </p>
          </div>
        </section>
        <Gallery />
        <section className="invitation wrap" data-reveal>
          <p className="eyebrow">A little time for you</p>
          <h2>
            Your next moment
            <br />
            starts with a <em>conversation.</em>
          </h2>
          <Appointment label="Preview the appointment journey" />
          <p className="small-note">
            A fictional experience. No booking service is connected.
          </p>
        </section>
      </main>
      <footer className="footer wrap">
        <div className="footer-top">
          <p>Beauty. Expression. Ritual.</p>
          <a
            className="text-link"
            href="https://krelyvo.com/work/vellure-atelier"
          >
            View the Krelyvo case study
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
        <p className="footer-wordmark" aria-hidden="true">
          Vellure<span>Atelier</span>
        </p>
        <div className="footer-bottom">
          <p>Fictional beauty atelier concept by Krelyvo Studio.</p>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}
