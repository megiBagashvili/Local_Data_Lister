# Project: Local Data Lister

## 👥 Team Information
- **Team Members**: Megi Bagashvili and Mariam Shushanashvili
- **Selected Base Project**: Local Data Lister

## 🎯 Project Vision
**Problem Statement**: Users need a simple way to view information about local points of interest (e.g., restaurants, parks, events) without relying on complex external APIs.
**Target Users**: Individuals looking for local recommendations or information.
**Value Proposition**: Provides a straightforward and easily understandable example of data flow from a backend to a frontend, focusing on fundamental web development concepts.

## 🏗️ Architecture & Technical Design

### Tech Stack
- **Frontend**: React + TypeScript
- **Backend**: Node.js + TypeScript
- **Database**: JSON file (simulated) or hardcoded data (for simplicity in this project)
- **Deployment**: AWS S3 + CloudFront (Frontend), AWS Lambda + API Gateway (Backend)
- **Testing**: Jest (for unit testing React components and backend logic)

### System Architecture
- **Component Hierarchy**:
    - `App` (main container)
    - `ItemList` (displays the list of local items)
    - `ItemCard` (renders details for a single local item - can be a sub-component of `ItemList`)
    - `SearchBar` (input field for filtering)
- **API Design**:
    - `/api/local-items` (GET): Returns an array of local item objects in JSON format (served by AWS Lambda via API Gateway).
- **Database Schema**: (For JSON file example)
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
      // ... more items
    ]
    ```
- **Authentication**: Not required for this simplified data listing application.

### Key Design Decisions
- **Simulated API with JSON:** To simplify the project and focus on data flow, we will use a local JSON file or hardcoded data on the backend (within the AWS Lambda function) instead of a real database.
- **Basic Filtering on Frontend:** Filtering will be implemented on the frontend after the data is loaded for simplicity. More advanced filtering on the backend could be a future enhancement.
- **Serverless Backend (AWS Lambda + API Gateway):** Using AWS Lambda for the backend allows us to run our API endpoint without managing servers. API Gateway will handle the HTTP requests and trigger the Lambda function.
- **Static Frontend Hosting (AWS S3):** Hosting the React build output on AWS S3 is a cost-effective and scalable way to serve static web content. CloudFront can be added for global content delivery.

## 🧪 Test-Driven Development Strategy
- **Core Features to Test**:
    - Backend API endpoint (AWS Lambda function) returns data in the correct format.
    - Frontend component renders the list of items correctly.
    - Filtering logic on the frontend works as expected.
- **Testing Approach**:
    - **Unit tests (Jest):** For individual React components (rendering, filtering logic) and backend Lambda function logic.
- **Test Coverage Goals**: Aim for testing the core functionality, especially data fetching and display, and the filtering logic.

## 📦 Feature Breakdown

### Core Features (Must-Have)
- [ ] Display a list of local items fetched from the backend (AWS Lambda via API Gateway).
- [ ] Implement a basic search/filter functionality on the frontend based on keywords.

### Enhanced Features (Nice-to-Have)
- [ ] Implement more advanced filtering options (e.g., filter by type).
- [ ] Add basic styling to the application.
- [ ] Implement pagination for a larger dataset (if we simulate one).

## 📅 4-Week Development Plan

### Week 1: Planning & Setup
- [ ] Project setup (React + Node + TypeScript)
- [ ] Create Data Source File (JSON) 
- [ ] Define Data Interface (TypeScript - Backend) 
- [ ] Basic project structure (creating folders for frontend and backend)
- [ ] Initial Git repository setup

### Week 2: Minimal App + Testing
- [ ] Setup basic AWS Lambda function with Node.js and TypeScript
- [ ] Implement logic in the Lambda function to read data from `data.json` or hardcoded data
- [ ] Create API Gateway endpoint to trigger the Lambda function
- [ ] Basic frontend components (`App`, `ItemList`)
- [ ] Write and run initial tests for the backend Lambda function
- [ ] Data fetching logic in React to call the API Gateway endpoint

### Week 3: Deployment + Development
- [ ] Deploy React build output to AWS S3
- [ ] Configure basic S3 website hosting
- [ ] Implement list rendering in React
- [ ] Implement basic filtering on the frontend
- [ ] Test implementation for filtering

### Week 4: Polish + Final Development
- [ ] UI/UX improvements (basic styling)
- [ ] Comprehensive testing (frontend and backend)
- [ ] Documentation completion (README, basic API documentation)
- [ ] Final deployment testing and preparation

## 🚀 Deployment Strategy
- **AWS Services**:
    - **Frontend**: AWS S3 for static website hosting, potentially with AWS CloudFront as a Content Delivery Network (CDN) for improved performance and caching.
    - **Backend**: AWS Lambda for running the Node.js serverless functions, triggered by HTTP requests via Amazon API Gateway.
- **Environment Variables**: [We can manage environment variables for the backend Lambda function through the AWS Lambda console or using Infrastructure as Code tools if needed in the future.]
- **Database Hosting**: Not applicable as we are using a JSON file or hardcoded data for this simplified project.
- **Domain & SSL**: [We can configure a custom domain name using AWS Route 53 and obtain an SSL certificate using AWS Certificate Manager if we decide to make the application publicly accessible.]

## 📚 Documentation Plan
- **README**: Project description, setup instructions (how to run frontend locally, basic info about backend deployment).
- **API Documentation**: Description of the API Gateway endpoint and the data structure returned by the Lambda function.
- **Architecture Docs**: Brief overview of the frontend and backend structure, and the AWS services used for deployment.
- **Testing Docs**: How to run the frontend tests and any instructions for testing the backend Lambda function (e.g., using the AWS console or `curl`).

## 🤔 Potential Challenges & Solutions
- **Challenge 1**: Ensuring type consistency between frontend and backend data structures.
    - *Solution approach*: Create a shared interface or type definition that can be used in both the frontend and backend (potentially in a separate shared directory or package, or defined in the backend and manually replicated in the frontend for this simple case).
- **Challenge 2**: Handling asynchronous data fetching and potential loading states in the frontend.
    - *Solution approach*: Use React state to manage loading indicators and handle potential errors during the API call to the API Gateway endpoint.
- **Challenge 3**: Configuring AWS Lambda and API Gateway correctly.
    - *Solution approach*: Follow AWS documentation and tutorials for setting up Lambda functions and API Gateway endpoints. Start with a simple setup and gradually add complexity.

## 📈 Success Metrics
- **Functionality**: The application successfully fetches and displays a list of local items from the AWS Lambda function (via API Gateway) and allows users to filter the list on the frontend.
- **Code Quality**: Code is well-structured, readable, and follows TypeScript best practices.
- **Performance**: The application loads data and filters efficiently for the expected small dataset. The serverless backend responds quickly.
- **User Experience**: The list is displayed clearly, and the filtering is intuitive. The deployed application is accessible via the S3 website URL.

---

## 🎯 Grading Criteria (450 points total)
1. **Code Quality & Architecture** (120 pts - 27%)
2. **Testing Strategy & Implementation** (120 pts - 27%)
3. **Functionality & User Experience** (80 pts - 18%)
4. **Documentation & Technical Decisions** (80 pts - 18%)
5. **Deployment & DevOps** (50 pts - 11%)