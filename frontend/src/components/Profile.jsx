// Profile.jsx - shows user profile info
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch profile");
        return res.json();
      })
      .then((data) => setProfile(data))
      .catch((err) => setError(err.message));
  }, [navigate]);

  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!profile) return <div>Loading...</div>;

  // Get initials for avatar
  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="profile-card">
      <div className="profile-avatar">{getInitials(profile.name)}</div>
      <h2>Profile</h2>
      <div className="profile-details">
        <div>
          <strong>ID:</strong> {profile.id}
        </div>
        <div>
          <strong>Name:</strong> {profile.name}
        </div>
        <div>
          <strong>Email:</strong> {profile.email}
        </div>
      </div>
    </div>
  );
}

export default Profile;
