import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

function PostView() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [cover, setCover] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    fetch(`http://localhost:5000/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setTitle(data.title);
        setContent(data.content);
      });
  }, [id]);

  const handleEdit = () => setEditing(true);
  const handleCancel = () => {
    setEditing(false);
    setTitle(post.title);
    setContent(post.content);
    setCover(null);
    setError("");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (cover) formData.append("cover_image", cover);
    try {
      const res = await fetch(`http://localhost:5000/posts/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (res.ok) {
        const updated = await res.json();
        setPost(updated);
        setEditing(false);
        setCover(null);
      } else {
        const data = await res.json();
        setError(data.message || "Failed to update post");
      }
    } catch {
      setError("Failed to update post");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in");
      return;
    }
    try {
      const res = await fetch(`http://localhost:5000/posts/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        navigate("/");
      } else {
        const data = await res.json();
        setError(data.message || "Failed to delete post");
      }
    } catch {
      setError("Failed to delete post");
    }
  };

  if (!post) return <div>Loading...</div>;

  if (editing) {
    return (
      <div>
        <h2>Edit Post</h2>
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCover(e.target.files[0])}
          />
          <button type="submit">Update</button>
          <button
            type="button"
            onClick={handleCancel}
            style={{ marginLeft: 8 }}
          >
            Cancel
          </button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    );
  }

  return (
    <div>
      <h2>{post.title}</h2>
      <p>
        By {post.author_name} ({post.author_email})
      </p>
      {post.cover_image && (
        <img
          src={`http://localhost:5000/uploads/${post.cover_image}`}
          alt="cover"
          style={{ maxWidth: "300px" }}
        />
      )}
      <p>{post.content}</p>
      <p>
        <i>Created: {new Date(post.created_at).toLocaleString()}</i>
      </p>
      <p>
        <i>Updated: {new Date(post.updated_at).toLocaleString()}</i>
      </p>
      <a href="/">Back to posts</a>
      {isLoggedIn && (
        <>
          <button onClick={handleEdit} style={{ marginLeft: 8 }}>
            Edit
          </button>
          <button
            onClick={handleDelete}
            style={{ marginLeft: 8, background: "#e53e3e" }}
          >
            Delete
          </button>
        </>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default PostView;
