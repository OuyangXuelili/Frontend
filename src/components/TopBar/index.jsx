import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import BASE_URL from "../../config"; // ✅ thêm dòng này
import "./styles.css";

function TopBar({ user, setUser }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [rightContent, setRightContent] = useState("");

  useEffect(() => {
    if (location.pathname === "/users") {
      setRightContent("User List");
    } else if (
      location.pathname.startsWith("/users/") ||
      location.pathname.startsWith("/photos/")
    ) {
      const parts = location.pathname.split("/");
      const userId = parts[2];

      fetchModel(`/api/user/${userId}`)
        .then((user) => {
          if (location.pathname.startsWith("/users/")) {
            setRightContent(`Details of ${user.first_name} ${user.last_name}`);
          } else {
            setRightContent(`Photos of ${user.first_name} ${user.last_name}`);
          }
        })
        .catch((err) => {
          console.error("Failed to fetch user for TopBar", err);
          setRightContent("User");
        });
    } else {
      setRightContent("");
    }
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      const res = await fetch(`${BASE_URL}/admin/logout`, {
        method: "POST",
        credentials: "include"
      });

      if (res.ok) {
        setUser(null);
        navigate("/");
      }
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" color="inherit">
          {user ? `Hi ${user.first_name}` : "Please Login"}
        </Typography>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Typography variant="body1" color="inherit">
            {rightContent}
          </Typography>
          {user && (
            <>
              <Button color="inherit" onClick={() => navigate("/add-photo")}>
                Add Photo
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
