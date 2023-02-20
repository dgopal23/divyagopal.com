import React, { Fragment } from "react"

import { Highlight, Cta, Hero, Gallery, Intro } from "../blocks"

export const Blocks = ({ blocks }) => (
  <>
    {blocks.map((block, index) => (
      <Fragment key={index}>
        {block._modelApiKey === "highlight" && <Highlight data={block} />}
        {block._modelApiKey === "cta" && <Cta data={block} />}
        {block._modelApiKey === "hero" && <Hero data={block} />}
        {block._modelApiKey === "gallery" && <Gallery data={block} />}
        {block._modelApiKey === "intro" && <Intro data={block} />}
      </Fragment>
    ))}
  </>
)