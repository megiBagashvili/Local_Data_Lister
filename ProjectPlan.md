#   Project: Local Data Lister

##   👥 Team Information

-   **Team Members**: Megi Bagashvili and Mariam Shushanashvili
-   **Selected Base Project**: Local Data Lister

##   🎯 Project Vision

**Problem Statement**: Users need a simple way to view information about local points of interest (e.g., restaurants, parks, events) without relying on complex external APIs.

**Target Users**: Individuals looking for local recommendations or information.

**Value Proposition**: Provides a straightforward and easily understandable example of data flow from a backend to a frontend, focusing on fundamental web development concepts.

##   🏗️ Architecture & Technical Design

###   Tech Stack

-   **Frontend**: React + TypeScript
-   **Backend**: Node.js + TypeScript
-   **Database**: JSON file (simulated) or hardcoded data (for simplicity in this project)
-   **Deployment**: AWS EC2 (for both Frontend and Backend)
-   **Testing**: Jest (for unit testing React components and backend logic)

###   System Architecture

-   **Component Hierarchy**:
    -   `App` (main container)
    -   `ItemList` (displays the list of local items)
    -   `ItemCard` (renders details for a single local item - can be a sub-component of `ItemList`)
    -   `SearchBar` (input field for filtering)
-   **API Design**:
    -   `/api/local-items` (GET): Returns an array of local item objects in JSON format (served by Node.js on EC2).
-   **Database Schema**: (For JSON file example)

    ```json
    [
      {
        "id": "1",
        "name": "Bikentia's Kebabery",
        "type": "Restaurant",
        "description": "Must visit for everyone",
        "location": "Tsisperi Kantselebi Street, Kutaisi"
      },
      {
        "id": "2",
        "name": "Central Park",
        "type": "Park",
        "description": "A large green space for recreation.",
        "features": ["playground", "water fountains"]
      },
      //   ... more items
    ]
    ```

-   **Authentication**: Not required for this simplified data listing application.

###   Key Design Decisions

-   **Simulated API with JSON:** To simplify the project and focus on data flow, we will use a local JSON file or hardcoded data on the backend (on the EC2 instance) instead of a real database.
-   **Basic Filtering on Frontend:** Filtering will be implemented on the frontend after the data is loaded for simplicity. More advanced filtering on the backend could be a future enhancement.
-   **EC2 for Full-Stack Deployment:** Both the frontend and backend will be deployed to a single EC2 instance. This requires configuring the EC2 instance to serve both the static frontend files and run the Node.js backend.

##   🧪 Test-Driven Development Strategy

-   **Core Features to Test**:
    -   Backend API endpoint (Node.js server on EC2) returns data in the correct format.
    -   Frontend component renders the list of items correctly.
    -   Filtering logic on the frontend works as expected.
-   **Testing Approach**:
    -   **Unit tests (Jest):** For individual React components (rendering, filtering logic) and backend Node.js server logic.
-   **Test Coverage Goals**: Aim for testing the core functionality, especially data fetching and display, and the filtering logic.

##   📦 Feature Breakdown

###   Core Features (Must-Have)

-   [ ]   Display a list of local items fetched from the backend (Node.js server on EC2).
-   [ ]   Implement a basic search/filter functionality on the frontend based on keywords.

###   Enhanced Features (Nice-to-Have)

-   [ ]   Implement more advanced filtering options (e.g., filter by type).
-   [ ]   Add basic styling to the application.
-   [ ]   Implement pagination for a larger dataset (if we simulate one).

##   📅 4-Week Development Plan

###   Week 1: Planning & Setup

-   [ ]   Project setup (React + Node + TypeScript)
-   [ ]   Create Data Source File (JSON)
-   [ ]   Define Data Interface (TypeScript - Backend)
-   [ ]   Basic project structure (creating folders for frontend and backend)
-   [ ]   Initial Git repository setup

###   Week 2: Minimal App + Testing

-   [ ]   Setup basic Node.js server with Express
-   [ ]   Implement logic in the Node.js server to read data from `data.json` or hardcoded data
-   [ ]   Create API endpoint in the Node.js server (`/api/local-items`)
-   [ ]   Basic frontend components (`App`, `ItemList`)
-   [ ]   Write and run initial tests for the backend Node.js server
-   [ ]   Data fetching logic in React to call the Node.js server API endpoint

###   Week 3: Deployment + Development

-   [ ]   Launch and configure an AWS EC2 instance
-   [ ]   Set up Node.js, npm, and git on the EC2 instance
-   [ ]   Deploy the backend code to the EC2 instance
-   [ ]   Deploy the frontend code (production build) to the EC2 instance (configure a web server like Nginx or serve with Node.js)
-   [ ]   Configure EC2 security groups to allow access to the application

###   Week 4: Polish + Final Development

-   [ ]   UI/UX improvements (basic styling)
-   [ ]   Comprehensive testing (frontend and backend)
-   [ ]   Documentation completion (README, basic API documentation)
-   [ ]   Final deployment testing and preparation

##   🚀 Deployment Strategy

-   **AWS Services**:
    -   AWS EC2 instance to host both the Node.js backend and the React frontend.
-   **Environment Variables**: [We can manage environment variables on the EC2 instance using environment variables or a configuration file.]
-   **Database Hosting**: Not applicable as we are using a JSON file or hardcoded data for this simplified project.
-   **Domain & SSL**: [We can configure a custom domain name using AWS Route 53 and obtain an SSL certificate using AWS Certificate Manager if we decide to make the application publicly accessible. This would involve configuring a web server on the EC2 instance to handle the domain and SSL.]

##   📚 Documentation Plan

-   **README**: Project description, setup instructions (how to run frontend and backend locally), and detailed deployment instructions for AWS EC2.
-   **API Documentation**: Description of the `/api/local-items` endpoint and the data structure returned by the Node.js server.
-   **Architecture Docs**: Brief overview of the frontend and backend structure and how they are deployed on the EC2 instance.
-   **Testing Docs**: How to run the frontend and backend tests.

##   🤔 Potential Challenges & Solutions

-   **Challenge 1**: Ensuring type consistency between frontend and backend data structures.
    -   *Solution approach*: Create a shared interface or type definition that can be used in both the frontend and backend (potentially in a separate shared directory or package, or defined in the backend and manually replicated in the frontend for this simple case).
-   **Challenge 2**: Handling asynchronous data fetching and potential loading states in the frontend.
    -   *Solution approach*: Use React state to manage loading indicators and handle potential errors during the API call to the Node.js server.
-   **Challenge 3**: Configuring the EC2 instance and web server for proper deployment.
    -   *Solution approach*: Follow AWS documentation and tutorials for setting up EC2 instances and configuring web servers (like Nginx) to serve static files and proxy requests to the Node.js backend.

##   📈 Success Metrics

-   **Functionality**: The application successfully fetches and displays a list of local items from the Node.js server (on EC2) and allows users to filter the list on the frontend.
-   **Code Quality**: Code is well-structured, readable, and follows TypeScript best practices.
-   **Performance**: The application loads data and filters efficiently. The server responds quickly.
-   **User Experience**: The list is displayed clearly, and the filtering is intuitive. The deployed application is accessible via the EC2 instance's public IP address or domain name (if configured).

---

##   🎯 Grading Criteria (450 points total)

1.  **Code Quality & Architecture** (120 pts - 27%)
2.  **Testing Strategy & Implementation** (120 pts - 27%)
3.  **Functionality & User Experience** (80 pts - 18%)
4.  **Documentation & Technical Decisions** (80 pts - 18%)
5.  **Deployment & DevOps** (50 pts - 11%)