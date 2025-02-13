const fs = require('fs');
const path = require('path');
const Employee = require('../models/Employee');
const Assignment = require('../models/Assignment');
const SecretSantaAssigner = require('../utils/secretSantaAssigner');
const CsvService = require('../services/csvService');

class SecretSantaController {
  static async uploadData(req, res) {
    try {
      
      const uploadDir = path.join(__dirname, '../uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
  
      
      if (!req.files || !req.files.employees || !req.files.previousAssignments) {
        return res.status(400).json({ error: 'Both employee data and previous assignments files are required' });
      }
  
      
      const employeesFile = req.files.employees[0]; // Access the first file in the array
      const previousAssignmentsFile = req.files.previousAssignments[0]; // Access the first file in the array
  
      if (!employeesFile || !previousAssignmentsFile) {
        return res.status(400).json({ error: 'Files are missing or incorrectly formatted' });
      }
  
      
      const employees = await CsvService.parseCsvFile(employeesFile.path); // Use the file path
      const previousAssignments = await CsvService.parseCsvFile(previousAssignmentsFile.path); // Use the file path
  
     
      await Employee.deleteMany({});
      await Assignment.deleteMany({});
  
     
      const savedEmployees = await Employee.insertMany(
        employees.map(emp => ({
          name: emp.Employee_Name,
          emailId: emp.Employee_EmailID
        }))
      );
  
     
      const employeeMap = new Map();
      savedEmployees.forEach(emp => employeeMap.set(emp.emailId, emp._id));
  
      
      const year = new Date().getFullYear() - 1; // Assignments are from the last year
      const savedAssignments = [];
  
      for (const assignment of previousAssignments) {
        const giverId = employeeMap.get(assignment.Employee_EmailID);
        const receiverId = employeeMap.get(assignment.Secret_Child_EmailID);
  
        if (giverId && receiverId) {
          const newAssignment = new Assignment({
            year,
            employee: giverId,
            secretChild: receiverId
          });
          savedAssignments.push(await newAssignment.save());
        }
      }
  
      
      const employeeFilePath = path.join(uploadDir, employeesFile.filename);
      const previousAssignmentsFilePath = path.join(uploadDir, previousAssignmentsFile.filename);
  
      fs.copyFileSync(employeesFile.path, employeeFilePath); // Copy the file to the uploads directory
      fs.copyFileSync(previousAssignmentsFile.path, previousAssignmentsFilePath); // Copy the file to the uploads directory
  
      res.json({ success: true, employees: savedEmployees, assignments: savedAssignments });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  static async generateAssignments(req, res) {
    try {
      const employees = await Employee.find();
      const previousAssignments = await Assignment.find({ year: new Date().getFullYear() - 1 });

      const assigner = new SecretSantaAssigner(employees, previousAssignments);
      const assignments = await assigner.assign();

      const year = new Date().getFullYear();
      const savedAssignments = [];

      for (const [giverId, receiverId] of assignments) {
        const assignment = new Assignment({
          year,
          employee: giverId,
          secretChild: receiverId
        });
        savedAssignments.push(await assignment.save());
      }

      res.json({ success: true, assignments: savedAssignments });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async downloadAssignments(req, res) {
    try {
      const assignments = await Assignment.find({ year: new Date().getFullYear() })
        .populate('employee')
        .populate('secretChild');

      const csvData = assignments.map(assignment => ({
        Employee_Name: assignment.employee.name,
        Employee_EmailID: assignment.employee.emailId,
        Secret_Child_Name: assignment.secretChild.name,
        Secret_Child_EmailID: assignment.secretChild.emailId
      }));

      const filePath = 'assignments.csv';
      await CsvService.writeCsvFile(filePath, csvData);
      res.download(filePath);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = SecretSantaController;