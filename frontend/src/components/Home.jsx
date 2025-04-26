import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/posts`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          setPosts([]); // or set an error state
        }
      });
  }, []);
  return (
    <div>
      <h2>All Blog Posts</h2>
      <Link to="/create">Create New Post</Link> 
      <ul>
        {posts.map((post) => (
          <li
            key={post.id}
            onClick={() => navigate(`/posts/${post.id}`)}
            style={{
              marginBottom: "2em",
              listStyle: "none",
              borderBottom: "1px solid #ccc",
              paddingBottom: "1em",
              cursor: "pointer",
            }}
          >
            <div style={{ pointerEvents: "none" }}>
              <span style={{ fontWeight: "bold", fontSize: "1.1em" }}>
                {post.title}
              </span>{" "}
              by {post.author_name}
              {post.cover_image && (
                <div>
                  <img
                    src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${
                      post.cover_image
                    }`}
                    alt="cover"
                    style={{
                      maxWidth: "300px",
                      display: "block",
                      marginTop: "0.5em",
                    }}
                  />
                </div>
              )}
              <p>{post.content}</p>
              <p>
                <i>Created: {new Date(post.created_at).toLocaleString()}</i>
              </p>
              <p>
                <i>Updated: {new Date(post.updated_at).toLocaleString()}</i>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
