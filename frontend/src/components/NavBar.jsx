import { useNavigate } from "react-router-dom";

function NavBar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav
      style={{
        marginBottom: "20px",
        borderBottom: "1px solid #ccc",
        paddingBottom: "10px",
      }}
    >
      <a href="/" style={{ marginRight: "10px" }}>
        Home
      </a>
      {isLoggedIn ? (
        <>
          <a href="/create" style={{ marginRight: "10px" }}>
            Create Post
          </a>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <a href="/login" style={{ marginRight: "10px" }}>
            Login
          </a>
          <a href="/register">Register</a>
        </>
      )}
    </nav>
  );
}

export default NavBar;
