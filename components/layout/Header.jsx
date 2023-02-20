import Link from "next/link"

export const Header = () => (
  <header>
    <Link href="/">
      <a className="font-montserrat hover:underline underline-offset-4 uppercase tracking-wide transition-all duration-200 font-medium">
        Home
      </a>
    </Link>
  </header>
)