const Dropdown = ({ blogs, setBlogs }) => {
  const changeSort = e => {
    const selectedOption = e.target.value
    switch (selectedOption) {
      case "likes":
        setBlogs(blogs.toSorted((a, b) => b.likes - a.likes))
        break
      default:
        setBlogs(blogs.toSorted((a, b) => a[selectedOption].toUpperCase() < b[selectedOption].toUpperCase() ? -1 : 1))
    }
  }

  return (
    <form onChange={changeSort}>
      sort by:
      <select name="sort" defaultValue="likes">
        <option value="title">title</option>
        <option value="author">author</option>
        <option value="likes">most likes</option>
      </select>
    </form>
  )
}

export default Dropdown