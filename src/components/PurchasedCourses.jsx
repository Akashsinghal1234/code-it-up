import { Card, Typography, Button, CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState(null);
  // const isCourseLoading = useRecoilValue(courseLoadingState);
  useEffect(() => {
    axios
      .get("http://localhost:3000/user/purchasedCourses", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => res.data)
      .then((data) => {
        // console.log(data);
        setCourses(data.purchasedCourses);
      });
  }, []);

  return (
    <div>
      <Typography
        style={{ textDecoration: "underline", fontWeight: "bolder" }}
        textAlign={"center"}
        variant="h3"
      >
        Purchased Courses
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {courses ? (
          courses.map((course) => {
            return (
              <div key={course._id}>
                <Card
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    maxWidth: "600px",
                    maxHeight: "600px",
                    padding: 20,
                    margin: 20,
                    borderRadius: "40px",
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  }}
                  variant="outlined"
                >
                  <img
                    style={{ maxWidth: "400px", marginBottom: "5px" }}
                    src={course.imageLink}
                    alt=""
                  />
                  <Typography style={{ marginBottom: "5px" }} variant="h5">
                    {course.title}
                  </Typography>
                  <Typography
                    style={{ marginBottom: "5px" }}
                    variant="subtitle1"
                  >
                    {course.description}
                  </Typography>
                  {/* <Typography
                    style={{ marginBottom: "5px" }}
                    variant="subtitle2"
                  >
                    Rs. {course.price}
                  </Typography> */}
                  <Button
                    onClick={() => navigate("/learn/" + course._id)}
                    variant="contained"
                    style={{ marginRight: "10px" }}
                  >
                    Start Learning
                  </Button>
                </Card>
              </div>
            );
          })
        ) : (
          <CircularProgress color="success" />
        )}
      </div>
    </div>
  );
};

export default Courses;
