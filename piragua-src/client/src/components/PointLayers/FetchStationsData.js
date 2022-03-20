import React from "react";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const error = false;
if (error) {
  return <Alert variant="danger">There is a problem</Alert>;
}
if (!data) {
  return (
    <Spinner
      animation="border"
      variant="danger"
      role="status"
      style={{
        width: "300px",
        height: "300px",
        margin: "auto",
        display: "block",
      }}
    />
  );
}
