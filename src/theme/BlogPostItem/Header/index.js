import GoBackBtn from "@site/src/components/GoBackBtn";
import Header from "@theme-original/BlogPostItem/Header";
import React from "react";

export default function HeaderWrapper(props) {
  return (
    <>
      <GoBackBtn />
      <Header {...props} />
    </>
  );
}
