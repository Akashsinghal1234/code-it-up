import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  Typography,
  TextField,
  Button,
  Grid,
  Skeleton,
} from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { courseState } from "../store/atom/course";
import {
  courseDescriptionState,
  courseDetailsState,
  courseImageState,
  courseLoadingState,
  coursePriceState,
  courseTitleState,
} from "../store/selectors/course";
const UpdateCourse = () => {
  const { courseId } = useParams();
  const setCourse = useSetRecoilState(courseState);
  const isCourseLoading = useRecoilValue(courseLoadingState);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/user/course/${courseId}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => res.data)
      .then((data) => {
        setCourse({
          course: data.course,
          isLoading: false,
        });
      });
  }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        margin: "40px 100px",
      }}
    >
      {isCourseLoading ? (
        <div>
          {/* For variant="text", adjust the height via font-size */}
          <Skeleton animation="wave" variant="text" sx={{ fontSize: "1rem" }} />
          <br />
          {/* For other variants, adjust the size with `width` and `height` */}
          <Skeleton
            animation="wave"
            variant="circular"
            width={40}
            height={40}
          />
          <br />
          <br />
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={210}
            height={60}
          />
          <br />
          <br />
          <Skeleton
            animation="wave"
            variant="rounded"
            width={210}
            height={60}
          />
        </div>
      ) : (
        <Grid container>
          <Grid item lg={8} md={12} sm={12}>
            <UpdateCard />
          </Grid>
          <Grid item lg={4} md={12} sm={12}>
            <CourseCard />
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export const CourseCard = () => {
  const title = useRecoilValue(courseTitleState);
  const description = useRecoilValue(courseDescriptionState);
  const price = useRecoilValue(coursePriceState);
  const image = useRecoilValue(courseImageState);
  return (
    <div>
      <Card
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          maxWidth: "400px",
          maxHeight: "400px",
          padding: 20,
          margin: 20,
          borderRadius: "40px",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        }}
        variant="outlined"
      >
        <img style={{ maxWidth: "400px" }} src={image} alt="" />
        <Typography variant="h5">{title}</Typography>
        <Typography variant="subtitle1">{description}</Typography>
        <Typography variant="subtitle2">Rs. {price}</Typography>
      </Card>
    </div>
  );
};

export const UpdateCard = () => {
  // Use useRecoilValue instead of useRecoilState
  const course = useRecoilValue(courseDetailsState);
  const setCourse = useSetRecoilState(courseState);

  // Use useEffect to update state once course is available
  useEffect(() => {
    if (course) {
      setTitle(course.title);
      setDescription(course.description);
      setPrice(course.price);
      setImageLink(course.imageLink);
    }
  }, [course]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageLink, setImageLink] = useState("");

  const handleUpdateCourse = () => {
    const updatedCourse = {
      ...course,
      title,
      description,
      price,
      imageLink,
    };
    setCourse({
      isLoading: false,
      course: updatedCourse,
    });
    axios
      .put(
        "http://localhost:3000/user/courses/" + course._id,
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
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <Card variant="outlined" style={{ width: 400, padding: 40 }}>
      <Typography variant="h5" style={{ fontWeight: "bold" }}>
        Update Course
      </Typography>
      <br />
      <br />
      <TextField
        fullWidth
        value={title}
        variant="outlined"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <br />
      <br />
      <TextField
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        fullWidth
        id="outlined-basic"
        variant="outlined"
      />
      <br />
      <br />
      <TextField
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
        fullWidth
        id="outlined-basic"
        variant="outlined"
      />
      <br />
      <br />
      <TextField
        value={imageLink}
        onChange={(e) => {
          setImageLink(e.target.value);
        }}
        fullWidth
        id="outlined-basic"
        variant="outlined"
      />
      <br />
      <br />
      <Button variant="contained" onClick={handleUpdateCourse}>
        Update Course
      </Button>
    </Card>
  );
};

export default UpdateCourse;
