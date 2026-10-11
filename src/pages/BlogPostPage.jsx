import { Link, useParams } from 'react-router-dom'
import NotFoundPage from './NotFoundPage'
import { blogPosts } from '../config/blogPosts'

function formatDate(date) {
  return new Intl.DateTimeFormat('en-KE', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`))
}

export default function BlogPostPage() {
  const { slug } = useParams()
  const post = blogPosts.find((item) => item.slug === slug)

  if (!post) return <NotFoundPage />

  return (
    <article className="blog-article">
      <header className="page-hero blog-hero">
        <div className="container">
          <span className="eyebrow">Nairobi family guide · {post.readTime}</span>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
          <p className="blog-published">
            Published <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          </p>
        </div>
      </header>
      <div className="container blog-article-layout">
        <div className="blog-article-content">
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets && (
                <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
              )}
            </section>
          ))}
          <aside className="blog-article-cta">
            <h2>Looking for childcare support in Nairobi?</h2>
            <p>Tell us about your household, schedule and the role you need help with.</p>
            <Link className="btn btn-primary" to="/contact">Discuss your needs</Link>
            <Link className="blog-related-link" to={post.relatedLink.to}>{post.relatedLink.label}</Link>
          </aside>
          <Link className="blog-back-link" to="/blog">← More family care guides</Link>
        </div>
      </div>
    </article>
  )
}
