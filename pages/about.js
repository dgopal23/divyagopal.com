import Head from "next/head"
import { renderMetaTags, useQuerySubscription, StructuredText, Image } from "react-datocms"
import { Layout } from "@/components/layout"
import { createSubscription } from "@/lib/datocms"
import { metaTagsFragment, aboutFragment, responsiveImageFragment } from "@/lib/fragments"
import Link from "next/link"

const ABOUT_QUERY = `
  {
    site: _site {
      favicon: faviconMetaTags {
        ...metaTagsFragment
      }
    }
    about {
      ...aboutFragment
    }
  }
  ${metaTagsFragment}
  ${aboutFragment}
  ${responsiveImageFragment}
`

export const getStaticProps = async ({ preview = false }) => {
  return {
    props: {
      subscription: await createSubscription(preview, {
        query: ABOUT_QUERY
      }),
      preview
    },
  }
}

export const About = ({ subscription, preview }) => {
  const { data } = useQuerySubscription(subscription);

  return (
    <Layout preview={preview}>
      <Head>
        {renderMetaTags(data.about.seo.concat(data.site.favicon))}
      </Head>
      <section>
        <div className="inline-block mb-10">
          <Link
            href="/">
            <a className="uppercase tracking-widest font-montserrat hover:underline underline-offset-4 transition-all duration-200 font-medium">Home</a>
          </Link>
        </div>
        <div className="pt-48 md:flex">
          <div className="order-last absolute right-0 w-1/2 md:w-1/3 lg:top-32 top-10 z-0">
            <Image 
              data={data.about.image.responsiveImage}
            />
          </div>
          <div className="pb-20 z-30 lg:w-2/3 relative">
            <h3 className="lg:text-9xl text-7xl font-miracle mb-9">{data.about.title}</h3>
            <div className="prose-headings:font-miracle lg:prose-headings:text-5xl prose-headings:text-3xl prose-p:font-montserrat prose-headings:mt-6 prose-headings:mb-6 prose-li:list-disc prose-p:text-sm prose-p:mb-2 prose-p:leading-7 prose-headings:max-w-3xl prose-p:max-w-3xl ">
              <StructuredText data={data.about.content} />
            </div>
            <div className="w-fit bg-black mt-6 py-2 px-3">
              <Link
              href="/contact">
                <a className="font-montserrat uppercase tracking-wide font-medium text-white leading-7">Contact me</a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default About