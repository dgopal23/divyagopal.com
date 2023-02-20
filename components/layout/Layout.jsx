import cn from "classnames"

import { Header } from "@/components/layout"

export const Layout = ({ header, center = false, children, className }) => (
  <div className={cn("bg-powder", className)}>
    <div className="flex flex-col min-h-screen container mx-auto px-4 py-12">
      {header && <Header />}
      <div className={cn("flex-1", {
        "md:flex md:items-center": center
      })}>
        {children}
      </div>
    </div>
  </div>
)