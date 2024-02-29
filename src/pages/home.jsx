// Home.js
import React, { useState } from "react";
import "./home.css";
import { Document, Page } from "react-pdf";
const pdfUrl = require(`../assets/TestPDFfile.pdf`);
function Home() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
      }}
    >
      <embed id="frPDF" height="100%" width="100%" src={pdfUrl}></embed>
    </div>
  );
}

export default Home;
