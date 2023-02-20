// See: https://www.datocms.com/blog/offer-responsive-progressive-lqip-images-in-2020
export const responsiveImageFragment = `
  fragment responsiveImageFragment on ResponsiveImage {
    srcSet
    webpSrcSet
    sizes
    src
    width
    height
    aspectRatio
    alt
    title
    base64
  }
`

export const metaTagsFragment = `
  fragment metaTagsFragment on Tag {
    attributes
    content
    tag
  }
`

export const headerFragment = `
  fragment headerFragment on HeaderRecord {
    links {
      text
      cta {
        ... on WorkPageRecord {
          _modelApiKey
          title
          slug
        }
        ... on WorkRecord {
          _modelApiKey
          title
          slug
        }
        ... on CatalogueRecord {
          _modelApiKey
          title
          slug
        }
        ... on AboutRecord {
          _modelApiKey
          title
          slug
        }
        ... on ContactRecord {
          _modelApiKey
          title
          slug
        }
      }
    }
  }
`;

export const highlightFragment = `
  fragment highlightFragment on HighlightRecord {
    _modelApiKey
    highlightItems {
      ... on HighlightItemRecord {
        id
        title
        description
      }
    }
  }
`;

export const contactFragment = `
  fragment contactFragment on ContactRecord {
    _modelApiKey
    title
    slug
    content {
      value
    }
    seo: _seoMetaTags {
      ...metaTagsFragment
    }
  }
`;

export const aboutFragment = `
  fragment aboutFragment on AboutRecord {
    _modelApiKey
    title
    slug
    content {
      value
    }
    image {
      responsiveImage {
        ...responsiveImageFragment
      }
    }
    seo: _seoMetaTags {
      ...metaTagsFragment
    }
  }
`;

export const ctaRecordFragment = `
  fragment ctaRecordFragment on CtaRecord {
    _modelApiKey
    text
    cta {
      ... on ServiceRecord {
        _modelApiKey
        title
        slug
      }
      ... on WorkRecord {
        _modelApiKey
        title
        slug
      }
    }
  }
`;

export const heroFragment = `
  fragment heroFragment on HeroRecord {
    _modelApiKey
    title
    cover {
      responsiveImage {
        ...responsiveImageFragment
      }
    }
  }
`;

export const galleryRecordFragment = `
  fragment galleryRecordFragment on GalleryRecord {
    _modelApiKey
    images {
      responsiveImage {
        ...responsiveImageFragment
      }
    }
  }
`;

export const introRecordFragment = `
  fragment introRecordFragment on IntroRecord {
    _modelApiKey
    intro
  }
`;