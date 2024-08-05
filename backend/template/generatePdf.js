const puppeteer = require("puppeteer");

async function generateReportPdf() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  // Load HTML content for the report
  const reportHtml = `
   
<html>
<head>
  <title>Sample Report</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 20px;
    }
    h1 {
      color: #333;
    }
    p {
      color: #555;
      margin-bottom: 10px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #f2f2f2;
    }
  </style>
</head>
<body>

  <h1>Monthly Sales Report</h1>

  <p>Date: January 10, 2024</p>

  <table>
    <thead>
      <tr>
        <th>Product</th>
        <th>Units Sold</th>
        <th>Revenue</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Product A</td>
        <td>150</td>
        <td>$5,000</td>
      </tr>
      <tr>
        <td>Product B</td>
        <td>120</td>
        <td>$4,000</td>
      </tr>
      <tr>
        <td>Product C</td>
        <td>200</td>
        <td>$6,500</td>
      </tr>
    </tbody>
  </table>

  <p>Total Revenue: $15,500</p>

</body>
</html>

  `;
  await page.setContent(reportHtml);

  // Generate PDF for the report
  await page.pdf({ path: "report.pdf", format: "A4" });

  await browser.close();
}

// Call the function to generate a report PDF
generateReportPdf();
