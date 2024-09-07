import React from 'react';
import html2pdf from 'html2pdf.js';

const PdfComponent = () => {
  const generatePDF = () => {
    const element = document.getElementById('content');
    html2pdf().from(element).save();
  };

  return (
    <div>
      <div id="content">
        <h1>Hello, this will be converted to PDF!</h1>
        <p>This is some example content that will be included in the PDF file.</p>
      </div>
      <button onClick={generatePDF}>Download PDF</button>
    </div>
  );
};

export default PdfComponent;
