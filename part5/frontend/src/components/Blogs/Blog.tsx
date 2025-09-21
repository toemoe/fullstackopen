interface BlogProps {
  blog: {
    title: string;
    author: string;
  };
}

const Blog = ({ blog }: BlogProps) => {
  return (
    <div >
      {blog.title} {blog.author}
    </div> 
  )
}

export default Blog