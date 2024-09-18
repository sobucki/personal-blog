import Link from "next/link";

function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 flex items-center">
        <div className="w-40">
          <Link href="/">LOGO</Link>
        </div>
        <div className="ml-12 flex">
          <Link href="/">Home</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
