import { useRef, useState } from "react";
import useClickOutside from "./useClickOutside";
import type { Dropdown } from "../types/ui";

export default function useDropdown() {
  const [activeDropdown, setActiveDropdown] = useState<Dropdown>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuRef, () => setActiveDropdown(null));

  function toggleDropdown(type: Exclude<Dropdown, null>) {
    setActiveDropdown((prev) => (prev === type ? null : type));
  }

  function closeDropdown() {
    setActiveDropdown(null);
  }

  useClickOutside(menuRef, closeDropdown);

  return { activeDropdown, toggleDropdown, closeDropdown, menuRef };
}
