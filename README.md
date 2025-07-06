# Agriculture Management System

This project is a web-based Agriculture Management System built with **React**, **TypeScript**, **Redux Toolkit**, **Material UI**, and **Vite**. It helps users manage agricultural fields, track field works, and visualize costs and profits.

## Features

### 1. Authentication
- **Login/Signup**: Secure authentication using Firebase Auth API.
- **Session Persistence**: User sessions are stored in localStorage for persistent login.

### 2. Field Management
- **Add/Edit/Delete Fields**: Users can add new fields, edit existing ones, or remove them.
- **Field List**: All fields are displayed in a table with options to edit, delete, or view details.
- **Profit Tracking**: Each field can have an associated profit value.

### 3. Work Management
- **Add Work to Fields**: For each field, users can log various works (e.g., Irrigation, Pesticide, Harvesting) with date and cost.
- **Work List**: All works for a field are shown in a paginated table with total and page-wise cost summaries.

### 4. Data Visualization
- **Dashboard**: Visual overview of profits and costs using charts.
  - **Profit and Cost Pie Chart**: Shows total profit vs. total cost.
  - **Work-wise Cost Pie Chart**: Displays cost distribution by work type, filterable by field.
  - **Per Field Cost Bar Chart**: Compares profit and cost for each field.
- **Field Statistics Table**: Tabular view of all fields with their total costs.

### 5. Data Sync
- **Firebase Realtime Database**: All field and work data is stored and synced with Firebase.
- **Auto Refresh**: Data is periodically refreshed to keep the UI up-to-date.

### 6. UI/UX
- **Material UI**: Modern, responsive design using Material UI components.
- **Sidebar Navigation**: Collapsible sidebar for easy navigation between dashboard, fields, and statistics.
- **Loading Indicators**: Feedback during async operations.

## Project Structure

- `src/components/`: Reusable UI components (charts, layouts, tables).
- `src/pages/`: Page-level components (dashboard, fields, login).
- `src/store/`: Redux slices and API logic.
- `src/types/`: TypeScript type definitions.
- `src/hooks/`: Custom React hooks (e.g., Firebase data sync).

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Run the development server:**
   ```sh
   npm run dev
   ```

3. **Build for production:**
   ```sh
   npm run build
   ```

## License

This project is