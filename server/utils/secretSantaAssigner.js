class SecretSantaAssigner {
  constructor(employees, previousAssignments = []) {
    this.employees = employees;
    this.previousAssignments = previousAssignments;
  }

  async assign() {
    const available = [...this.employees];
    const assignments = new Map();
    const used = new Set();
  
    for (const giver of this.employees) {
      const previousChild = this.previousAssignments.find(
        assignment => assignment.employee.toString() === giver._id.toString()
      )?.secretChild.toString();
  
      const validReceivers = available.filter(receiver => 
        receiver._id.toString() !== giver._id.toString() && 
        receiver._id.toString() !== previousChild &&
        !used.has(receiver._id.toString())
      );
  
      if (validReceivers.length === 0) {
        return this.assign(); // Retry if no valid receiver is found
      }
  
      const randomIndex = Math.floor(Math.random() * validReceivers.length);
      const receiver = validReceivers[randomIndex];
  
      assignments.set(giver._id.toString(), receiver._id.toString());
      used.add(receiver._id.toString());
    }
  
    return assignments;
  }
  
}

module.exports = SecretSantaAssigner;