import {
  Button,
  TextField,
  Card,
  Typography,
  Alert,
  AlertTitle,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atom/user";
import { useNavigate } from "react-router-dom";
export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);
  const handleUsernameInput = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };
  const handleSignIn = () => {
    axios
      .post("http://localhost:3000/user/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        localStorage.setItem("token", "Bearer " + data.token);
        setUser({
          isLoading: false,
          userEmail: username,
        });
        navigate("/courses");
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        paddingTop: "50px",
      }}
    >
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h5" style={{ fontWeight: "bold" }}>
            Welcome Back. Sign in below.
          </Typography>
        </div>
        <br />
        {error && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        )}
        <br />
        <Card variant="outlined" style={{ width: 400, padding: 50 }}>
          <TextField
            onChange={handleUsernameInput}
            fullWidth
            label="Username"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            onChange={handlePasswordInput}
            fullWidth
            id="outlined-basic"
            type="password"
            label="Password"
            variant="outlined"
          />
          <br />
          <br />
          <br />

          <Button variant="contained" onClick={handleSignIn}>
            Signin
          </Button>
        </Card>
      </div>
    </div>
  );
};
