import * as Popover from "@radix-ui/react-popover";

export function ComingSoonPopover({ children }: { children: React.ReactNode }) {
  return (
    <Popover.Root>
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
