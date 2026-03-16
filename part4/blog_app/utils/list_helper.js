const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  return blogs.reduce((fav, blog) => blog.likes > fav.likes ? blog : fav)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const blogCounts = blogs.reduce((counts, blog) => {
    counts[blog.author] = (counts[blog.author] || 0) + 1
    return counts
  }, {})

  const topAuthor = Object.entries(blogCounts)
    .reduce((top, [author, count]) => count > top.blogs ? { author, blogs: count } : top,
      { author: null, blogs: 0 })

  return topAuthor
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const likeCounts = blogs.reduce((counts, blog) => {
    counts[blog.author] = (counts[blog.author] || 0) + blog.likes
    return counts
  }, {})

  const topAuthor = Object.entries(likeCounts)
    .reduce((top, [author, likes]) => likes > top.likes ? { author, likes } : top,
      { author: null, likes: 0 })

  return topAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}