const template1 = ({ ID, Date, ToA, Reg, ATA, Wo, Mt, TOM, TOA, C, DU, Supervisor }) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <!-- Font Awesome -->
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css">
          <!-- Bootstrap core CSS -->
          <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet">
          <!-- Material Design Bootstrap -->
          <link href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.7.5/css/mdb.min.css" rel="stylesheet">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
          <style>    
              body {
                  font-family: 'Garamond';
              }
              .table-container {
                  margin: 100px; /* Apply margin around the table */
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
                  <thead>
                      <tr class="fixed-col">
                          <th colspan="12">AIRCRAFT MAINTENANCE ENGINEER'S WORK RECORD/LOGBOOK</th>
                          <th colspan="4">
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
                          <th colspan="2">Supervisor Name & Sign,AME Licence No</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td class="fixed-width">${ID}</td>
                          <td class="fixed-width">${Date}</td>
                          <td class="fixed-width">${ToA}</td>
                          <td class="fixed-width">${Reg}</td>
                          <td class="fixed-width">${ATA}</td>
                          <td class="fixed-width">${Wo}</td>
                          <td class="wide-column" colspan="5">${Mt}</td>
                          <td class="fixed-width">${TOM}</td>
                          <td class="wide-column" colspan="5">${TOA}</td>
                          <td class="fixed-width">${C}</td>
                          <td class="fixed-width">${DU}</td>
                          <td colspan="1">${Supervisor}</td>
                      </tr>
                      <tr>
                          <td colspan="2">Date</td>
                          <th colspan="3"></th>
                          <th class="fixed-width"></th>
                          <th colspan="5">Log Book Owner's Signature (*)</th>
                          <th colspan="5"></th>
                      </tr>
                      <tr>
                          <th colspan="16">Blah bLah BlaH</th>
                      </tr>
                  </tbody>
              </table>
          </div>
          <!-- JQuery -->
          <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
          <!-- Bootstrap tooltips -->
          <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.4/umd/popper.min.js"></script>
          <!-- Bootstrap core JavaScript -->
          <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.min.js"></script>
          <!-- MDB core JavaScript -->
          <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.7.5/js/mdb.min.js"></script>
      </body>
      </html>
    `;
  };
  
  export default template1;
  