import { JsonLd } from '@/components/seo/json-ld';
import { organizationJsonLd, websiteJsonLd } from '@/lib/seo';
import { SITE } from '@/lib/site';

export function SiteJsonLd() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
    </>
  );
}

export function FooterJsonLd() {
  return null;
}

export { SITE };
