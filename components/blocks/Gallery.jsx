import React from "react"
import { Image } from "react-datocms"
import cn from "classnames"


export const Gallery = ({ data }) => (
  <div>
    <div className={cn("grid grid-cols-3 mt-8 gap-4",{
      "grid-cols-3 h-72": data.images.length % 3 === 0,
      "lg:grid-cols-4 grid-cols-2": data.images.length % 4 === 0,
    })}>

      {data.images.map((image, index) => (
        <Image data={image.responsiveImage} key={index} />
      ))}
    </div>
  </div>
)