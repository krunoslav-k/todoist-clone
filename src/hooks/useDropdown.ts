import { useState } from "react";
import type { Dropdown } from "../types/ui";

export default function useDropdown() {
  const [activeDropdown, setActiveDropdown] = useState<Dropdown>(null);

  function openDropdown(key: Exclude<Dropdown, null>) {
    setActiveDropdown(key);
  }

  function closeDropdown() {
    setActiveDropdown(null);
  }

  function isOpen(key: Exclude<Dropdown, null>) {
    return activeDropdown === key;
  }

  return {
    activeDropdown,
    openDropdown,
    closeDropdown,
    isOpen,
  };
}
