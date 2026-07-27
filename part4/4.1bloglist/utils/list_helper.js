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

const mostBlogs = blogPosts => {
  let blogAuthors = []

  blogPosts.forEach(blogPost => {
    const findIndex = blogAuthors.findIndex(blogAuthor => blogAuthor.author === blogPost.author)

    if (findIndex === -1) {
      blogAuthors.push({
        author: blogPost.author,
        blogs: 1
      })
    } else {
      blogAuthors[findIndex].blogs++
    }
  })

  let winnerBlog = {}
  blogAuthors.forEach(blogAuthor => {
    if (blogAuthor.blogs > (winnerBlog?.blogs || 0)) {
      winnerBlog = blogAuthor
    }
  })

  return winnerBlog || {}
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }