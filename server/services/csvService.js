// server/services/csvService.js
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');

class CsvService {
  static async parseCsvFile(filePath) {
    const results = [];
    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', reject);
    });
  }

  static async writeCsvFile(filePath, data) {
    const csvWriter = createCsvWriter({
      path: filePath,
      header: [
        { id: 'Employee_Name', title: 'Employee_Name' },
        { id: 'Employee_EmailID', title: 'Employee_EmailID' },
        { id: 'Secret_Child_Name', title: 'Secret_Child_Name' },
        { id: 'Secret_Child_EmailID', title: 'Secret_Child_EmailID' }
      ]
    });

    return csvWriter.writeRecords(data);
  }
}