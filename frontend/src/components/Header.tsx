import { DropdownMenu, DropdownItem } from "./ui/DropDownMenu";
import { ChevronDown, MessageCircleDashed, Sparkles } from "lucide-react";
import { Button } from "../components/ui/Button";

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b bg-white px-4 py-2">
      
      {/* LEFT - Dropdown */}
      <DropdownMenu
        trigger={
          <div className="flex cursor-pointer items-center gap-1 rounded-md px-2 py-1 text-lg font-medium hover:bg-gray-100">
            ChatGPT
            <ChevronDown size={18} className="text-gray-400" />
          </div>
        }
      >
        <DropdownItem>ChatGPT</DropdownItem>
        <DropdownItem>ChatGPT Go</DropdownItem>
        <DropdownItem>GPT-4</DropdownItem>
      </DropdownMenu>

      {/* CENTER - Upgrade Button */}
      <Button
        variant="secondary"
        className="flex gap-2 bg-[#f1f1fb] font-bold text-[#5d5dd0] hover:bg-[#e7e7fb] px-4"
      >
        <Sparkles size={16} />
        Upgrade to Go
      </Button>

      {/* RIGHT - Chat Icon */}
      <button className="rounded-full p-2 hover:bg-gray-100">
        <MessageCircleDashed size={20} className="text-gray-700" />
      </button>
    </header>
  );
}