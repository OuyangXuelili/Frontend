import "./App.css";
import React, { useState, useEffect } from "react";
import { Grid, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import LoginRegister from "./components/LoginRegister";
import AddPhoto from "./components/AddPhoto";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TopBar user={user} setUser={setUser} />
          </Grid>
          <div className="main-topbar-buffer" />
          {user ? (
            <>
              <Grid item sm={3}>
                <Paper className="main-grid-item">
                  <UserList />
                </Paper>
              </Grid>
              <Grid item sm={9}>
                <Paper className="main-grid-item">
                  <Routes>
                    <Route path="/users/:userId" element={<UserDetail />} />
                    <Route path="/photos/:userId" element={<UserPhotos user={user} />} />
                    <Route path="/add-photo" element={<AddPhoto user={user} />} />
                    <Route path="*" element={<Navigate to={`/users/${user._id}`} />} />
                  </Routes>
                </Paper>
              </Grid>
            </>
          ) : (
            <Grid item xs={12}>
              <LoginRegister setUser={setUser} />
            </Grid>
          )}
        </Grid>
      </div>
    </Router>
  );
};

export default App;
