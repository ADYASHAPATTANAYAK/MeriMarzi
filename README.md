<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  <h1>A full stack E-commerce Website using MongoDB,Nodejs, GraphQL</h1>
  <h1>Steps to Run the Project Successfully</h1>

  <h2>1. Install Node.js on Your System</h2>
  <p>
    <ol>
      <li>Download Node.js from the official website: 
        <a href="https://nodejs.org/en/download" target="_blank">https://nodejs.org/en/download</a>
      </li>
      <li>Install the required Node.js modules for both the backend and frontend.</li>
    </ol>
  </p>

  <h2>2. Configure Your Database</h2>
  <p>
    Update the <b><i>.env</i></b> file in the backend folder with your own MongoDB Atlas connection string. 
    <br>
    Add sample products to your database. Before doing so, refer to the <b><i>product.js</i></b> file in the backend folder for the required product schema.
  </p>

  <h2>3. Run the Project in Visual Studio Code</h2>
  <p>
    Follow these steps:
    <ol>
      <li>Open a new terminal and navigate to the backend folder:
        <code>cd backend</code>
      </li>
      <li>Install dependencies and start the backend server:
        <code>npm install</code><br><code>npm start</code>
      </li>
      <li>Once the backend server is running, open another terminal (do not close the first one).</li>
      <li>In the new terminal, navigate to the frontend folder:
        <code>cd frontend</code>
      </li>
      <li>Install dependencies and start the frontend server:
        <code>npm install</code><br><code>npm start</code>
      </li>
    </ol>
  </p>
</body>
</html>
