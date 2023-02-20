import { renderMetaTags, useQuerySubscription, StructuredText, Image } from "react-datocms"
import Head from "next/head"
import { Layout } from "@/components/layout"
import { Blocks } from "@/components/utils"
import { request } from "@/lib/datocms"
import { metaTagsFragment, heroFragment, responsiveImageFragment, galleryRecordFragment, introRecordFragment } from "@/lib/fragments"
import Link from "next/link"

export async function getStaticPaths() {
  const data = await request({ query: `{ allServices { slug } }` });

  return {
    paths: data.allServices.map((service) => `/services/${service.slug}`),
    fallback: false,
  };
}

export async function getStaticProps({ params, preview = false }) {
  const graphqlRequest = {
    query: `
      query ServiceBySlug($slug: String) {
        site: _site {
          favicon: faviconMetaTags {
            ...metaTagsFragment
          }
        }
        service(filter: {slug: {eq: $slug}}) {
          seo: _seoMetaTags {
            ...metaTagsFragment
          }
          title
          slug
          service {
            ... on HeroRecord {
              ...heroFragment
            }
            ... on GalleryRecord {
              ...galleryRecordFragment
            }
            ... on IntroRecord {
              ...introRecordFragment
            }
          }
          content {
            value
            blocks {
              id
              __typename
              ... on ImageRecord {
                image {
                  responsiveImage {
                    ...responsiveImageFragment
                  }
                }
              }
            }
          }
        }
      }
      ${metaTagsFragment}
      ${heroFragment}
      ${responsiveImageFragment}
      ${galleryRecordFragment}
      ${introRecordFragment}
    `,
    preview,
    variables: {
      slug: params.slug,
    },
  };

  return {
    props: {
      subscription: preview
        ? {
            ...graphqlRequest,
            initialData: await request(graphqlRequest),
            token: process.env.NEXT_DATOCMS_API_TOKEN,
          }
        : {
            enabled: false,
            initialData: await request(graphqlRequest),
          },
      preview,
    },
  };
}


export const Service = ({ subscription, preview }) => {
  const { data } = useQuerySubscription(subscription);

  return (
    <Layout preview={preview}>
      <Head>
        {renderMetaTags(data.service.seo.concat(data.site.favicon))}
      </Head>
      <div className="inline-block mb-10">
        <Link href="/services">
          <a className="uppercase tracking-widest font-montserrat hover:underline underline-offset-4 transition-all duration-200 font-medium">
            Services
          </a>
        </Link>
      </div>
      <Blocks blocks={data.service.service} />
      <div className="py-10 prose prose-p:font-montserrat prose-p:text-base max-w-none mx-auto prose-headings:max-w-3xl prose-headings:mx-auto prose-p:max-w-3xl prose-p:mx-auto prose-headings:font-miracle prose-headings:tracking-widest prose-headings:mt-0 prose-h1:text-5xl prose-h2:text-3xl prose-h2:pt-4 prose-h2:uppercase prose-h4:text-2xl">
        <StructuredText
          data={data.service.content}
          renderBlock={({ record }) => {
            switch (record.__typename) {
              case 'ImageRecord':
                return (
                  <Image data={record.image.responsiveImage} className="not-prose my-10" />
                )
              default:
                return null;
            }
          }} 
        />
      </div>
    </Layout>
  )
}
  
export default Service