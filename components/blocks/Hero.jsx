import React from "react"
import { Image } from "react-datocms"

export const Hero = ({ data }) => (
  <>
    <Image data={data.cover.responsiveImage} />
    <h1 className="font-miracle md:text-right text-center lg:text-7xl md:text-5xl text-4xl mt-4">
      {data.title}
    </h1>
  </>
)