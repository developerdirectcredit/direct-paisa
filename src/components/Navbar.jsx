import { Menu, Phone, Download } from "lucide-react";

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <div className="flex items-center gap-3">
          <Menu />
          <h1 className="text-3xl font-bold text-blue-700">
            PaisaBazaar
          </h1>
        </div>

        <div className="hidden md:flex gap-6 items-center">
          <button className="flex gap-2 text-blue-600">
            <Phone size={18}/>
            Talk To Expert
          </button>

          <button className="flex gap-2 text-blue-600">
            <Download size={18}/>
            Get App
          </button>

          <button className="border px-4 py-2 rounded-lg">
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
}