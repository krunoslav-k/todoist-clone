import * as Popover from "@radix-ui/react-popover";
import { useEffect, useState } from "react";

export function ComingSoonPopover({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => setOpen(false), 2500);

    return () => clearTimeout(timer);
  }, [open]);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>{children}</Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          side="top"
          className="bg-black text-white text-xs px-3 py-2 rounded-md shadow-lg z-100"
        >
          Coming soon 🚧
          <Popover.Arrow className="fill-black" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
