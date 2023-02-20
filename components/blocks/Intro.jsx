import React from "react"

export const Intro = ({ data }) => (
  <section className="md:px-24 px-6 md:py-12 py-6">
      <h3 className="lg:text-5xl md:text-4xl text-3xl font-miracle leading-10">{data.intro}</h3>
  </section>
)