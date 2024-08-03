const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const Log = require('../Models/LogSchema'); // Adjust the path as needed
const ExcelJS = require('exceljs');
const fetchuser = require('../middleware/fetchUser')
const jwt = require('jsonwebtoken')

let currentId = 0; // In-memory ID storage

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
router.post('/export', async (req, res) => {
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

    // Add the heading row
    worksheet.mergeCells('A1:L1'); // Adjust the range based on the number of columns
    const headingCell = worksheet.getCell('A1');
    headingCell.value = 'AME workbook';
    headingCell.style = {
      font: { name: 'Arial', bold: true, size: 14 },
      alignment: { horizontal: 'center', vertical: 'middle' },
      fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' } } // Optional: yellow fill color
    };

    // Define columns for the worksheet (starting from row 2)
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

    // Add the column headers in the second row
    worksheet.addRow([
      'ID', 'ToA', 'Reg', 'ATA', 'Wo', 'Mt', 'TOM', 'TOA', 'C', 'DU', 'Supervisor'
    ]);

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
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Error exporting data:', error);
    res.status(500).json({ message: 'Error exporting data' });
  }
});













module.exports = router;


  
