export const site = {
  name: 'Diesel Part Source',
  company: {
    legalName: 'Shanghai Diesel Part Source Co., Ltd.',
    legalNameEn: 'Shanghai Diesel Part Source Co., Ltd.',
  },
  url: 'https://dieselpartsource.com',
  email: 'charles@dieselpartsource.com',
  phone: '+8615921981299',
  whatsapp: '+8615921981299',
  tagline: 'Verified Engine Parts | Fast Global Delivery',
  logo: {
    default: '/logo.png',
    compact: '/logo.png',
    icon: '/logo.png',
    width: 2076,
    height: 758,
  },
  /** Set your GA4 Measurement ID (e.g. G-XXXXXXXX) to enable analytics. Leave empty to disable. */
  gaMeasurementId: 'G-WFJ59G7FKN',
  /** Paste the content value from Google Search Console HTML verification. Leave empty to skip. */
  googleSiteVerification: 'RqNtSOYc73P2ni6Y1FZl1tsK9INXgsi5qOE2HtyIdIY',
  /** Google Tag Manager container ID (e.g. GTM-XXXXXXX). Leave empty to disable GTM. */
  gtmContainerId: '',
  social: {
    /** Company LinkedIn — set here or via PUBLIC_LINKEDIN_URL in .env */
    linkedin:
      (typeof import.meta.env.PUBLIC_LINKEDIN_URL === 'string' && import.meta.env.PUBLIC_LINKEDIN_URL.trim()) ||
      '',
    /** Factory tour video — matches quality.inspectionMedia.youtubeVideoId. */
    youtube: 'https://www.youtube.com/watch?v=M7uJEbDD-_8',
  },
  /** Author external profiles — fill URLs when live; used in Person schema sameAs */
  authorSocial: {
    weiChenLinkedIn:
      (typeof import.meta.env.PUBLIC_AUTHOR_WEI_CHEN_LINKEDIN === 'string' &&
        import.meta.env.PUBLIC_AUTHOR_WEI_CHEN_LINKEDIN.trim()) ||
      '',
    lisaHuangLinkedIn:
      (typeof import.meta.env.PUBLIC_AUTHOR_LISA_HUANG_LINKEDIN === 'string' &&
        import.meta.env.PUBLIC_AUTHOR_LISA_HUANG_LINKEDIN.trim()) ||
      '',
  },
  /**
   * Quality claims shown on site — keep wording accurate.
   * Set iso9001CertNumber / iso9001CertBody when you hold a direct certificate;
   * otherwise we state partner-facility ISO 9001 (default).
   */
  quality: {
    iso9001Label: 'ISO 9001 Partner Facilities',
    iso9001Description:
      'Engine parts are sourced through reviewed suppliers and manufacturing partners. We document part-number checks, supplier communication, packing requirements, and shipment details for qualified inquiries.',
    iso9001CertNumber: '',
    iso9001CertBody: '',
    /** Shown on certifications when no direct cert number is on file. */
    iso9001VerificationNote:
      'Available supplier documents and quality notes can be requested for qualified parts inquiries.',
    /** Industry workflows we support — link to /certifications/ pages, not cert claims we cannot verify. */
    industryPrograms: [
      { label: 'Marine engine service', href: '/industries/marine/' },
      { label: 'Power generation parts', href: '/industries/power-generation/' },
      { label: 'Industrial engine maintenance', href: '/industries/industrial-engines/' },
      { label: 'Rail engine parts', href: '/industries/rail/' },
      { label: 'Shipyard repair support', href: '/industries/shipyards-repair/' },
    ],
    /** Optional YouTube tour (fills VideoObject on proof pages). */
    inspectionMedia: {
      /** YouTube video ID only (not full URL). Leave empty to hide embed. */
      youtubeVideoId: 'M7uJEbDD-_8',
    },
  },
  defaultDescription:
    'Diesel Part Source supports verified MTU, Detroit Diesel, Cummins, and DEUTZ engine parts sourcing for marine, industrial, rail, and power generation applications with global delivery from Shanghai.',
};

const organizationLogoUrl = `${site.url}/logo.png`;

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.company.legalNameEn,
  alternateName: [site.name, site.company.legalName],
  url: site.url,
  email: site.email,
  telephone: site.phone,
  description: site.defaultDescription,
  logo: organizationLogoUrl,
  areaServed: 'Worldwide',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Room A102, No. 399 Hengnan Road, Pujiang Town, Minhang District',
    addressLocality: 'Shanghai',
    addressRegion: 'Shanghai',
    addressCountry: 'CN',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: site.email,
      telephone: site.phone,
      areaServed: 'Worldwide',
      availableLanguage: ['English', 'Chinese'],
    },
  ],
  knowsAbout: [
    'MTU Engine Parts',
    'Detroit Diesel Parts',
    'Cummins Engine Parts',
    'DEUTZ Engine Parts',
    'Marine Engine Service',
    'Industrial Engine Service',
  ],
  // sameAs is populated only with non-empty social URLs to avoid emitting empty links.
  ...(Object.values(site.social).some(Boolean)
    ? { sameAs: Object.values(site.social).filter(Boolean) }
    : {}),
};

/** schema.org Service markup for capability/service detail pages. */
export function serviceSchema(service: {
  name: string;
  description: string;
  url: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.name,
    name: service.name,
    description: service.description,
    url: service.url,
    ...(service.image ? { image: service.image } : {}),
    provider: {
      '@type': 'Organization',
      name: site.name,
      url: site.url,
    },
    areaServed: 'Worldwide',
  };
}

/** schema.org Product markup for engine parts and quote-based spare-parts inquiries. */
export function productSchema(product: {
  name: string;
  description: string;
  url: string;
  image: string;
  material?: string;
  sku?: string;
  model?: string;
  brandName?: string;
  category?: string;
  /** schema.org Offer availability URL; defaults to InStock when omitted. */
  availability?: string;
}) {
  const description = product.material
    ? `${product.description} Reference groups: ${product.material}.`
    : product.description;
  const sku = product.sku ?? product.model;
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description,
    url: product.url,
    image: product.image,
    brand: {
      '@type': 'Brand',
      name: product.brandName ?? site.name,
    },
    ...(product.category ? { category: product.category } : {}),
    manufacturer: {
      '@type': 'Organization',
      name: site.name,
      url: site.url,
    },
    offers: {
      '@type': 'Offer',
      url: product.url,
      priceCurrency: 'USD',
      availability: product.availability ?? 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      description:
        'Quote based on part number, engine model, serial number, quantity, stock status, and shipping destination.',
      seller: {
        '@type': 'Organization',
        name: site.name,
        url: site.url,
      },
    },
    ...(sku
      ? {
          sku,
          mpn: sku,
          model: product.model ?? sku,
        }
      : {}),


  };
}

/** schema.org FAQPage markup for pages with Q&A sections. */
export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** schema.org AboutPage for the company / E-E-A-T landing page. */
export function aboutPageSchema(page: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: page.name,
    description: page.description,
    url: page.url,
    isPartOf: {
      '@type': 'WebSite',
      name: site.name,
      url: site.url,
    },
    mainEntity: {
      '@type': 'Organization',
      name: site.company.legalNameEn,
      alternateName: [site.name, site.company.legalName],
      url: site.url,
      email: site.email,
      telephone: site.phone,
      description: site.defaultDescription,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Room A102, No. 399 Hengnan Road, Pujiang Town, Minhang District',
        addressLocality: 'Shanghai',
        addressRegion: 'Shanghai',
        postalCode: '201112',
        addressCountry: 'CN',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: site.email,
        telephone: site.phone,
        areaServed: 'Worldwide',
        availableLanguage: ['English', 'Chinese'],
      },
    },
  };
}

/** schema.org ContactPage for the RFQ / contact landing page. */
export function contactPageSchema(page: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: page.name,
    description: page.description,
    url: page.url,
    isPartOf: {
      '@type': 'WebSite',
      name: site.name,
      url: site.url,
    },
    about: {
      '@type': 'Organization',
      name: site.company.legalNameEn,
      alternateName: [site.name, site.company.legalName],
      url: site.url,
      email: site.email,
      telephone: site.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Room A102, No. 399 Hengnan Road, Pujiang Town, Minhang District',
        addressLocality: 'Shanghai',
        addressRegion: 'Shanghai',
        postalCode: '201112',
        addressCountry: 'CN',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: site.email,
        telephone: site.phone,
        areaServed: 'Worldwide',
        availableLanguage: ['English', 'Chinese'],
      },
    },
  };
}

/** schema.org HowTo for inquiry / fulfillment process steps. */
export function howToSchema(howto: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: howto.name,
    description: howto.description,
    step: howto.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

/** schema.org ItemList for collection pages. */
export function itemListSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

/** schema.org VideoObject for embedded factory / process videos. */
export function videoSchema(video: {
  name: string;
  description: string;
  thumbnailUrl: string;
  contentUrl?: string;
  embedUrl?: string;
  uploadDate?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.name,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl,
    ...(video.contentUrl ? { contentUrl: video.contentUrl } : {}),
    ...(video.embedUrl ? { embedUrl: video.embedUrl } : {}),
    ...(video.uploadDate ? { uploadDate: video.uploadDate } : {}),
    publisher: {
      '@type': 'Organization',
      name: site.name,
      logo: {
        '@type': 'ImageObject',
        url: organizationLogoUrl,
      },
    },
  };
}

/** schema.org Article markup for customer case study detail pages. */
export function caseStudySchema(study: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  industry: string;
  authorName: string;
  authorUrl: string;
  authorJobTitle: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: study.title,
    description: study.description,
    image: study.image,
    datePublished: study.datePublished,
    ...(study.dateModified ? { dateModified: study.dateModified } : {}),
    articleSection: study.industry,
    about: {
      '@type': 'Thing',
      name: `${study.industry} engine parts`,
    },
    author: {
      '@type': 'Person',
      name: study.authorName,
      url: study.authorUrl,
      jobTitle: study.authorJobTitle,
      worksFor: {
        '@type': 'Organization',
        name: site.name,
        url: site.url,
      },
    },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      url: site.url,
      logo: {
        '@type': 'ImageObject',
        url: organizationLogoUrl,
      },
    },
    mainEntityOfPage: study.url,
  };
}

export function articleSchema(article: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  authorUrl?: string;
  authorJobTitle?: string;
  authorSameAs?: string[];
  authorType?: 'Person' | 'Organization';
}) {
  const authorType = article.authorType ?? 'Organization';
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.datePublished,
    ...(article.dateModified ? { dateModified: article.dateModified } : {}),
    author: {
      '@type': authorType,
      name: article.authorName,
      ...(article.authorUrl ? { url: article.authorUrl } : {}),
      ...(authorType === 'Person' && article.authorJobTitle
        ? { jobTitle: article.authorJobTitle }
        : {}),
      ...(article.authorSameAs?.length ? { sameAs: article.authorSameAs } : {}),
      ...(authorType === 'Person'
        ? {
            worksFor: {
              '@type': 'Organization',
              name: site.name,
              url: site.url,
            },
          }
        : {}),
    },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      logo: {
        '@type': 'ImageObject',
        url: organizationLogoUrl,
      },
    },
    mainEntityOfPage: article.url,
  };
}

export function personProfileSchema(person: {
  name: string;
  jobTitle: string;
  description: string;
  url: string;
  sameAs?: string[];
  knowsAbout?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name: person.name,
    description: person.description,
    url: person.url,
    mainEntity: {
      '@type': 'Person',
      name: person.name,
      jobTitle: person.jobTitle,
      description: person.description,
      url: person.url,
      ...(person.sameAs?.length ? { sameAs: person.sameAs } : {}),
      ...(person.knowsAbout?.length ? { knowsAbout: person.knowsAbout } : {}),
      worksFor: {
        '@type': 'Organization',
        name: site.name,
        url: site.url,
      },
    },
  };
}
