import React from "react"
import cn from "classnames"


export const Highlight = ({data}) => (
  <section>
    <div className={cn("lg:grid lg:gap-10 md:py-10 px-12 md:px-24 mx-auto", {
      "grid-cols-3": data.highlightItems.length % 3 === 0,
      "grid-cols-2": data.highlightItems.length % 3 !== 0,
    })}>
      {data.highlightItems.map((highlightItems, index) => (
        <div key={index} className="mb-6 md:mb-0">
          <h3 className="font-medium font-montserrat uppercase tracking-widest text-base mb-2 underline underline-offset-4">{highlightItems.title}</h3>
          <p className="font-body font-montserrat text-sm leading-relaxed">
            {highlightItems.description}
          </p>
        </div>
      ))}
    </div>
  </section>
)