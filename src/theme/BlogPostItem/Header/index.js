import Link from "@docusaurus/Link";
import Header from "@theme-original/BlogPostItem/Header";
import React from "react";

export default function HeaderWrapper(props) {
  return (
    <>
      <Link href="/tutorials">Go back</Link>
      <Header {...props} />
    </>
  );
}
