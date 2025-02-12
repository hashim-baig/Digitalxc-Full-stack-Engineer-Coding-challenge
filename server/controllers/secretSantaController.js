// server/controllers/secretSantaController.js
const Employee = require('../models/Employee');
const Assignment = require('../models/Assignment');
const SecretSantaAssigner = require('../utils/secretSantaAssigner');
const CsvService = require('../services/csvService');

class SecretSantaController {
  static async uploadEmployees(req, res) {
    try {
      const employees = await CsvService.parseCsvFile(req.file.path);
      const savedEmployees = await Employee.insertMany(
        employees.map(emp => ({
          name: emp.Employee_Name,
          emailId: emp.Employee_EmailID
        }))
      );
      res.json({ success: true, employees: savedEmployees });
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