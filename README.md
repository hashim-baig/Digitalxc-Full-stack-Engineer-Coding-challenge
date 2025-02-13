# Digitalxc-Full-stack-Engineer-Coding-challenge

# Secret Santa Organizer

The **Secret Santa Organizer** is a full-stack web application designed to help organizations manage and automate the process of assigning Secret Santa pairs. The application allows users to upload employee data and previous assignments, generate new Secret Santa assignments, and download the results in a CSV file. Built with React for the frontend and Node.js with Express for the backend, this application ensures a seamless and efficient Secret Santa assignment process.

---

## Features

1. **Employee Data Upload**:
   - Upload a CSV file containing employee details (name and email).

2. **Previous Assignments Upload**:
   - Upload a CSV file containing previous Secret Santa assignments to avoid duplicate pairings.

3. **Generate Assignments**:
   - Automatically generate new Secret Santa assignments while ensuring no duplicates from previous years.

4. **Download Assignments**:
   - Download the generated assignments as a CSV file for easy distribution.

5. **Error Handling**:
   - Displays error messages for invalid file uploads or failed operations.

6. **Responsive Design**:
   - A clean and user-friendly interface built with modern UI components.

---

## Technologies Used

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **React Router**: For handling client-side routing.
- **Lucide Icons**: For modern and customizable icons.
- **Tailwind CSS**: For utility-first CSS styling.

### Backend
- **Node.js**: A JavaScript runtime for building scalable network applications.
- **Express**: A web framework for Node.js.
- **MongoDB**: A NoSQL database for storing employee and assignment data.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB.
- **Multer**: Middleware for handling file uploads.
- **CSV Parser**: For parsing and writing CSV files.

### Development Tools
- **Axios**: For making HTTP requests from the frontend.
- **Dotenv**: For managing environment variables.
- **Helmet**: For securing Express apps by setting various HTTP headers.
- **CORS**: For enabling Cross-Origin Resource Sharing.
- **Morgan**: For logging HTTP requests.

---

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Git (optional)

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/secret-santa-organizer.git
   cd secret-santa-organizer
   ```

2. **Install Dependencies**:
   - For the backend:
     ```bash
     cd backend
     npm install
     ```
   - For the frontend:
     ```bash
     cd ../frontend
     npm install
     ```

3. **Set Up Environment Variables**:
   - Create a `.env` file in the `server` directory and add the following variables:
     ```env
     MONGODB_URI=mongodb://localhost:27017/secret-santa
     FRONTEND_URL=http://localhost:3000
     PORT=5000
     NODE_ENV=development
     ```

4. **Start the Backend Server**:
   ```bash
   cd server
   npm start
   ```

5. **Start the Frontend Development Server**:
   ```bash
   cd ../frontend
   npm start
   ```

6. **Access the Application**:
   - Open your browser and navigate to `http://localhost:3000`.

---

## Usage

1. **Upload Employee Data**:
   - Click on the "Employee Data" file input and upload a CSV file with the following format:
     ```
     Employee_Name,Employee_EmailID
     John Doe,john.doe@example.com
     Jane Smith,jane.smith@example.com
     ```

2. **Upload Previous Assignments**:
   - Click on the "Previous Assignment Data" file input and upload a CSV file with the following format:
     ```
     Employee_EmailID,Secret_Child_EmailID
     john.doe@example.com,jane.smith@example.com
     ```

3. **Upload Files**:
   - Click the "Upload" button to process the files.

4. **Generate Assignments**:
   - Click the "Generate Assignments" button to create new Secret Santa pairs.

5. **Download Assignments**:
   - Click the "Download Assignments" button to download the generated pairs as a CSV file.

---

## Folder Structure

```
secret-santa-organizer/
├── server/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   └── secretSantaController.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── upload.js
│   ├── models/
│   │   ├── Assignment.js
│   │   └── Employee.js
│   ├── routes/
│   │   └── secretSanta.js
│   ├── services/
│   │   └── csvService.js
│   ├── utils/
│   │   └── secretSantaAssigner.js
│   ├── .env
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.js
│   │   │   └── SecretSanta.js
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   └── package.json
├── README.md
└── .gitignore
```

---

## API Endpoints

### Backend API
- **POST /api/upload-data**: Upload employee and previous assignment data.
- **POST /api/generate-assignments**: Generate new Secret Santa assignments.
- **GET /api/download-assignments**: Download the generated assignments as a CSV file.

---

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeatureName`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeatureName`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- [React](https://reactjs.org/) for the frontend framework.
- [Express](https://expressjs.com/) for the backend framework.
- [MongoDB](https://www.mongodb.com/) for the database.
- [Tailwind CSS](https://tailwindcss.com/) for styling.

---

## Contact

For any questions or feedback, please reach out to:
- **Hashim Baig**  
- **Email**: hashim.baig1712@gmail.com  
- **GitHub**: [hashim-baig](https://github.com/hashim-baig)  

---

Happy Secret Santa organizing! 🎅🎁