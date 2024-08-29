import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="navbar-fixed bg-neutral">
      <div className="navbar container mx-auto text-neutral-content">
        <div className="navbar-start">
          <div className="logo">Uji Coba</div>
        </div>
        <div className="navbar-end">
          <Link href="/" className="menu px-2">Home</Link>
          <Link href="/about" className="menu px-2">About</Link>
          <Link href="/contact" className="menu px-2">Contact</Link>
        </div>
      </div>
    </div>
  );
}