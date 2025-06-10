#   Project: Local Data Lister - To-Do List

This document outlines the detailed to-do list for the Local Data Lister project, divided into phases and chunks, with specific instructions and GitHub branching strategy.

##   GitHub Branching Strategy

For each major chunk of work, create a new branch named `feature/[chunk-name]`. Once the work is complete and tested, create a Pull Request (PR) to merge it into the `main` branch. Include the PR or merge commit link in your task completion notes on the group dashboard.

##   Phase 1: Week 1 - Planning & Setup (Branches: `feature/backend-setup`, `feature/frontend-setup`)

###   Chunk 1: Backend Setup & Initial Data (Assigned to: Megi)

-   [x]   **To-do 1.1: Initialize Backend Project:**
    -   Navigate to the `backend` folder in the terminal.
    -   Run `npm init -y` to create `package.json`.
    -   Install dev dependencies: `npm install typescript ts-node nodemon @types/node --save-dev`.
    -   Install Express: `npm install express @types/express --save`.
    -   Initialize TypeScript config: `npx tsc --init`. Adjust `tsconfig.json` (e.g., `outDir`, `rootDir`, `esModuleInterop`, `strict`).
    -   **GitHub Action:** Create branch `feature/backend-setup`.
-   [x]   **To-do 1.2: Define Backend Data Interface:**
    -   Create `backend/src/types/LocalItem.ts`.
    -   Define the `LocalItem` interface based on `data.json` (e.g., `id: string`, `name: string`, `type: string`, `description: string`, `location?: string`, `features?: string[]`).
    -   **GitHub Action:** Commit to `feature/backend-setup`.
-   [x]   **To-do 1.3: Create `data.json` File:**
    -   Create `backend/data.json` with at least 3-4 sample local data items matching the `LocalItem` interface.
    -   **GitHub Action:** Commit to `feature/backend-setup`.
-   [x]   **To-do 1.4: Basic Express Server Setup:**
    -   Create `backend/src/server.ts`.
    -   Import Express, create an app instance, define a basic `/` route ("Hello from the Backend!"), start the server on a port (e.g., 3001).
    -   Add `"dev": "nodemon src/server.ts"` script to `backend/package.json`.
    -   **GitHub Action:** Commit to `feature/backend-setup`.
-   [x]   **To-do 1.5: Read Data from `data.json`:**
    -   In `backend/src/server.ts`, import the `fs` module.
    -   Implement logic to read and parse `backend/data.json` into a JavaScript array of `LocalItem` objects.
    -   **GitHub Action:** Commit to `feature/backend-setup`.
-   [x]   **To-do 1.6: Create `/api/local-items` Endpoint:**
    -   In `backend/src/server.ts`, define a GET route at `/api/local-items` that sends the array of `LocalItem` objects as a JSON response (status 200).
    -   **GitHub Action:** Commit to `feature/backend-setup`.
-   [x]   **To-do 1.7: Test Backend Endpoint (Manual):**
    -   Run backend (`npm run dev`). Access `http://localhost:3001/api/local-items` in a browser or tool to verify JSON response.
    -   **GitHub Action:** (No code change, ensure testing).
-   [x]   **To-do 1.8: Merge Backend Setup:**
    -   Create PR from `feature/backend-setup` to `main`. Review and merge.
    -   **GitHub Action:** Merge PR. Note merge commit link.

###   Chunk 2: Frontend Setup & Initial Component Structure (Assigned to: Mariam)

-   [x]   **To-do 2.1: Initialize Frontend Project:**
    -   Navigate to the project root.
    -   Run `npx create-react-app frontend --template typescript`.
    -   `cd frontend`.
    -   **GitHub Action:** Create branch `feature/frontend-setup`.
-   [x]   **To-do 2.2: Define Frontend Data Interface:**
    -   Create `frontend/src/types/LocalItem.ts`.
    -   Define the **same** `LocalItem` interface as in the backend.
    -   **GitHub Action:** Commit to `feature/frontend-setup`.
-   [x]   **To-do 2.3: Create Basic Component Structure:**
    -   Create `frontend/src/App.tsx`, `frontend/src/components/ItemList.tsx`, `frontend/src/components/ItemCard.tsx`, `frontend/src/components/SearchBar.tsx`.
    -   Implement basic functional components in each (e.g., `const ItemList: React.FC = () => { return <div>Item List</div>; };`).
    -   **GitHub Action:** Commit to `feature/frontend-setup`.
-   [x]   **To-do 2.4: Basic App Layout:**
    -   In `frontend/src/App.tsx`, import and render `ItemList` and `SearchBar`.
    -   **GitHub Action:** Commit to `feature/frontend-setup`.
-   [x]   **To-do 2.5: Initial Styling:**
    -   Add basic CSS in `frontend/src/App.css` or CSS modules for minimal visual structure. Import and apply styles.
    -   **GitHub Action:** Commit to `feature/frontend-setup`.
-   [x]   **To-do 2.6: Run Frontend Locally:**
    -   In `frontend`, run `npm start`. Verify basic component rendering at `http://localhost:3000`.
    -   **GitHub Action:** (No code change, ensure testing).
-   [x]   **To-do 2.7: Merge Frontend Setup:**
    -   Create PR from `feature/frontend-setup` to `main`. Review and merge.
    -   **GitHub Action:** Merge PR. Note merge commit link.

##   Phase 2: Week 2 - Minimal App + Testing (Branches: `feature/frontend-data-fetching`, `feature/backend-api`)

###   Chunk 3: Frontend Data Fetching, Display, & Search (Assigned to: Megi)

-   [x]   **To-do 3.1: Install Axios (or use Fetch API):**
    -   In `frontend`, install Axios: `npm install axios`. (Or decide to use the built-in `fetch`).
    -   **GitHub Action:** Create branch `feature/frontend-data-fetching`. Commit dependency installation.

-   [x]   **To-do 3.2: Implement Data Fetching Logic:**
    -   In `frontend/src/App.tsx`, create a `localItems` state using `useState<LocalItem[]>`.
    -   Use `useEffect` to fetch data from `http://localhost:3001/api/local-items` on mount.
    -   Use Axios (or `fetch`) to make the GET request and update the `localItems` state with the response data. Handle potential errors.
    -   **GitHub Action:** Commit data fetching logic to `feature/frontend-data-fetching`.

-   [ ]   **To-do 3.3: Pass Data to `ItemList` Component:**
    -   In `frontend/src/App.tsx`, pass the `localItems` state as a prop to the `<ItemList />` component.
    -   **GitHub Action:** Commit prop passing to `feature/frontend-data-fetching`.

-   [ ]   **To-do 3.4: Render Data in `ItemList`:**
    -   In `frontend/src/components/ItemList.tsx`, receive the `localItems` prop (`LocalItem[]`).
    -   Use `.map()` to iterate over `localItems` and render an `<ItemCard localItem={item} key={item.id} />` for each.
    -   **GitHub Action:** Commit rendering logic to `feature/frontend-data-fetching`.

-   [ ]   **To-do 3.5: Render Data in `ItemCard`:**
    -   In `frontend/src/components/ItemCard.tsx`, receive the `localItem` prop (`LocalItem`).
    -   Display relevant properties (e.g., `localItem.name`, `localItem.type`, `localItem.description`) in the JSX.
    -   **GitHub Action:** Commit rendering in `ItemCard` to `feature/frontend-data-fetching`.

-   [ ]   **To-do 3.6: Test Data Display (Local Backend):**
    -   Ensure backend (`npm run dev` in `backend`) and frontend (`npm start` in `frontend`) are running. Verify data from the backend is displayed in the frontend.
    -   **GitHub Action:** (No code change, ensure testing).

-   [ ]   **To-do 3.7: Manage Search State:**
    -   In `frontend/src/App.tsx`, create a new state for the search query (e.g., `const [searchQuery, setSearchQuery] = useState('');`).
    -   **GitHub Action:** Commit search state to `feature/frontend-data-fetching`.

-   [ ]   **To-do 3.8: Handle Search Input:**
    -   Pass the `searchQuery` state and the `setSearchQuery` function as props to the `<SearchBar />` component.
    -   In `SearchBar.tsx`, make the input a controlled component by linking its `value` and `onChange` event to the props.
    -   **GitHub Action:** Commit search input handling to `feature/frontend-data-fetching`.

-   [ ]   **To-do 3.9: Filter Displayed Data:**
    -   In `App.tsx`, before passing data to `<ItemList />`, create a new filtered array based on the `searchQuery`.
    -   Pass this `filteredItems` array to the `ItemList` component instead of the original `localItems`.
    -   **GitHub Action:** Commit filtering logic to `feature/frontend-data-fetching`.

-   [ ]   **To-do 3.10: Merge Frontend Data & Search:**
    -   Create PR from `feature/frontend-data-fetching` to `main`. Review and merge.
    -   **GitHub Action:** Merge PR. Note merge commit link.

###   Chunk 4: Backend Setup for API (Assigned to: Mariam)

-   [ ]   **To-do 4.1: Refactor Backend for API:**
    -   In `backend/src/server.ts`, refactor the code to strictly serve the API. Remove any code related to serving static files or HTML. The server should only respond with JSON data.
    -   **GitHub Action:** Create branch `feature/backend-api`. Commit backend refactor.
-   [ ]   **To-do 4.2: Ensure API Endpoint Functionality:**
    -   Double-check that the `/api/local-items` endpoint is working correctly and returning the expected JSON data.
    -   **GitHub Action:** Commit any necessary fixes to `feature/backend-api`.
-   [ ]   **To-do 4.3: Configure CORS (if needed):**
    -   If you anticipate your frontend and backend running on different ports or domains (which they will on EC2 if served separately), install and configure the `cors` middleware in your backend: `npm install cors @types/cors`.
    -   This will allow requests from your frontend to your backend.
    -   **GitHub Action:** Commit CORS configuration (if needed).
-   [ ]   **To-do 4.4: Test API Endpoint:**
    -   Use a tool like `curl` or Postman to test the `/api/local-items` endpoint and ensure it returns the correct data and headers.
    -   **GitHub Action:** (No code change, ensure testing).
-   [ ]   **To-do 4.5: Create Production Build Script (Backend):**
    -   Add a script to your `backend/package.json` to start the server in production mode (e.g., `"start:prod": "node dist/server.js"`). Ensure that you have compiled your TypeScript code to JavaScript (`npx tsc`).
    -   **GitHub Action:** Commit production build script.
-   [ ]   **To-do 4.6: Merge Backend API Setup:**
    -   Create PR from `feature/backend-api` to `main`. Review and merge.
    -   **GitHub Action:** Merge PR. Note merge commit link.

##   Phase 3: Week 3 - Deployment + Development (Branches: `feature/ec2-setup`, `feature/ec2-deployment`)

###   Chunk 5: AWS EC2 Instance Setup (Assigned to: Megi)

-   [ ]   **To-do 5.1: Launch EC2 Instance:**
    -   Use the AWS Management Console to launch an EC2 instance. Choose an appropriate AMI (e.g., Amazon Linux 2023), instance type (e.g., t2.micro), and create a new key pair for SSH access.
    -   **GitHub Action:** Create branch `feature/ec2-setup`. (No code change, document steps in `deployment/ec2/README.md`).
-   [ ]   **To-do 5.2: Configure Security Groups:**
    -   Configure the security group for the EC2 instance to allow:
        -   SSH access (port 22) from your IP address or a specific range.
        -   HTTP access (port 80) and/or HTTPS access (port 443) from anywhere.
        -   The port your backend server will run on (e.g., 3000) from anywhere.
    -   **GitHub Action:** (Document security group configuration in `deployment/ec2/README.md`).
-   [ ]   **To-do 5.3: Connect to EC2 Instance:**
    -   Use an SSH client (like your terminal or PuTTY) to connect to your EC2 instance using the downloaded key pair and the instance's public IP address or DNS name.
    -   **GitHub Action:** (Document connection steps in `deployment/ec2/README.md`).
-   [ ]   **To-do 5.4: Install Node.js, npm, and Git:**
    -   On the EC2 instance, install Node.js, npm, and Git using the instance's package manager (e.g., `sudo yum install nodejs`, `sudo yum install git` on Amazon Linux).
    -   **GitHub Action:** (Document installation commands in `deployment/ec2/README.md`).
-   [ ]   **To-do 5.5: Install PM2 (Process Manager):**
    -   Install PM2 globally on the EC2 instance: `sudo npm install -g pm2`. This will help keep your Node.js server running.
    -   **GitHub Action:** (Document PM2 installation in `deployment/ec2/README.md`).
-   [ ]   **To-do 5.6: Test EC2 Setup:**
    -   Verify that Node.js, npm, and Git are installed correctly by checking their versions (e.g., `node -v`, `npm -v`, `git --version`).
    -   **GitHub Action:** (No code change, ensure testing).
-   [ ]   **To-do 5.7: Merge EC2 Setup:**
    -   Create PR from `feature/ec2-setup` to `main`. Review documentation.
    -   **GitHub Action:** Merge PR. Note merge commit link.

###   Chunk 6: Deploy Frontend and Backend to EC2 (Assigned to: Mariam)

-   [ ]   **To-do 6.1: Clone Repository to EC2:**
    -   On the EC2 instance, clone your project's Git repository to a directory (e.g., `/var/www/your-project`).
    -   **GitHub Action:** Create branch `feature/ec2-deployment`. (Document the clone command in `deployment/ec2/README.md`).
-   [ ]   **To-do 6.2: Install Backend Dependencies:**
    -   Navigate to the `backend` directory on the EC2 instance and run `npm install` to install the backend dependencies.
    -   **GitHub Action:** (Document backend dependency installation in `deployment/ec2/README.md`).
-   [ ]   **To-do 6.3: Build Frontend for Production:**
    -   Navigate to the `frontend` directory on the EC2 instance and run `npm run build` to create a production build of your React application.
    -   **GitHub Action:** (Document frontend build command in `deployment/ec2/README.md`).
-   [ ]   **To-do 6.4: Serve Frontend with Nginx (Recommended) or Node.js:**
    -   **Nginx (Recommended):**
        -   Install Nginx on the EC2 instance: `sudo yum install nginx`.
        -   Configure Nginx to serve the static files from your `frontend/build` directory. You'll need to create an Nginx configuration file (e.g., in `/etc/nginx/conf.d/your-project.conf`) that specifies the `root` directory and sets up a `server` block.
        -   Start/restart Nginx: `sudo systemctl start nginx` or `sudo systemctl restart nginx`.
    -   **Node.js (Alternative):**
        -   Alternatively, you can use a Node.js package like `serve` to serve the static files: `npm install -g serve` and then `serve -s frontend/build`.
    -   **GitHub Action:** (Document Nginx or Node.js serving configuration in `deployment/ec2/README.md`).
-   [ ]   **To-do 6.5: Run Backend with PM2:**
    -   Navigate to the `backend` directory on the EC2 instance.
    -   Start your Node.js server using PM2 to ensure it keeps running: `pm2 start npm --name backend -- run start:prod`.
    -   Configure PM2 to start on system boot: `pm2 startup` and follow the instructions. Then save the current PM2 process list: `pm2 save`.
    -   **GitHub Action:** (Document PM2 setup in `deployment/ec2/README.md`).
-   [ ]   **To-do 6.6: Update Frontend API URL:**
    -   In your frontend code on the EC2 instance, update the API endpoint URL to point to the server running on the same EC2 instance. Use the EC2 instance's public IP address or DNS name (e.g., `http://your-ec2-public-ip:3000/api/local-items`). You might need to rebuild the frontend after this change.
    -   **GitHub Action:** (Document API URL update in `deployment/ec2/README.md`).
-   [ ]   **To-do 6.7: Test Deployed Application:**
    -   Access your application in a web browser using the EC2 instance's public IP address or DNS name (if configured). Verify that both the frontend and backend are working correctly.
    -   **GitHub Action:** (No code change, ensure thorough testing).
-   [ ]   **To-do 6.8: Merge EC2 Deployment:**
    -   Create PR from `feature/ec2-deployment` to `main`. Review documentation.
    -   **GitHub Action:** Merge PR. Note merge commit link.

##   Phase 4: Week 4 - Polish + Final Development (Branches: `feature/ui-enhancements`, `feature/documentation-testing`)

###   Chunk 7: UI/UX Improvements (Basic Styling) (Assigned to: Megi)

-   [ ]   **To-do 7.1: Basic Styling of Components:**
    -   Add more comprehensive CSS styles to your `App`, `ItemList`, `ItemCard`, and `SearchBar` components to improve the visual appearance and layout. Consider using CSS modules or styled components for better organization and to avoid naming conflicts.
    -   **GitHub Action:** Create branch `feature/ui-enhancements`. Commit initial styling.
-   [ ]   **To-do 7.2: Improve List Presentation:**
    -   Enhance the way the list of items is displayed. This could involve using grid or flexbox layouts in `ItemList` to arrange the `ItemCard` components.
    -   **GitHub Action:** Commit list presentation improvements.
-   [ ]   **To-do 7.3: Style the `ItemCard`:**
    -   Add styles to the `ItemCard` to clearly present the information for each local item (e.g., using different font sizes, borders, spacing).
    -   **GitHub Action:** Commit `ItemCard` styling.
-   [ ]   **To-do 7.4: Style the `SearchBar`:**
    -   Style the input field and any potential button in the `SearchBar` to make it visually appealing and easy to use.
    -   **GitHub Action:** Commit `SearchBar` styling.
-   [ ]   **To-do 7.5: Add Basic Loading Indicator:**
    -   Implement a simple loading indicator (e.g., a "Loading..." text or a spinner) that is displayed while the frontend is fetching data from the backend. This improves the user experience by providing feedback.
    -   **GitHub Action:** Commit loading indicator implementation.
-   [ ]   **To-do 7.6: Test UI/UX Improvements:**
    -   Run your deployed application and verify that the styling and loading indicator enhance the user experience. Check for responsiveness on different screen sizes if possible (though not a primary requirement).
    -   **GitHub Action:** (No code change, ensure testing).
-   [ ]   **To-do 7.7: Merge UI/UX Enhancements:**
    -   Create PR from `feature/ui-enhancements` to `main`. Review and merge.
    -   **GitHub Action:** Merge PR. Note merge commit link.

###   Chunk 8: Documentation, Testing, and Final Review (Assigned to: Mariam)

-   [ ]   **To-do 8.1: Update README File:**
    -   Update the main `README.md` file in your project root to provide a comprehensive overview of the project, setup instructions for local development (both frontend and backend), and detailed instructions on how to deploy the application to AWS EC2. Include steps for EC2 setup, security group configuration, code deployment, and running the application.
    -   **GitHub Action:** Create branch `feature/documentation-testing`. Commit README updates.
-   [ ]   **To-do 8.2: Basic API Documentation:**
    -   Create a separate document (e.g., `API.md` or within the README) to briefly describe your backend API endpoint (`/api/local-items`), including the HTTP method (GET) and the structure of the JSON data it returns (referencing the `LocalItem` interface).
    -   **GitHub Action:** Commit API documentation.
-   [ ]   **To-do 8.3: Review Test Coverage (Frontend):**
    -   Review the tests you've written for your frontend components (if any beyond basic CRA setup). Ensure that core functionalities like rendering the list and basic filtering are covered by tests. Write additional tests if necessary.
    -   **GitHub Action:** Commit frontend test updates.
-   [ ]   **To-do 8.4: Review Test Coverage (Backend):**
    -   Review the tests you've written for your backend API. Ensure that the API endpoint returns the correct data and handles potential errors appropriately. Write additional tests if necessary.
    -   **GitHub Action:** Commit backend test updates.
-   [ ]   **To-do 8.5: Final Deployment Testing:**
    -   Thoroughly test your deployed application on AWS EC2. Ensure that the frontend correctly fetches data from the backend API, the list is displayed, and the filtering functionality works as expected in the deployed environment. Test on different browsers and devices if possible.
    -   **GitHub Action:** (No code change, ensure thorough testing).
-   [ ]   **To-do 8.6: Documentation of Deployment Steps (Detailed):**
    -   Create a `deployment/ec2/README.md` file to provide detailed step-by-step instructions on how you deployed your frontend and backend to the EC2 instance. This should include:
        -   EC2 instance setup (AMI, instance type, key pair).
        -   Security group configuration.
        -   SSH connection instructions.
        -   Installation of Node.js, npm, Git, and Nginx (or `serve`).
        -   Cloning the repository.
        -   Installing dependencies.
        -   Building the frontend.
        -   Configuring Nginx (or `serve`) to serve the frontend.
        -   Running the backend with PM2.
        -   Updating the frontend API URL.
    -   **GitHub Action:** Commit detailed deployment documentation.
-   [ ]   **To-do 8.7: Final Code Review:**
    -   Perform a final review of the entire codebase, ensuring code clarity, consistency, and adherence to TypeScript best practices. Address any outstanding minor issues or potential improvements.
    -   **GitHub Action:** Commit any final code refinements.
-   [ ]   **To-do 8.8: Merge Documentation and Testing:**
    -   Create PR from `feature/documentation-testing` to `main`. Review and merge.
    -   **GitHub Action:** Merge PR. Note merge commit link.
