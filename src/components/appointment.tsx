import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, X } from "lucide-react";
import { useHydrated } from "./use-hydrated";
export function Appointment({
  quiet = false,
  className = "",
  label = "Preview an appointment",
}: {
  quiet?: boolean;
  className?: string;
  label?: string;
}) {
  const ready = useHydrated();
  return (
    <Dialog.Root>
      <Dialog.Trigger
        disabled={!ready}
        className={"button " + (quiet ? "button-outline " : "") + className}
      >
        {label}
        <ArrowUpRight size={17} aria-hidden="true" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="appointment-dialog">
          <Dialog.Close
            className="icon-button dialog-close"
            aria-label="Close appointment preview"
          >
            <X size={23} aria-hidden="true" />
          </Dialog.Close>
          <p className="eyebrow">An imagined first step</p>
          <Dialog.Title>A moment, just for you.</Dialog.Title>
          <Dialog.Description>
            This is a concept preview. No appointment can be booked here.
          </Dialog.Description>
          <ol className="appointment-steps">
            <li>
              <span>01</span>
              <div>
                <h3>Explore the edit</h3>
                <p>Find the service direction that speaks to you.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Share your perspective</h3>
                <p>
                  A real consultation would explore your ideas, preferences and
                  questions.
                </p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Agree a moment</h3>
                <p>
                  A live salon would confirm the service, availability and
                  appointment details.
                </p>
              </div>
            </li>
          </ol>
          <p className="small-note">
            Fictional beauty atelier by Krelyvo Studio. No personal details are
            collected or sent.
          </p>
          <Dialog.Close className="button">
            Back to the atelier
            <ArrowUpRight size={17} aria-hidden="true" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
