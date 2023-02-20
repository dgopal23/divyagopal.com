import Link from "next/link"
import { linkResolver } from "@/lib/linkResolver"

export const Navigation = ({ data }) => (
  <section className="flex flex-col md:text-9xl text-6xl">
    {data.links.map((link, index) => (
      <Link
        href={linkResolver(link.cta)} 
        key={index}
      >
        <a className="font-miracle transform hover:translate-x-2 transition-all duration-200 uppercase">
          {link.text}
        </a>
      </Link>
    ))}
  </section>
)