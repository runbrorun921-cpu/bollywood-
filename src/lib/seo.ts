import { Game, CategoryInfo, BreadcrumbItem } from '../types';

export function updatePageMeta(title: string, description: string, canonicalPath: string = '') {
  document.title = title;

  // Meta description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', description);

  // Open Graph
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', title);

  let ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', description);

  // Canonical Link
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  const cleanPath = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
  canonicalLink.setAttribute('href', `https://bollywoodgame.online${cleanPath === '/' ? '' : cleanPath}`);
}

export function injectStructuredData(schema: object, id: string = 'bollywood-json-ld') {
  let script = document.getElementById(id) as HTMLScriptElement;
  if (!script) {
    script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(schema, null, 2);
}

export function getWebsiteAndOrgSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://bollywoodgame.online/#organization',
        'name': 'BollywoodGame',
        'url': 'https://bollywoodgame.online',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://bollywoodgame.online/logo.png',
          'caption': 'BollywoodGame Online'
        },
        'sameAs': [
          'https://twitter.com/bollywoodgame_on',
          'https://youtube.com/@bollywoodgame'
        ]
      },
      {
        '@type': 'WebSite',
        '@id': 'https://bollywoodgame.online/#website',
        'url': 'https://bollywoodgame.online',
        'name': 'BollywoodGame — Free Online Browser Games',
        'publisher': {
          '@id': 'https://bollywoodgame.online/#organization'
        },
        'potentialAction': {
          '@type': 'SearchAction',
          'target': 'https://bollywoodgame.online/?search={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      }
    ]
  };
}

export function getGameJsonLd(game: Game) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    'name': game.title,
    'description': game.description,
    'genre': [game.category, ...(game.subCategories || [])],
    'image': game.thumbnail,
    'playMode': 'SinglePlayer',
    'applicationCategory': 'Game',
    'operatingSystem': 'Web Browser',
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': (game.rating / 20).toFixed(1), // Scale to 5
      'bestRating': '5',
      'worstRating': '1',
      'ratingCount': Math.round(game.likesCount * 1.5)
    },
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD',
      'availability': 'https://schema.org/InStock'
    },
    'author': {
      '@type': 'Organization',
      'name': game.developer
    }
  };
}

export function getBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, idx) => ({
      '@type': 'ListItem',
      'position': idx + 1,
      'name': item.label,
      'item': `https://bollywoodgame.online${item.url}`
    }))
  };
}

export function getFaqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };
}
