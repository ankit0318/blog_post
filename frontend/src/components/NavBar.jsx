import { useNavigate, Link } from "react-router-dom";

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
      <Link to="/" style={{ marginRight: "10px" }}>
        Home
      </Link>
      {isLoggedIn ? (
        <>
          <Link to="/profile" style={{ marginRight: "10px" }}>
            Profile
          </Link>
          <Link to="/create" style={{ marginRight: "10px" }}>
            Create Post
          </Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ marginRight: "10px" }}>
            Login
          </Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

export default NavBar;
