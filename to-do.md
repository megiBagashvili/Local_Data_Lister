# Project: Local Data Lister - To-Do List

This document outlines the detailed to-do list for the Local Data Lister project, divided into phases and chunks, with specific instructions and GitHub branching strategy.

## GitHub Branching Strategy

For each major chunk of work, create a new branch named `feature/[chunk-name]`. Once the work is complete and tested, create a Pull Request (PR) to merge it into the `main` branch. Include the PR or merge commit link in your task completion notes on the group dashboard.

## Phase 1: Week 1 - Planning & Setup (Branches: `feature/backend-setup`, `feature/frontend-setup`)

### Chunk 1: Backend Setup & Initial Data (Assigned to: Megi)

- [ ] **To-do 1.1: Initialize Backend Project:**
    - Navigate to the `backend` folder in the terminal.
    - Run `npm init -y` to create `package.json`.
    - Install dev dependencies: `npm install typescript ts-node nodemon @types/node --save-dev`.
    - Install Express: `npm install express @types/express --save`.
    - Initialize TypeScript config: `npx tsc --init`. Adjust `tsconfig.json` (e.g., `outDir`, `rootDir`, `esModuleInterop`, `strict`).
    - **GitHub Action:** Create branch `feature/backend-setup`.
- [ ] **To-do 1.2: Define Backend Data Interface:**
    - Create `backend/src/types/LocalItem.ts`.
    - Define the `LocalItem` interface based on `data.json` (e.g., `id: string`, `name: string`, `type: string`, `description: string`, `location?: string`, `features?: string[]`).
    - **GitHub Action:** Commit to `feature/backend-setup`.
- [ ] **To-do 1.3: Create `data.json` File:**
    - Create `backend/data.json` with at least 3-4 sample local data items matching the `LocalItem` interface.
    - **GitHub Action:** Commit to `feature/backend-setup`.
- [ ] **To-do 1.4: Basic Express Server Setup:**
    - Create `backend/src/server.ts`.
    - Import Express, create an app instance, define a basic `/` route ("Hello from the Backend!"), start the server on a port (e.g., 3001).
    - Add `"dev": "nodemon src/server.ts"` script to `backend/package.json`.
    - **GitHub Action:** Commit to `feature/backend-setup`.
- [ ] **To-do 1.5: Read Data from `data.json`:**
    - In `backend/src/server.ts`, import the `fs` module.
    - Implement logic to read and parse `backend/data.json` into a JavaScript array of `LocalItem` objects.
    - **GitHub Action:** Commit to `feature/backend-setup`.
- [ ] **To-do 1.6: Create `/api/local-items` Endpoint:**
    - In `backend/src/server.ts`, define a GET route at `/api/local-items` that sends the array of `LocalItem` objects as a JSON response (status 200).
    - **GitHub Action:** Commit to `feature/backend-setup`.
- [ ] **To-do 1.7: Test Backend Endpoint (Manual):**
    - Run backend (`npm run dev`). Access `http://localhost:3001/api/local-items` in a browser or tool to verify JSON response.
    - **GitHub Action:** (No code change, ensure testing).
- [ ] **To-do 1.8: Merge Backend Setup:**
    - Create PR from `feature/backend-setup` to `main`. Review and merge.
    - **GitHub Action:** Merge PR. Note merge commit link.

### Chunk 2: Frontend Setup & Initial Component Structure (Assigned to: Mariam)

- [ ] **To-do 2.1: Initialize Frontend Project:**
    - Navigate to the project root.
    - Run `npx create-react-app frontend --template typescript`.
    - `cd frontend`.
    - **GitHub Action:** Create branch `feature/frontend-setup`.
- [ ] **To-do 2.2: Define Frontend Data Interface:**
    - Create `frontend/src/types/LocalItem.ts`.
    - Define the **same** `LocalItem` interface as in the backend.
    - **GitHub Action:** Commit to `feature/frontend-setup`.
- [ ] **To-do 2.3: Create Basic Component Structure:**
    - Create `frontend/src/App.tsx`, `frontend/src/components/ItemList.tsx`, `frontend/src/components/ItemCard.tsx`, `frontend/src/components/SearchBar.tsx`.
    - Implement basic functional components in each (e.g., `const ItemList: React.FC = () => { return <div>Item List</div>; };`).
    - **GitHub Action:** Commit to `feature/frontend-setup`.
- [ ] **To-do 2.4: Basic App Layout:**
    - In `frontend/src/App.tsx`, import and render `ItemList` and `SearchBar`.
    - **GitHub Action:** Commit to `feature/frontend-setup`.
- [ ] **To-do 2.5: Initial Styling (Optional but Recommended):**
    - Add basic CSS in `frontend/src/App.css` or CSS modules for minimal visual structure. Import and apply styles.
    - **GitHub Action:** Commit to `feature/frontend-setup`.
- [ ] **To-do 2.6: Run Frontend Locally:**
    - In `frontend`, run `npm start`. Verify basic component rendering at `http://localhost:3000`.
    - **GitHub Action:** (No code change, ensure testing).
- [ ] **To-do 2.7: Merge Frontend Setup:**
    - Create PR from `feature/frontend-setup` to `main`. Review and merge.
    - **GitHub Action:** Merge PR. Note merge commit link.

## Phase 2: Week 2 - Minimal App + Testing (Branches: `feature/frontend-data-fetching`, `feature/backend-lambda-api`)

### Chunk 3: Frontend Data Fetching & Display (Assigned to: Megi)

- [ ] **To-do 3.1: Install Axios (or use Fetch API):**
    - In `frontend`, install Axios: `npm install axios`. (Or decide to use the built-in `fetch`).
    - **GitHub Action:** Create branch `feature/frontend-data-fetching`. Commit dependency installation.
- [ ] **To-do 3.2: Implement Data Fetching Logic:**
    - In `frontend/src/App.tsx`, create a `localItems` state using `useState<LocalItem[]>`.
    - Use `useEffect` to fetch data from `http://localhost:3001/api/local-items` on mount.
    - Use Axios (or `fetch`) to make the GET request and update the `localItems` state with the response data. Handle potential errors.
    - **GitHub Action:** Commit data fetching logic to `feature/frontend-data-fetching`.
- [ ] **To-do 3.3: Pass Data to `ItemList` Component:**
    - In `frontend/src/App.tsx`, pass the `localItems` state as a prop to the `<ItemList localItems={localItems} />` component.
    - **GitHub Action:** Commit prop passing to `feature/frontend-data-fetching`.
- [ ] **To-do 3.4: Render Data in `ItemList`:**
    - In `frontend/src/components/ItemList.tsx`, receive the `localItems` prop (`LocalItem[]`).
    - Use `.map()` to iterate over `localItems` and render an `<ItemCard localItem={item} key={item.id} />` for each.
    - **GitHub Action:** Commit rendering logic to `feature/frontend-data-fetching`.
- [ ] **To-do 3.5: Render Data in `ItemCard`:**
    - In `frontend/src/components/ItemCard.tsx`, receive the `localItem` prop (`LocalItem`).
    - Display relevant properties (e.g., `localItem.name`, `localItem.type`, `localItem.description`) in the JSX.
    - **GitHub Action:** Commit rendering in `ItemCard` to `feature/frontend-data-fetching`.
- [ ] **To-do 3.6: Test Data Display (Local Backend):**
    - Ensure backend (`npm run dev` in `backend`) and frontend (`npm start` in `frontend`) are running. Verify data from the backend is displayed in the frontend.
    - **GitHub Action:** (No code change, ensure testing).
- [ ] **To-do 3.7: Merge Frontend Data Fetching:**
    - Create PR from `feature/frontend-data-fetching` to `main`. Review and merge.
    - **GitHub Action:** Merge PR. Note merge commit link.

### Chunk 4: Backend Setup for AWS Lambda & API Gateway (Assigned to: Mariam)

- [ ] **To-do 4.1: Install AWS SDK for Node.js (if needed):**
    - In `backend`, install: `npm install aws-sdk`. (Optional for this simple data serving).
    - **GitHub Action:** Create branch `feature/backend-lambda-api`. Commit dependency install (if any).
- [ ] **To-do 4.2: Create Lambda Function Entry Point:**
    - Create `backend/src/lambda.ts`.
    - Implement a handler function (e.g., `exports.handler = async (event) => { ... }`) that:
        - Reads data from `backend/data.json`.
        - Returns a response object for API Gateway: `{ statusCode: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }`.
    - **GitHub Action:** Commit Lambda function code to `feature/backend-lambda-api`.
- [ ] **To-do 4.3: Configure TypeScript for Lambda:**
    - Review `backend/tsconfig.json` to ensure output (`outDir`) and target (`target`, `module`) are suitable for Node.js in Lambda.
    - **GitHub Action:** Commit `tsconfig.json` changes to `feature/backend-lambda-api`.
- [ ] **To-do 4.4: Create Deployment Package (ZIP file):**
    - Create a ZIP file containing compiled `.js` files (from `outDir`), `data.json`, and necessary `node_modules` (consider minimizing for Lambda).
    - **GitHub Action:** (No direct code change, document the process).
- [ ] **To-do 4.5: Set up AWS Lambda Function:**
    - Use AWS Console/CLI to create a new Lambda function with Node.js runtime.
    - Upload the ZIP deployment package.
    - Set the handler (e.g., `lambda.handler`).
    - **GitHub Action:** (Document steps in `backend/README-lambda.md`).
- [ ] **To-do 4.6: Set up Amazon API Gateway:**
    - Use AWS Console/CLI to create an HTTP API.
    - Define a GET route (`/api/local-items`).
    - Integrate the route with your Lambda function.
    - Deploy the API to get an invoke URL.
    - **GitHub Action:** (Document steps in `backend/README-lambda.md`).
- [ ] **To-do 4.7: Test Backend Endpoint (AWS API Gateway):**
    - Access the API Gateway invoke URL (e.g., using a browser or `curl`) to verify it returns the JSON data from your Lambda function.
    - **GitHub Action:** (No code change, ensure testing).
- [ ] **To-do 4.8: Merge Backend Lambda Setup:**
    - Create PR from `feature/backend-lambda-api` to `main`. Review code and documentation.
    - **GitHub Action:** Merge PR. Note merge commit link.

## Phase 3: Week 3 - Deployment + Development (Branches: `feature/frontend-filtering`, `feature/frontend-deployment`)

### Chunk 5: Implement Frontend Filtering (Assigned to: Megi)

- [ ] **To-do 5.1: Create Filtering State:**
    - In `frontend/src/App.tsx`, create a new state variable using `useState` to store the current filter keyword (initially an empty string).
    - **GitHub Action:** Create branch `feature/frontend-filtering`. Commit state creation.
- [ ] **To-do 5.2: Pass Filter State to `SearchBar`:**
    - Pass the filter state and its setter function (from `useState`) as props to the `SearchBar` component.
    - **GitHub Action:** Commit prop passing to `feature/frontend-filtering`.
- [ ] **To-do 5.3: Implement `SearchBar` Input Handling:**
    - In `frontend/src/components/SearchBar.tsx`, receive the filter state and its setter as props.
    - Implement an `onChange` handler for the input field that updates the filter state whenever the user types.
    - **GitHub Action:** Commit input handling to `feature/frontend-filtering`.
- [ ] **To-do 5.4: Implement Filtering Logic in `App`:**
    - In `frontend/src/App.tsx`, create a new derived state variable (using `useMemo`) that filters the `localItems` based on the current filter keyword.
    - The filtering logic should check if the keyword (converted to lowercase) is present in the `name` or `description` (or other relevant fields) of each `LocalItem` (also converted to lowercase).
    - **GitHub Action:** Commit filtering logic to `feature/frontend-filtering`.
- [ ] **To-do 5.5: Pass Filtered Data to `ItemList`:**
    - Pass the `filteredLocalItems` derived state (instead of the original `localItems`) as the prop to the `ItemList` component.
    - **GitHub Action:** Commit passing filtered data to `feature/frontend-filtering`.
- [ ] **To-do 5.6: Test Filtering:**
    - Run your frontend locally. Type keywords in the search bar and verify that the list of items is correctly filtered.
    - **GitHub Action:** (No code change, ensure testing).
- [ ] **To-do 5.7: Merge Frontend Filtering:**
    - Create PR from `feature/frontend-filtering` to `main`. Review and merge.
    - **GitHub Action:** Merge PR. Note merge commit link.

### Chunk 6: Frontend Deployment to AWS S3 (Assigned to: Mariam)

- [ ] **To-do 6.1: Install `aws-cli` (if not already installed):**
    - Follow AWS documentation to install the AWS Command Line Interface (CLI) on your local machine.
    - **GitHub Action:** (No code change, ensure setup). Create branch `feature/frontend-deployment`. Add a `deployment/frontend/README.md` to document this setup.
- [ ] **To-do 6.2: Configure AWS Credentials:**
    - Configure your AWS CLI with the necessary credentials (access key ID and secret access key) that have permissions to access S3.
    - **GitHub Action:** (No code change, ensure secure configuration). Document in `deployment/frontend/README.md`.
- [ ] **To-do 6.3: Create an S3 Bucket:**
    - Use the AWS Management Console or AWS CLI to create a new S3 bucket in your desired region to host your frontend build. Make sure the bucket name is globally unique.
    - **GitHub Action:** (Document bucket creation in `deployment/frontend/README.md`).
- [ ] **To-do 6.4: Build the React Application for Production:**
    - In your `frontend` directory, run `npm run build` to create an optimized production build in the `build` folder.
    - **GitHub Action:** Commit any necessary build script changes to `feature/frontend-deployment`.
- [ ] **To-do 6.5: Upload Build Files to S3:**
    - Use the AWS CLI command `aws s3 sync build/ s3://your-bucket-name` (replace `your-bucket-name`) to upload the contents of your `frontend/build` folder to your S3 bucket.
    - **GitHub Action:** (Document the upload command in `deployment/frontend/README.md`).
- [ ] **To-do 6.6: Enable Static Website Hosting on S3:**
    - Use the AWS Management Console to enable static website hosting for your S3 bucket.
    - Set the "Index document" to `index.html` and optionally configure an "Error document".
    - Note the "Endpoint" URL provided by S3 for your static website.
    - **GitHub Action:** (Document the configuration steps in `deployment/frontend/README.md`).
- [ ] **To-do 6.7: Test the Deployed Frontend:**
    - Open the S3 static website endpoint URL in your web browser. Verify that your Local Data Lister application is running and displaying data (it should be fetching from your deployed API Gateway endpoint).
    - **GitHub Action:** (No code change, ensure testing).
- [ ] **To-do 6.8: Merge Frontend Deployment:**
    - Create PR from `feature/frontend-deployment` to `main`. Review documentation.
    - **GitHub Action:** Merge PR. Note merge commit link.

## Phase 4: Week 4 - Polish + Final Development (Branches: `feature/ui-enhancements`, `feature/documentation-testing`)

### Chunk 7: UI/UX Improvements (Basic Styling) (Assigned to: Megi)

- [ ] **To-do 7.1: Basic Styling of Components:**
    - Add more comprehensive CSS styles to your `App`, `ItemList`, `ItemCard`, and `SearchBar` components to improve the visual appearance and layout. Consider using CSS modules or styled components for better organization and to avoid naming conflicts.
    - **GitHub Action:** Create branch `feature/ui-enhancements`. Commit initial styling.
- [ ] **To-do 7.2: Improve List Presentation:**
    - Enhance the way the list of items is displayed. This could involve using grid or flexbox layouts in `ItemList` to arrange the `ItemCard` components.
    - **GitHub Action:** Commit list presentation improvements.
- [ ] **To-do 7.3: Style the `ItemCard`:**
    - Add styles to the `ItemCard` to clearly present the information for each local item (e.g., using different font sizes, borders, spacing).
    - **GitHub Action:** Commit `ItemCard` styling.
- [ ] **To-do 7.4: Style the `SearchBar`:**
    - Style the input field and any potential button in the `SearchBar` to make it visually appealing and easy to use.
    - **GitHub Action:** Commit `SearchBar` styling.
- [ ] **To-do 7.5: Add Basic Loading Indicator:**
    - Implement a simple loading indicator (e.g., a "Loading..." text or a spinner) that is displayed while the frontend is fetching data from the backend. This improves the user experience by providing feedback.
    - **GitHub Action:** Commit loading indicator implementation.
- [ ] **To-do 7.6: Test UI/UX Improvements:**
    - Run your deployed frontend application and verify that the styling and loading indicator enhance the user experience. Check for responsiveness on different screen sizes if possible (though not a primary requirement).
    - **GitHub Action:** (No code change, ensure testing).
- [ ] **To-do 7.7: Merge UI/UX Enhancements:**
    - Create PR from `feature/ui-enhancements` to `main`. Review and merge.
    - **GitHub Action:** Merge PR. Note merge commit link.

### Chunk 8: Documentation, Testing, and Final Review (Assigned to: Mariam)

- [ ] **To-do 8.1: Update README File:**
    - Update the main `README.md` file in your project root to provide a comprehensive overview of the project, setup instructions for local development (both frontend and backend), and basic information about the deployment process (mentioning AWS S3 and Lambda/API Gateway).
    - **GitHub Action:** Create branch `feature/documentation-testing`. Commit README updates.
- [ ] **To-do 8.2: Basic API Documentation:**
    - Create a separate document (e.g., `API.md` or within the README) to briefly describe your backend API endpoint (`/api/local-items`), including the HTTP method (GET) and the structure of the JSON data it returns (referencing the `LocalItem` interface).
    - **GitHub Action:** Commit API documentation.
- [ ] **To-do 8.3: Review Test Coverage (Frontend):**
    - Review the tests you've written for your frontend components (if any beyond basic CRA setup). Ensure that core functionalities like rendering the list and basic filtering are covered by tests. Write additional tests if necessary.
    - **GitHub Action:** Commit frontend test updates.
- [ ] **To-do 8.4: Review Test Coverage (Backend - Lambda):**
    - While unit testing a simple Lambda function that just reads a JSON file might be minimal, consider how you could test it (e.g., mocking the file system). Document any testing approach or lack thereof and the reasoning.
    - **GitHub Action:** Commit backend test considerations/updates.
- [ ] **To-do 8.5: Final Deployment Testing:**
    - Thoroughly test your deployed application on AWS (access the S3 website URL). Ensure that the frontend correctly fetches data from the API Gateway endpoint, the list is displayed, and the filtering functionality works as expected in the deployed environment.
    - **GitHub Action:** (No code change, ensure thorough testing).
- [ ] **To-do 8.6: Documentation of Deployment Steps (Detailed):**
    - Enhance the `deployment/frontend/README.md` and create a `deployment/backend/README-lambda.md` to provide more detailed step-by-step instructions on how you deployed your frontend to S3 and your backend to Lambda/API Gateway. This should include AWS CLI commands (if used) and console steps.
    - **GitHub Action:** Commit detailed deployment documentation.
- [ ] **To-do 8.7: Final Code Review:**
    - Perform a final review of the entire codebase, ensuring code clarity, consistency, and adherence to TypeScript best practices. Address any outstanding minor issues or potential improvements.
    - **GitHub Action:** Commit any final code refinements.
- [ ] **To-do 8.8: Merge Documentation and Testing:**
    - Create PR from `feature/documentation-testing` to `main`. Review and merge.
    - **GitHub Action:** Merge PR. Note merge commit link.