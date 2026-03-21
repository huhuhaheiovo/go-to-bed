export default function PlaceholderPage({ title, description, h1 }) {
  return (
    <section className="container sc-placeholder">
      <h1>{h1 || title}</h1>
      <p>{description}</p>
      <p>Content for this page is being prepared. URL and SEO are live in all locales.</p>
    </section>
  );
}
