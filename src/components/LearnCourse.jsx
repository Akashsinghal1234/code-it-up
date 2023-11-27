import { Card, Typography, Button, CircularProgress } from "@mui/material";
import React from "react";

const Courses = () => {
  return (
    <div>
      <Typography
        style={{
          fontWeight: "bold",
          textAlign: "center",
          color: "rgb(255, 108, 55)",
        }}
        variant="h3"
      >
        Postman API Fundamentals Student Expert Certification
      </Typography>
      <br />
      <hr />
      <br />
      <Typography variant="h4" style={{ textAlign: "center" }}>
        Task: Create a workspace
      </Typography>
      <br />
      <hr />
      <br />
      <div style={{ textAlign: "center" }}>
        <Typography variant="h6">
          Are you ready to become a digital librarian using the
          <span style={{ fontWeight: "bolder" }}> Postman Library API v2</span>?
        </Typography>
        <br />
        <Typography variant="h6">
          This REST API allows you to{" "}
          <span style={{ fontWeight: "bolder", color: "rgb(255, 108, 55)" }}>
            CRUD
          </span>{" "}
          (Create, Read, Update, Delete) books in a public library database. You
          will use Postman to interact with this API and manage books.
        </Typography>
        <br />
        <br />
        <br />
        <Typography variant="h3">Create a workspace</Typography>
        <br />
        <br />
        <br />
        <Typography variant="h6">
          To start making Postman requests, you need to be inside a workspace.
          Let's make one!
        </Typography>
        <br />
        <br />
        <br />
        <br />
        <br />
        <Typography variant="h5">
          1. Workspaces dropdown {"   >   "} Create Workspace
        </Typography>
      </div>
    </div>
  );
};

export default Courses;
