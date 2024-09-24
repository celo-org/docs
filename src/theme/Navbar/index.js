import React from "react";
import Navbar from "@theme-original/Navbar";
import AskCookbook from "@cookbookdev/docsbot/react";


const COOKBOOK_PUBLIC_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWRkMGIyNGRkNGUyMjU1NmM4NGM3MzMiLCJpYXQiOjE3MDg5ODUxMjQsImV4cCI6MjAyNDU2MTEyNH0.8mR88RgXUgi8hKxiswE9kg7VnheRpGpbmlz3KW_Wln4"

export default function NavbarWrapper(props) {
  return (
    <>
      <Navbar {...props} />
      <AskCookbook apiKey={COOKBOOK_PUBLIC_API_KEY} />
    </>
  );
}
