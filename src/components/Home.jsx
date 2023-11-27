import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userEmailState } from "../store/selectors/userEmailState";
const Home = () => {
  const navigate = useNavigate();
  const username = useRecoilValue(userEmailState);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        minWidth: "100vw",
        minHeight: "100vh",
        paddingTop: "-100px",
        backgroundColor: "white",
      }}
    >
      <Grid
        container
        style={{
          padding: "2vw",
          margin: "5vw",
        }}
      >
        <Grid item lg={12} md={12} sm={12}>
          <img
            style={{ marginTop: "-100px" }}
            src="https://img-c.udemycdn.com/notices/web_carousel_slide/image/cda48665-0e6b-44a4-bd7f-95a869c815f8.jpg"
            alt=""
          />
        </Grid>
        <Grid item lg={6} md={12} sm={12}>
          <Typography
            variant="h2"
            style={{
              textDecoration: "underline",
              fontWeight: "bolder",
            }}
          >
            Code It Up
          </Typography>

          <Typography style={{ margin: "20px 0px" }} variant="h4">
            Learning is the lifelong process of acquiring knowledge, skills, and
            understanding through diverse experiences, teachings, and
            interactions.
          </Typography>
          {!username && (
            <div>
              <Button
                style={{ marginRight: "20px" }}
                variant="contained"
                onClick={() => navigate("/signup")}
              >
                Signup
              </Button>
              <Button variant="contained" onClick={() => navigate("/signin")}>
                Signin
              </Button>
            </div>
          )}
        </Grid>
        <Grid item lg={6} md={12} sm={12}>
          <img
            style={{
              width: "690px",
              marginRight: "100px",
            }}
            src="https://res.cloudinary.com/people-matters/image/upload/q_auto,f_auto/v1511848673/1511848671.jpg"
            alt=""
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
