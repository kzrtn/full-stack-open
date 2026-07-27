const dummy = blogs => {
  return 1
}

const totalLikes = blogPosts => {
  return blogPosts.reduce((sum, post) => sum + post.likes, 0)
}

const favoriteBlog = blogPosts => {
  let winnerBlog = {}

  blogPosts.forEach(blogPost => {
    if (blogPost?.likes > (winnerBlog?.likes || 0)) {
      winnerBlog = blogPost
    }
  })

  return winnerBlog
}

module.exports = { dummy, totalLikes, favoriteBlog }