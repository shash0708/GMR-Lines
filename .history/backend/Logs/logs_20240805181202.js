const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const Log = require('../Models/LogSchema'); // Adjust the path as needed
const ExcelJS = require('exceljs');
const fetchuser = require('../middleware/fetchUser')
// const pdf = require('html-pdf')
const puppeteer = require('puppeteer');
const fs = require("fs");

//Route 1
router.post('/createLog', fetchuser, async (req, res) => {
  try {
      const { Id,ToA, reg, ATA, Wo, Mt, TOM, TOA, C, DU, Supervisor } = req.body;
      // Validate request data
      const userId = req.user.id; // Get user ID from the request object


      // Generate a new ID for the log
      // const Id = await Log.countDocuments() + 1;

      // Create a new log document
      const newLog = new Log({
       
          Id,
          ToA,
          reg,
          ATA,
          Wo,
          Mt,
          TOM,
          TOA,
          C,
          DU,
          Supervisor,
          user: userId 

      });

      // Save the document to the database
      await newLog.save();

      // Generate an authentication token (if needed)
   
      // Send a success response with the newly created log and token
      return res.status(201).json({newLog });
  } catch (error) {
      // Log the error and send an error response
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
  }
});



//Route 2
router.delete('/deleteLog/:Id', fetchuser,async (req, res) => {
    try {
        const log = await Log.findOneAndDelete({ Id: req.params.Id }); // Use custom Id to delete the log
        if (!log) return res.status(404).json({ error: 'Log not found' });

        res.json({ success: 'Log deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server Error' });
    }
});


  // Route to delete multiple logs by their IDs
  router.delete('/deleteLogs',fetchuser, async (req, res) => {
    try {
        const ids = req.body.ids; // Expecting an array of custom IDs in the request body

        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ error: 'No IDs provided' });
        }

        // Validate the IDs format (e.g., ensure they are numbers)
        const validIds = ids.filter(id => Number.isInteger(id));
        if (validIds.length === 0) {
            return res.status(400).json({ error: 'No valid IDs provided' });
        }

        // Delete logs matching the custom IDs
        const result = await Log.deleteMany({ Id: { $in: validIds } });

        res.json({
            success: `${result.deletedCount} logs have been deleted successfully`,
            result
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server Error' });
    }
});

//Route 3
 // Adjust the path to your fetchuser middleware

// Route to update a note by ID
// Route to update a log by custom Id
router.put('/updatenotes/:Id', fetchuser, async (req, res) => {
  try {
      const id = Number(req.params.Id); // Convert to number

      if (isNaN(id)) {
          return res.status(400).json({ error: 'Invalid Id format' });
      }

      // Check if the document exists with the given custom Id
      const log = await Log.findOne({ Id: id });

      if (!log) {
          return res.status(404).json({ error: 'Log not found' });
      }

      // Uncomment and adjust if using authorization middleware
      // if (log.user.toString() !== req.user.id) return res.status(401).json({ error: 'Not authorized' });

      // Destructure the fields from the request body
      const { ToA, reg, ATA, Wo, Mt, TOM, TOA, C, DU, Supervisor } = req.body;

      // Create an object with the fields to be updated
      const updatedFields = {};
      if (ToA) updatedFields.ToA = ToA;
      if (reg) updatedFields.reg = reg;
      if (ATA) updatedFields.ATA = ATA;
      if (Wo) updatedFields.Wo = Wo;
      if (Mt) updatedFields.Mt = Mt;
      if (TOM) updatedFields.TOM = TOM;
      if (TOA) updatedFields.TOA = TOA;
      if (C) updatedFields.C = C;
      if (DU) updatedFields.DU = DU;
      if (Supervisor) updatedFields.Supervisor = Supervisor;

      // Update the log with new fields
      const updatedLog = await Log.findOneAndUpdate(
          { Id: id }, // Query by custom Id field
          { $set: updatedFields },
          { new: true, runValidators: true } // Ensure validators are run
      );

      if (!updatedLog) {
          return res.status(404).json({ error: 'Log not found for update' });
      }

      // Respond with the updated log
      res.json({ log: updatedLog });
  } catch (error) {
      console.error('Error updating log:', error.message);
      res.status(500).json({ error: 'Server Error' });
  }
});

//Route 4
router.get('/logs',fetchuser, async (req, res) => {
  try {
    // Fetch logs sorted by createdAt in descending order
    const logs = await Log.find({user:req.user.id}).sort({ createdAt : -1});

    // Send the logs in the response
    res.status(200).json(logs.map(log => ({
      Id: log.Id,
      createdAt: log.createdAt,
      ToA: log.ToA,
      reg: log.reg,
      ATA: log.ATA,
      Wo: log.Wo,
      Mt: log.Mt,
      TOM: log.TOM,
      TOA: log.TOA,
      C: log.C,
      DU: log.DU,
      Supervisor: log.Supervisor
    })));
  } catch (error) {
    // Handle errors and send a server error response
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/logs/:Id', fetchuser, async (req, res) => {
  try {
    const id = Number(req.params.Id); // Convert to number

    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid Id format' });
    }

    const log = await Log.findOne({ Id: id }); // Use findOne for custom fields
    if (!log) return res.status(404).json({ error: 'The Log with the given ID was not found' });
    if (log.user.toString() !== req.user.id) return res.status(401).json({ error: 'Not authorized' });

    res.status(200).json(log);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//Route 5

router.get('/entries', fetchuser,async (req, res) => {
  try {

  
    const entries = await Log.find({user:req.user.id}).sort({ createdAt : -1});;
    res.json(entries);

 
  } catch (error) {
    res.status(500).json({ message: 'Error fetching entries' });
  }
});

// Route to export selected entries to Excel
router.get('/s',(req,res)=>{
   res.send("HI");
})

router.post('/export', fetchuser,async (req, res) => {
  const selectedIds = req.body; // Expecting an array of IDs

  try {
   
    // Fetch data for the selected IDs
    const logs = await Log.find({ Id: { $in: selectedIds } }).exec();

    if (logs.length === 0) {
      return res.status(404).json({ message: 'No logs found for the selected IDs' });
    }

    // Create a new Excel workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Logs');

    // Define columns for the worksheet
    worksheet.columns = [
     
      { header: 'ID', key: 'Id', width: 10 },
      { header: 'ToA', key: 'ToA', width: 15 },
      { header: 'Reg', key: 'reg', width: 15 },
      { header: 'ATA', key: 'ATA', width: 15 },
      { header: 'Wo', key: 'Wo', width: 15 },
      { header: 'Mt', key: 'Mt', width: 15 },
      { header: 'TOM', key: 'TOM', width: 15 },
      { header: 'TOA', key: 'TOA', width: 15 },
      { header: 'C', key: 'C', width: 15 },
      { header: 'DU', key: 'DU', width: 15 },
      { header: 'Supervisor', key: 'Supervisor', width: 20 }
    ];

    // Add rows to the worksheet
    logs.forEach(log => {
      worksheet.addRow({
    
        Id: log.Id,
        ToA: log.ToA,
        reg: log.reg,
        ATA: log.ATA,
        Wo: log.Wo,
        Mt: log.Mt,
        TOM: log.TOM,
        TOA: log.TOA,
        C: log.C,
        DU: log.DU,
        Supervisor: log.Supervisor
      });
    });

    // Write the workbook to a file
    res.setHeader('Content-Disposition', 'attachment; filename=exported_data.xlsx');
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Error exporting data:', error);
    res.status(500).json({ message: 'Error exporting data' });
  }
});

// router.post('/pdf', fetchuser, async (req, res) => {
//   const selectedIds = req.body;

//   try {
//     // Fetch logs from MongoDB
//     const logs = await Log.find({ Id: { $in: selectedIds } }).exec();

//     if (logs.length === 0) {
//       return res.status(404).json({ message: 'No logs found for the selected IDs' });
//     }

//     // Create HTML template with logs
//     const html = `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//         <meta charset="UTF-8">
//         <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css">
//         <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet">
//         <link href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.7.5/css/mdb.min.css" rel="stylesheet">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Logbook</title>
//         <style>    
//             body {
//                 font-family: 'Garamond';
//             }
//             .table-container {
//                 margin: 100px;
//             }
//             table {
//                 width: 100%;
//                 border-collapse: collapse;
//             }
//             th, td {
//                 border: 1px solid black;
//                 padding: 8px;
//                 text-align: left;
//             }
//            .wide-column {
//             width: 30%; /* Adjust the percentage as needed for colspan */
//         }
//         .wide-colum {
//             width: 2ch; /* Adjust the percentage as needed for colspan */
//         }
//         .fixed-width {
//             width: 7px; /* Fixed width for columns not affected by colspan */
//         }
//         .fixed-col {
//             height: 70px; /* Fixed width for columns not affected by colspan */
//         }
//         </style>
//     </head>
//     <body>
//         <div class="table-container">
//             <table>
//                   <tr class="fixed-col">
//                     <th colspan="11">AIRCRAFT MAINTENANCE ENGINEER'S WORK RECORD/LOGBOOK</th>
//                     <th colspan="5">
//                         Name<br>
//                         Ps<br>
//                         Ij
//                     </th>
//                 </tr>
//                 <tr>
//                     <th class="fixed-width">SL NO.</th>
//                     <th class="fixed-width">Date & Time</th>
//                     <th class="fixed-width">Type of Aircraft/Engine</th>
//                     <th class="fixed-width">Aircraft Reg.</th>
//                     <th class="fixed-width">ATA Chapter</th>
//                     <th class="fixed-width">Work Order No.</th>
//                     <th class="wide-column" colspan="5">Maintenance Task</th>
//                     <th class="fixed-width">Type of Maintenance</th>
//                     <th class="fixed-width">Type of Activity</th>
//                     <th class="fixed-width">Category</th>
//                     <th class="fixed-width">Duration in Hrs./Days</th>
//                     <th colspan="5">Supervisor Name & Sign,AME Licence No</th>
//                 </tr>
//                 <tbody>
//                     ${logs.map((log, index) => `
//                         <tr>
//                             <td class="fixed-width">${log.Id}</td> <!-- Use index for serial number -->
//                             <td class="fixed-width">${new Date(log.createdAt).toLocaleDateString()}</td>
//                             <td class="fixed-width">${log.ToA}</td>
//                             <td class="fixed-width">${log.Reg}</td>
//                             <td class="fixed-width">${log.ATA}</td>
//                             <td class="fixed-width">${log.Wo}</td>
//                             <td class="wide-column" colspan="5">${log.Mt}</td>
//                             <td class="fixed-width">${log.TOM}</td>
//                             <td class="fixed-width">${log.TOA}</td>
//                             <td class="fixed-width">${log.C}</td>
//                             <td class="fixed-width">${log.DU}</td>
//                             <td colspan="1">${log.Supervisor}</td>
//                         </tr>
//                     `).join('')}
//                     <tr>
//                         <td colspan="2">Date</td>
//                         <th colspan="3"></th>
//                         <th class="fixed-width"></th>
//                         <th colspan="5">Log Book Owner's Signature (*)</th>
//                         <th colspan="5"></th>
//                     </tr>
//                     <tr>
//                         <th colspan="16">Blah Blah Blah</th>
//                     </tr>
//                 </tbody>
//             </table>
//         </div>
//     </body>
//     </html>
//     `;

//     // Launch Puppeteer and create PDF
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.setContent(html, { waitUntil: 'networkidle0' });
//     const pdfBuffer = await page.pdf({ format: 'A4', landscape: true });

//     await browser.close();

//     res.set({
//       'Content-Type': 'application/pdf',
//       'Content-Disposition': 'attachment; filename=GmrLogBook.pdf',
//       'Content-Length': pdfBuffer.length
//     });
//     res.send(pdfBuffer);
//   } catch (error) {
//     console.error('Error fetching logs or generating PDF:', error);
//     res.status(500).send('Error fetching logs or generating PDF');
//   }
// });


// router.post('/exp', (req, res) => {
//   const selectedLogs = req.body;

//   // Create HTML template with logs
//   const html = `
//   <!DOCTYPE html>
//   <html lang="en">
//   <head>
//       <meta charset="UTF-8">
//       <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css">
//       <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet">
//       <link href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.7.5/css/mdb.min.css" rel="stylesheet">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <title>Logbook</title>
//       <style>    
//           body {
//               font-family: 'Garamond';
//           }
//           .table-container {
//               margin: 100px;
//           }
//           table {
//               width: 100%;
//               border-collapse: collapse;
//           }
//           th, td {
//               border: 1px solid black;
//               padding: 8px;
//               text-align: left;
//           }
//           .wide-column {
//               width: 30%;
//           }
//           .fixed-width {
//               width: 7px;
//           }
//           .fixed-col {
//               height: 70px;
//           }
//       </style>
//   </head>
//   <body>
//       <div class="table-container">
//           <table>
//               <thead>
//                   <tr class="fixed-col">
//                       <th colspan="12">AIRCRAFT MAINTENANCE ENGINEER'S WORK RECORD/LOGBOOK</th>
//                       <th colspan="4">Name<br>Ps<br>Ij</th>
//                   </tr>
//                   <tr>
//                       <th class="fixed-width">SL NO.</th>
//                       <th class="fixed-width">Date & Time</th>
//                       <th class="fixed-width">Type of Aircraft/Engine</th>
//                       <th class="fixed-width">Aircraft Reg.</th>
//                       <th class="fixed-width">ATA Chapter</th>
//                       <th class="fixed-width">Work Order No.</th>
//                       <th class="wide-column" colspan="5">Maintenance Task</th>
//                       <th class="fixed-width">Type of Maintenance</th>
//                       <th class="fixed-width">Type of Activity</th>
//                       <th class="fixed-width">Category</th>
//                       <th class="fixed-width">Duration in Hrs./Days</th>
//                       <th colspan="2">Supervisor Name & Sign,AME Licence No</th>
//                   </tr>
//               </thead>
//               <tbody>
//                   ${selectedLogs.map((log, Id) => `
//                       <tr>
//                           <td class="fixed-width" key=${Id}>${log.Id}</td> <!-- Use the id from the log -->
//                           <td class="fixed-width">${log.dateTime}</td>
//                           <td class="fixed-width">${log.typeOfAircraft}</td>
//                           <td class="fixed-width">${log.aircraftReg}</td>
//                           <td class="fixed-width">${log.ATA}</td>
//                           <td class="fixed-width">${log.workOrderNo}</td>
//                           <td class="fixed-width">${log.maintenanceTask}</td>
//                           <td class="wide-column" colspan="5">${log.typeOfMaintenance}</td>
//                           <td class="fixed-width">${log.typeOfActivity}</td>
//                           <td class="fixed-width">${log.category}</td>
//                           <td class="fixed-width">${log.duration}</td>
//                           <td colspan="2">${log.supervisorName}</td>
//                       </tr>
//                   `).join('')}
//                   <tr>
//                       <td colspan="2">Date</td>
//                       <th colspan="3"></th>
//                       <th class="fixed-width"></th>
//                       <th colspan="5">Log Book Owner's Signature (*)</th>
//                       <th colspan="5"></th>
//                   </tr>
//                   <tr>
//                       <th colspan="16">Blah bLah BlaH</th>
//                   </tr>
//               </tbody>
//           </table>
//       </div>
//   </body>
//   </html>
//   `;

//   // Convert HTML to PDF in landscape orientation
//   const options = { format: 'A4', orientation: 'landscape' };

//   pdf.create(html, options).toBuffer((err, buffer) => {
//       if (err) {
//           return res.status(500).send('Error generating PDF');
//       }
//       res.set({
//           'Content-Type': 'application/pdf',
//           'Content-Disposition': 'attachment; filename=GmrLogBook.pdf'
//       });
//       res.send(buffer);
//   });
// });

router.post('/pf', fetchuser, async (req, res) => {
  const selectedIds = req.body; // Expecting an array of IDs

  try {
    // Fetch logs from MongoDB
    const logs = await Log.find({ Id: { $in: selectedIds } }).exec();

    if (logs.length === 0) {
      return res.status(404).json({ message: 'No logs found for the selected IDs' });
    }

    // Launch Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Generate HTML content
    let htmlContent = `
      <html>
        <head>
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>Logbook</h1>
          <table>
            <thead>
              <tr>
                <th>SL NO.</th>
                <th>Date & Time</th>
                <th>Type of Aircraft/Engine</th>
                <!-- Add more headers as needed -->
              </tr>
            </thead>
            <tbody>
    `;

    logs.forEach((log, index) => {
      htmlContent += `
        <tr>
          <td>${log.Id}</td>
          <td>${new Date(log.createdAt).toLocaleDateString()}</td>
          <td>${log.ToA}</td>
          <!-- Add more fields as needed -->
        </tr>
      `;
    });

    htmlContent += `
            </tbody>
          </table>
        </body>
      </html>
    `;

    // Set content and generate PDF
    await page.setContent(htmlContent);
    const pdfBuffer = await page.pdf({ format: 'A4' });

    await browser.close();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=Logbook.pdf',
      'Content-Length': pdfBuffer.length
    });

    res.send(pdfBuffer);
  } catch (error) {
    console.error('Error fetching logs or generating PDF:', error);
    res.status(500).send('Error fetching logs or generating PDF');
  }
});

// router.post('/pdf', fetchuser, async (req, res) => {
//   const selectedIds = req.body; // Expecting an array of IDs

//   try {
//     // Fetch logs from MongoDB
//     const logs = await Log.find({ Id: { $in: selectedIds } }).exec();

//     if (logs.length === 0) {
//       return res.status(404).json({ message: 'No logs found for the selected IDs' });
//     }

//     // Create HTML template with logs
//     const html = `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//         <meta charset="UTF-8">
//         <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css">
//         <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet">
//         <link href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.7.5/css/mdb.min.css" rel="stylesheet">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Logbook</title>
//         <style>    
//             body {
//                 font-family: 'Garamond';
//             }
//             .table-container {
//                 margin: 100px;
//             }
//             table {
//                 width: 100%;
//                 border-collapse: collapse;
//             }
//             th, td {
//                 border: 1px solid black;
//                 padding: 8px;
//                 text-align: left;
//             }
//             .wide-column {
//                 width: 30%; /* Adjust the percentage as needed for colspan */
//             }
//             .fixed-width {
//                 width: 7px; /* Fixed width for columns not affected by colspan */
//             }
//             .fixed-col {
//                 height: 70px; /* Fixed width for columns not affected by colspan */
//             }
//         </style>
//     </head>
//     <body>
//         <div class="table-container">
//             <table>
//                 <tr class="fixed-col">
//                     <th colspan="11">AIRCRAFT MAINTENANCE ENGINEER'S WORK RECORD/LOGBOOK</th>
//                     <th colspan="5">
//                         Name<br>
//                         Ps<br>
//                         Ij
//                     </th>
//                 </tr>
//                 <tr>
//                     <th class="fixed-width">SL NO.</th>
//                     <th class="fixed-width">Date & Time</th>
//                     <th class="fixed-width">Type of Aircraft/Engine</th>
//                     <th class="fixed-width">Aircraft Reg.</th>
//                     <th class="fixed-width">ATA Chapter</th>
//                     <th class="fixed-width">Work Order No.</th>
//                     <th class="wide-column" colspan="5">Maintenance Task</th>
//                     <th class="fixed-width">Type of Maintenance</th>
//                     <th class="fixed-width">Type of Activity</th>
//                     <th class="fixed-width">Category</th>
//                     <th class="fixed-width">Duration in Hrs./Days</th>
//                     <th colspan="5">Supervisor Name & Sign,AME Licence No</th>
//                 </tr>
//                 <tbody>
//                     ${logs.map((log, index) => `
//                         <tr>
//                             <td class="fixed-width">${log.Id}</td>
//                             <td class="fixed-width">${new Date(log.createdAt).toLocaleDateString()}</td>
//                             <td class="fixed-width">${log.ToA}</td>
//                             <td class="fixed-width">${log.Reg}</td>
//                             <td class="fixed-width">${log.ATA}</td>
//                             <td class="fixed-width">${log.Wo}</td>
//                             <td class="wide-column" colspan="5">${log.Mt}</td>
//                             <td class="fixed-width">${log.TOM}</td>
//                             <td class="fixed-width">${log.TOA}</td>
//                             <td class="fixed-width">${log.C}</td>
//                             <td class="fixed-width">${log.DU}</td>
//                             <td colspan="1">${log.Supervisor}</td>
//                         </tr>
//                     `).join('')}
//                     <tr>
//                         <td colspan="2">Date</td>
//                         <th colspan="3"></th>
//                         <th class="fixed-width"></th>
//                         <th colspan="5">Log Book Owner's Signature (*)</th>
//                         <th colspan="5"></th>
//                     </tr>
//                     <tr>
//                         <th colspan="16">Blah Blah Blah</th>
//                     </tr>
//                 </tbody>
//             </table>
//         </div>
//     </body>
//     </html>
//     `;

//     // Convert HTML to PDF
//     pdf.create(html).toBuffer((err, buffer) => {
//       if (err) {
//         console.error('Error generating PDF:', err);
//         return res.status(500).send('Error generating PDF');
//       }

//       res.set({
//         'Content-Type': 'application/pdf',
//         'Content-Disposition': 'attachment; filename=GmrLogBook.pdf',
//         'Content-Length': buffer.length
//       });
//       res.send(buffer);
//     });
//   } catch (error) {
//     console.error('Error fetching logs or generating PDF:', error);
//     res.status(500).send('Error fetching logs or generating PDF');
//   }
// });

router.get("/fetch-pdf", (req, res) => {
  console.log("sending");
  res.sendFile(`${__dirname}/Resume.pdf`);
});

router.post('/pdf', fetchuser, async (req, res) => {
  const selectedIds = req.body; // Expecting an array of IDs

  try {
    // Fetch logs from MongoDB
    const logs = await Log.find({ Id: { $in: selectedIds } }).exec();

    if (logs.length === 0) {
      return res.status(404).json({ message: 'No logs found for the selected IDs' });
    }

    // Create HTML template with logs
    const html = `
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

    // Launch Puppeteer and generate the PDF
    const browser = await puppeteer.launch({
      headless: true,
    executablePath: `/usr/bin/google-chrome`,
    args: [`--no-sandbox`, `--headless`, `--disable-gpu`, `--disable-dev-shm-usage`],

    });
    const page = await browser.newPage();
    await page.setContent(html);
    const pdfBuffer = await page.pdf({ format: 'A4' });

    await browser.close();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=GmrLogBook.pdf',
      'Content-Length': pdfBuffer.length
    });

    res.send(pdfBuffer);
  } catch (error) {
    console.error('Error fetching logs or generating PDF:', error);
    res.status(500).send('Error fetching logs or generating PDF');
  }
});










module.exports = router;


  
