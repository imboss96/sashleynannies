import { Link } from 'react-router-dom'
import { blogPosts } from '../config/blogPosts'

export default function BlogPage() {
  return (
    <>
      <section className="page-hero blog-hero">
        <div className="container">
          <span className="eyebrow">Sashley Nannies journal</span>
          <h1>Guides to finding the right care for your home</h1>
          <p>Practical advice for Nairobi families planning childcare, choosing a nanny and setting clear household expectations.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="blog-grid">
            {blogPosts.map((post) => (
              <article className="blog-card" key={post.slug}>
                <p className="blog-card-meta">
                  <span>{post.readTime}</span>
                  <span aria-hidden="true">·</span>
                  <span>Nairobi family guide</span>
                </p>
                <h2><Link to={`/blog/${post.slug}`}>{post.title}</Link></h2>
                <p>{post.excerpt}</p>
                <Link className="blog-read-link" to={`/blog/${post.slug}`}>
                  Read the guide <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
