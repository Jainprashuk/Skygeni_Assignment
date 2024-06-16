# SkyGeni Assignment
This repository hosts a full-stack web application that reads JSON data files, organizes them, and serves them through an API using Flask. On the frontend, it consumes this API to display data in Material UI cards and visualizes it with D3.js as bar and doughnut charts. This project demonstrates the integration of backend data handling with dynamic frontend visualization techniques.


![Screenshot 1](./ReadmeImages/Screenshot%20(168).png)
*Sign In Page*

![Screenshot 2](./ReadmeImages/Screenshot%20(169).png)
*Sign Up Page*

![Screenshot 3](./ReadmeImages/Screenshot%20(170).png)
*Tweet Page*


### setup 

## Backend Setup 
1. Move To Backend Repository [Backend Setup Repository](https://github.com/Jainprashuk/SkyGeni_Assignment_Backend).
2. Install dependencies: `npm install` 
3. Start the backend server: `npm start` .
4. The backend server should now be running at port 3000 and accessible at the 3000 port.

# BACKEND Routes
1. https://skygeni-assignment-backend.onrender.com/bardata :
   This is rotes to get the data required to create bargraph
2. https://skygeni-assignment-backend.onrender.com/piedata :
   This is rotes to get the data required to create Donout pie chart
3. https://skygeni-assignment-backend.onrender.com/tabledata :
   This is rotes to get the data required to create tabledata
   
## Frontend Setup
1. Install dependencies: `npm install`.
2. Start the development server: `npm run dev`.
3. Access the frontend application at `http://localhost:5173` in your browser.
