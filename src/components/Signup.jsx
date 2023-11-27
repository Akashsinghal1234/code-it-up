import { Button, TextField, Card, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atom/user";
import { useNavigate } from "react-router-dom";
export const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useSetRecoilState(userState);

  const handleSignUp = () => {
    axios
      .post("http://localhost:3000/user/signup", {
        username: username,
        password: password,
      })
      .then((res) => res.data)
      .then((data) => {
        localStorage.setItem("token", "Bearer " + data.token);
        setUser({
          isLoading: false,
          userEmail: username,
        });
        navigate("/courses");
      })
      .catch((error) => {
        console.error("Error:", error);
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
            Welcome to Code It Up. Sign up below.
          </Typography>
        </div>
        <Card variant="outlined" style={{ width: 400, padding: 50 }}>
          <TextField
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            fullWidth
            label="Username"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            fullWidth
            id="outlined-basic"
            type="password"
            label="Password"
            variant="outlined"
          />
          <br />
          <br />
          <br />

          <Button variant="contained" onClick={handleSignUp}>
            Signup
          </Button>
        </Card>
      </div>
    </div>
  );
};
