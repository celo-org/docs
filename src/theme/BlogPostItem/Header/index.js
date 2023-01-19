import BreadCrumbs from "@site/src/components/BreadCrumbs";
import GoBackBtn from "@site/src/components/GoBackBtn";
import Header from "@theme-original/BlogPostItem/Header";
import React from "react";

export default function HeaderWrapper(props) {
  return (
    <>
      <GoBackBtn />
      <BreadCrumbs title="Hello world" />
      <Header {...props} />
    </>
  );
}
