/**
 * Renders a JSON-LD script tag for schema.org markup.
 * Use inside any page/component — Next renders it server-side.
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // The payload comes from typed helpers in lib/seo.ts, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
