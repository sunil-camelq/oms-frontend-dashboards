import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/Login/ForgotPassword";
import OtpVerification from "./pages/Login/OtpVerification";
import ResetPassword from "./pages/Login/ResetPassword";

import { DashboardLayout } from "./components/Layout/Layout"; // Sidebar + Header layout
import Dashboard from "./components/Layout/Dashboard";
import Employees from "./pages/Employees";
import Tasks from "./pages/Tasks";


import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Payroll from "./pages/Payroll";
import Recruitment from "./pages/Recruitment";
import CompanyPerformance from "./pages/CompanyPerformance";
import Profile from "./pages/Profile";
import ExportData from "./pages/ExportData";
import Applicant from "./pages/Applicant";
import Interview from "./pages/Interview";
import AddApplicant from "./pages/AddApplicant";
import AddEmployee from "./pages/AddEmployee";
import EmployeeList from "./pages/EmployeeList";
import DocumentVerification from "./pages/DocumentVerification";
import EmployeePerformance from "./pages/EmployeePerformance";
import EmployeeTransitions from "./pages/EmployeeTransitions";
import AssetManagement from "./pages/AssetManagement";

import EmployeeRegistration from "./pages/EmployeeRegistration";
import EmployeeAssetRequests from "./pages/EmployeeAssetRequests";
import OperationsAssetRequests from "./pages/OperationsAssetRequests";
import Attendance from "./pages/Attendance";
import JobOpening from "./pages/JobOpening";






const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/employee-registration" element={<EmployeeRegistration />} />
          <Route path="/otp-verify" element={<OtpVerification/>} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Dashboard routes with layout */}
          <Route element={<DashboardLayout />}>
            <Route path="/HRdashboard" element={<Dashboard />} />
            <Route path="/companyperformance" element={<CompanyPerformance />} />
            <Route path="/recruitment/document-verification" element={<DocumentVerification />} />
            <Route path="/recruitment" element={<Recruitment />} />
            <Route path="/emp-performance" element={<EmployeePerformance />} />
            <Route path="/employees/transitions" element={<EmployeeTransitions />} />
            <Route path="/employees/operation/asset-request" element={<OperationsAssetRequests />} />
            <Route path="/employees/asset-requests" element={<EmployeeAssetRequests />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/employees/add" element={<AddEmployee />} />
            <Route path="/employees/list" element={<EmployeeList />} />

            {/* <Route path="/projectstatus" element={<ProjectStatus />} /> */}
            <Route path="/payroll" element={<Payroll />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/recruitment/jobs" element={<JobOpening />} />
            <Route path="/recruitment/applicants" element={<Applicant />} />
            <Route path="/recruitment/addapplicant" element={<AddApplicant />} />
            <Route path="/recruitment/interview" element={<Interview />} />

            <Route path="/tasks" element={<Tasks />} />

            <Route path="/exportdata" element={<ExportData />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/reports" element={<Reports />} />

            <Route path="/assetmanagement" element={<AssetManagement />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
