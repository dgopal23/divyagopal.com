import React from "react"
import Link from "next/link"
import { linkResolver } from "@/lib/linkResolver"

export const Cta = ({ data, index }) => (
  <Link
    href={linkResolver(data.cta)} 
    key={index}
  >
    <a className="block md:text-7xl sm:text-5xl text-4xl font-miracle transform hover:translate-x-2 transition-all duration-200">
      {data.text}
    </a>
  </Link>
)