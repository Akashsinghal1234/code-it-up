import { Card, Typography, Button, CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState(null);
  const handlePurchaseCourse = (courseId) => {
    axios
      .post(
        `http://localhost:3000/user/courses/${courseId}`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => res.data)
      .then((data) => {
        alert("course purchased.");
      });
  };
  const handleAddToCart = (courseId) => {
    axios
      .post(
        `http://localhost:3000/user/add/cart/${courseId}`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => res.data)
      .then((data) => {
        alert("course added to the cart.");
      });
  };
  useEffect(() => {
    axios
      .get("http://localhost:3000/user/courses", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => res.data)
      .then((data) => {
        // console.log(data);
        setCourses(data.courses);
      });
  }, []);

  return (
    <div>
      <Typography
        style={{ textDecoration: "underline", fontWeight: "bolder" }}
        textAlign={"center"}
        variant="h3"
      >
        Courses
      </Typography>
      <img
        style={{ paddingLeft: "3vw", marginTop: "10px" }}
        src="https://img-c.udemycdn.com/notices/web_carousel_slide/image/cda48665-0e6b-44a4-bd7f-95a869c815f8.jpg"
        alt=""
      />
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
                    maxWidth: "25vw",
                    minWidth:"25vw",
                    maxHeight: "72vh",
                    minHeight:"60vh",
                    padding: 20,
                    margin: 20,
                    borderRadius: "40px",
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  }}
                  variant="outlined"
                >
                  <img
                    style={{ maxWidth: "25vw", marginBottom: "5px" , maxHeight:"25vh"}}
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
                  <Typography
                    style={{ marginBottom: "5px" }}
                    variant="subtitle2"
                  >
                    Rs. {course.price}
                  </Typography>
                  <Button
                    onClick={() => handleAddToCart(course._id)}
                    variant="contained"
                    style={{ marginRight: "10px", marginBottom: "10px" }}
                  >
                    Add To Cart
                  </Button>
                  <Button
                    onClick={() => handlePurchaseCourse(course._id)}
                    variant="contained"
                    style={{ marginRight: "10px" }}
                  >
                    Buy
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
