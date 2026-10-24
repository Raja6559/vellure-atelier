import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, X } from "lucide-react";
import { Photo } from "./photo";
import { images, type PhotoData } from "../data/images";
import { useHydrated } from "./use-hydrated";
function GalleryImage({
  image,
  title,
  number,
}: {
  image: PhotoData;
  title: string;
  number: string;
}) {
  const ready = useHydrated();
  return (
    <figure className="gallery-item" data-reveal>
      <Dialog.Root>
        <Dialog.Trigger
          disabled={!ready}
          className="gallery-trigger"
          aria-label={"View " + title}
        >
          <Photo image={image} />
          <span className="gallery-expand">
            <ArrowUpRight size={21} aria-hidden="true" />
          </span>
        </Dialog.Trigger>
        <figcaption>
          <span>
            {number} / {title}
          </span>
          <small>{image.label}</small>
        </figcaption>
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content className="gallery-dialog">
            <Dialog.Close
              className="icon-button gallery-close"
              aria-label="Close image preview"
            >
              <X size={24} aria-hidden="true" />
            </Dialog.Close>
            <Photo image={image} sizes="90vw" priority />
            <div className="gallery-caption">
              <Dialog.Title>{title}</Dialog.Title>
              <Dialog.Description>
                {image.label} · Fictional Vellure Atelier.
              </Dialog.Description>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </figure>
  );
}
export function Gallery() {
  return (
    <section className="gallery section wrap" id="space">
      <div className="section-heading" data-reveal>
        <div>
          <p className="eyebrow">04 / The space between</p>
          <h2>
            Make space
            <br />
            for <em>yourself.</em>
          </h2>
        </div>
        <p>
          Soft light. Quiet details.
          <br />
          An imagined place to pause.
        </p>
      </div>
      <div className="gallery-grid">
        <GalleryImage image={images.interior} title="The atelier" number="01" />
        <GalleryImage
          image={images.stillLife}
          title="The quiet details"
          number="02"
        />
        <GalleryImage
          image={images.studio}
          title="Another perspective"
          number="03"
        />
      </div>
    </section>
  );
}
