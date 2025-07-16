# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Documentation

### Implemented Features

This InfoHound tool implements the following core features:

- **URL Input and Query Execution:** Allows users to input a website URL for scraping.
- **Basic Data Extraction:** Extracts fundamental company details including:
    - Company Name
    - Website URL
    - Basic Contact Information (Email Addresses and Phone Numbers)
    - Technical Stack
- **Results Display:** Presents the extracted data in a clear, structured format within the application's interface.
- **Scrape Button:** Provides a simple user action to initiate the scraping process for the provided URL.
- **Scrape API:** A backend API endpoint handles the actual scraping logic, separating it from the frontend.
- **Smart Email Detection:** Includes logic to identify if scraped email addresses are in a standard format and flag those that are not.
- **Loading & Error Handling:** Provides visual feedback during the scraping process and gracefully handles potential errors such as network issues or inaccessible pages.

### Data Extraction Levels Demonstrated

### Technology Stack and Project Structure

This project is built with the following core technologies:

- **Next.js:** A React framework for building server-side rendered and static web applications.
- **TypeScript:** A superset of JavaScript that adds static typing.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **Genkit:** An open-source framework for building production-ready AI applications. This is used for the backend AI flows responsible for data extraction.

The project structure follows a standard Next.js convention with the addition of a `src/ai` directory for Genkit-related code:

- **`src/app`:** Contains the main application pages and routing.
- **`src/components`:** Houses reusable React components, including UI components built with Shadcn UI.
- **`src/hooks`:** Custom React hooks for managing state and logic.
- **`src/lib`:** Utility functions.
- **`src/ai`:** Contains the Genkit configurations, AI flows, and schema definitions for data extraction.


This tool fullfills all the  minimal requirements (Level 1)** and primarily demonstrates the **Medium Data Extraction (Level 2)** capabilities, focusing on core company information such as an overview,projects/products. Additionally, it incorporates the extraction of the **Technical Stack**, which aligns with a component of the **Advanced Data Extraction (Level 3)** level.

### Setup and Installation

#### Prerequisites
- **Node.js** (v18 or higher recommended) — Only required for local development and building the project
- **npm** (v9 or higher) or **yarn**
- (Optional) **Git** for cloning the repository

#### Getting Started

1. **Clone the repository**
   ```sh
   git clone <repository_url>
   cd <project_directory_name>
   ```

2. **Install dependencies** (choose one)
   ```sh
   # Using npm
   npm install
   # OR using yarn
   yarn install
   ```

3. **Run the development server**
   ```sh
   # Using npm
   npm run dev
   # OR using yarn
   yarn dev
   ```

4. **Open your browser** and visit [http://localhost:3000](http://localhost:3000) (or the port shown in your terminal) to view the application.

#### Additional Notes
- **Production/Static Hosting:** After building the project with `npm run build`, you can deploy the generated output to any static hosting provider. Node.js is not required to serve static files.
- If you encounter issues with hot reloading or refreshing, try restarting the development server.
- For production deployment with server-side features, use `npm run build` and `npm start` (Node.js required).

### Design Decisions and Assumptions

- **Backend API for Scraping:** A key design decision was to implement the scraping logic in a backend API. This separates concerns, improves maintainability, and provides a foundation for potential future scaling or supporting different frontend interfaces.
- **Assumption of Valid URLs:** While basic error handling is included for inaccessible pages, an assumption is made that the user will primarily provide valid and correctly formatted URLs. More robust URL validation could be added for a production environment.
- **Focus on Core Data:** The initial focus was on implementing the basic data extraction requirements effectively. Further data points (as outlined in the Medium and Advanced levels) could be added incrementally based on future needs.
# InfoHound
# InfoHound
