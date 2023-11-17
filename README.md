# Movie Search Application

This project is a web application for searching movies. It allows users to search for movies by title and view detailed information about selected movies.

## Author

[Tomáš Pour](mailto:prace@pourtomas.cz)

## Technologies

- React
- TypeScript
- Material-UI
- OMDB API
- Node.js - Version - 20.9.0

## Setup Instructions

1. **Clone the Repository**:

   ```
   git clone [repository URL]
   cd [project-directory]
   ```

2. **Install Dependencies**:

   ```
   npm install
   ```

3. **Setting up the API Key**:

   - Sign up at [OMDB API](http://www.omdbapi.com/) and generate your API key.
   - In the root directory of the project, locate the `.env` file.
   - Inside the `.env` file, replace `YOUR_API_KEY` with your actual OMDB API key in the line:
     ```
     REACT_APP_OMDB_API_KEY=YOUR_API_KEY
     ```

4. **Starting the Application**:
   ```
   npm start
   ```

## Using the Application

After starting the application, visit `http://localhost:3000` in your web browser to access the app.
