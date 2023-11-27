import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Card,
  Typography,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
const Cart = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  const [imageLink, setImageLink] = useState("");
  const [courses, setCourses] = useState(null);
  const handleDeleteCourseFromCart = (courseId) => {
    axios
      .delete(`http://localhost:3000/user/cart/delete/${courseId}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => res.data)
      .then((data) => {
        console.log(localStorage.getItem("token"));
        console.log(data);
      });
  };
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
        // alert("course purchased.");
        const newCourses = courses.filter((course) => course._id !== courseId);
        handleDeleteCourseFromCart(courseId);
        setCourses(newCourses);
      });
  };
  const handleCart = () => {
    axios
      .post(
        "http://localhost:3000/user/cart",
        {
          title,
          description,
          price,
          imageLink,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        alert("course added");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    axios
      .get("http://localhost:3000/user/cart", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => res.data)
      .then((data) => {
        // console.log(data);
        setCourses(data.coursesCart);
      });
  }, []);
  return (
    <div>
      <Typography
        style={{ fontWeight: "bold", textDecoration: "underline" }}
        textAlign={"center"}
        variant="h3"
      >
        Cart
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
                  <Typography
                    style={{ marginBottom: "5px" }}
                    variant="subtitle2"
                  >
                    Rs. {course.price}
                  </Typography>
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

export default Cart;
