import React from "react";
import Landing from "../pages/shared/Landing.jsx";
import Login from "../pages/shared/Login.jsx";
import Signup from "../pages/patient/auth/Signup.jsx";
import ProtectedRoute from "../auth/ProtectedRoute.jsx";
import PatientLayout from "../pages/patient/layout/PatientLayout.jsx";
import PatientHome from "../pages/patient/dashboard/PatientHome.jsx";
import Profile from "../pages/patient/dashboard/Profile.jsx";
import Appointments from "../pages/patient/dashboard/Appointments.jsx";
import ReceptionistLayout from "../pages/receptionist/layout/ReceptionistLayout.jsx";
import Approvals from "../pages/receptionist/dashboard/Approvals.jsx";
import AssignDoctor from "../pages/receptionist/dashboard/AssignDoctor.jsx";
import Billing from "../pages/receptionist/dashboard/Billing.jsx";
import AppointmentHistory from "../pages/patient/dashboard/AppointmentHistory.jsx";
import PatientBilling from "../pages/patient/dashboard/PatientBilling.jsx";
import MedicalRecords from "../pages/patient/dashboard/MedicalRecords.jsx";

export default [
  { path: "/", element: <Landing /> },
  { path: "/login", element: <Login /> },
  { path: "/patient/signup", element: <Signup /> },
  {
    path: "/patient",
    element: (
      <ProtectedRoute allowedRoles={["patient"]}>
        <PatientLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <PatientHome /> },
      { path: "profile", element: <Profile /> },
      { path: "appointments", element: <Appointments /> },
      { path: "appointment-history", element: <AppointmentHistory /> },
      { path: "billing", element: <PatientBilling /> },
      { path: "medical-records", element: <MedicalRecords /> },
    ],
  },
  {
    path: "/reception",
    element: (
      <ProtectedRoute allowedRoles={["staff"]}>
        <ReceptionistLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Approvals /> },
      { path: "assign", element: <AssignDoctor /> },
      { path: "billing", element: <Billing /> },
    ],
  },
];
