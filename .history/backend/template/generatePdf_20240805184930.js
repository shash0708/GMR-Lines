const puppeteer = require('puppeteer');

  const generatePDF = async (logs) => {
  // Launch Puppeteer
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Define HTML content with dynamic data
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.7.5/css/mdb.min.css" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Logbook</title>
        <style>
            body {
                font-family: 'Garamond';
            }
            .table-container {
                margin: 100px;
            }
            table {
                width: 100%;
                border-collapse: collapse;
            }
            th, td {
                border: 1px solid black;
                padding: 8px;
                text-align: left;
            }
            .wide-column {
                width: 30%; /* Adjust the percentage as needed for colspan */
            }
            .fixed-width {
                width: 7px; /* Fixed width for columns not affected by colspan */
            }
            .fixed-col {
                height: 70px; /* Fixed width for columns not affected by colspan */
            }
        </style>
    </head>
    <body>
        <div class="table-container">
            <table>
                <tr class="fixed-col">
                    <th colspan="11">AIRCRAFT MAINTENANCE ENGINEER'S WORK RECORD/LOGBOOK</th>
                    <th colspan="5">
                        Name<br>
                        Ps<br>
                        Ij
                    </th>
                </tr>
                <tr>
                    <th class="fixed-width">SL NO.</th>
                    <th class="fixed-width">Date & Time</th>
                    <th class="fixed-width">Type of Aircraft/Engine</th>
                    <th class="fixed-width">Aircraft Reg.</th>
                    <th class="fixed-width">ATA Chapter</th>
                    <th class="fixed-width">Work Order No.</th>
                    <th class="wide-column" colspan="5">Maintenance Task</th>
                    <th class="fixed-width">Type of Maintenance</th>
                    <th class="fixed-width">Type of Activity</th>
                    <th class="fixed-width">Category</th>
                    <th class="fixed-width">Duration in Hrs./Days</th>
                    <th colspan="5">Supervisor Name & Sign,AME Licence No</th>
                </tr>
                <tbody>
                    ${logs.map((log, index) => `
                        <tr>
                            <td class="fixed-width">${log.Id}</td>
                            <td class="fixed-width">${new Date(log.createdAt).toLocaleDateString()}</td>
                            <td class="fixed-width">${log.ToA}</td>
                            <td class="fixed-width">${log.Reg}</td>
                            <td class="fixed-width">${log.ATA}</td>
                            <td class="fixed-width">${log.Wo}</td>
                            <td class="wide-column" colspan="5">${log.Mt}</td>
                            <td class="fixed-width">${log.TOM}</td>
                            <td class="fixed-width">${log.TOA}</td>
                            <td class="fixed-width">${log.C}</td>
                            <td class="fixed-width">${log.DU}</td>
                            <td colspan="1">${log.Supervisor}</td>
                        </tr>
                    `).join('')}
                    <tr>
                        <td colspan="2">Date</td>
                        <th colspan="3"></th>
                        <th class="fixed-width"></th>
                        <th colspan="5">Log Book Owner's Signature (*)</th>
                        <th colspan="5"></th>
                    </tr>
                    <tr>
                        <th colspan="16">Blah Blah Blah</th>
                    </tr>
                </tbody>
            </table>
        </div>
    </body>
    </html>
  `;

  // Set the HTML content
  await page.setContent(htmlContent);

  // Define PDF options
  const pdfOptions = {
    format: 'A4',
    margin: {
      top: '20px',
      right: '25px',
      bottom: '20px',
      left: '25px',
    },
  };

  // Generate PDF
  const pdfBuffer = await page.pdf(pdfOptions);

  // Close browser
  await browser.close();

  return pdfBuffer;
};

module.exports= {generatePDF}