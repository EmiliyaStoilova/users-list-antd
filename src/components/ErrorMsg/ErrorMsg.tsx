import { Empty } from "antd";
import React from "react";

export const ErrorMsg = () => {
  return (
    <Empty
      image="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freeiconspng.com%2Fimages%2Ferror&psig=AOvVaw1LV7i4rwj4nbpOnfQ2rkXJ&ust=1701785490486000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMizlJD79YIDFQAAAAAdAAAAABAY"
      description={<p>Something went wrong! Please try again later.</p>}
    />
  );
};
