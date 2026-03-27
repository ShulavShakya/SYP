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
import PaymentSuccess from "../pages/patient/dashboard/PaymentSuccess.jsx";
import PaymentFailure from "../pages/patient/dashboard/PaymentFailure.jsx";
import PatientBilling from "../pages/patient/dashboard/PatientBilling.jsx";
import MedicalRecords from "../pages/patient/dashboard/MedicalRecords.jsx";
import Prescriptions from "../pages/patient/dashboard/Prescriptions.jsx";
import LabReports from "../pages/patient/dashboard/LabReports.jsx";
import ReceptionistHome from "../pages/receptionist/dashboard/ReceptionistHome.jsx";
import RegisterPatient from "../pages/receptionist/dashboard/RegisterPatient.jsx";
import PatientRecord from "../pages/receptionist/dashboard/PatientRecord.jsx";
import ReceptionsitAppointment from "../pages/receptionist/dashboard/AppointmentManagement.jsx";
import ScheduleAppointment from "../pages/receptionist/dashboard/ScheduleAppointment.jsx";
import MessagesPage from "../pages/receptionist/dashboard/MessagePage.jsx";
import DoctorLayout from "../pages/doctor/layout/DoctorLayout.jsx";
import DoctorHome from "../pages/doctor/dashboard/DoctorHome.jsx";
import PatientQueue from "../pages/doctor/dashboard/PatientQueue.jsx";
import ConsultationSession from "../pages/doctor/dashboard/ConsultationSession.jsx";
import PrescriptionCreation from "../pages/doctor/dashboard/PrescriptionCreation.jsx";
import DoctorProfile from "../pages/doctor/dashboard/DoctorProfile.jsx";
import AdminLayout from "../pages/admin/layout/AdminLayout.jsx";
import AdminHome from "../pages/admin/dashboard/AdminHome.jsx";
import DoctorManagement from "../pages/admin/dashboard/ForDoctor/DoctorManagement.jsx";
import PatientManagement from "../pages/admin/dashboard/ForPatient/PatientManagement.jsx";
import ReceptionistManagement from "../pages/admin/dashboard/ForReceptionist/ReceptionistManagement.jsx";
import AdminAppointmentManagement from "../pages/admin/dashboard/AdminAppointmentManagement.jsx";
import BillingManagement from "../pages/admin/dashboard/BillingManagement.jsx";
import AddDoctor from "../pages/admin/dashboard/ForDoctor/AddDoctor.jsx";
import AddReceptionist from "../pages/admin/dashboard/ForReceptionist/AddReceptionist.jsx";
import AddPatient from "../pages/admin/dashboard/ForPatient/AddPatient.jsx";
import UpdateReceptionist from "../pages/admin/dashboard/ForReceptionist/UpdateReceptionist.jsx";
import UpdateDoctor from "../pages/admin/dashboard/ForDoctor/UpdateDoctor.jsx";
import UpdatePatient from "../pages/admin/dashboard/ForPatient/UpdatePatient.jsx";
import PaymentVerify from "../pages/patient/dashboard/PaymentVerify.jsx";
import ReceptionistProfile from "../pages/receptionist/dashboard/ReceptionistProfile.jsx";

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
      { path: "payment-success", element: <PaymentSuccess /> },
      { path: "payment-failure", element: <PaymentFailure /> },
      { path: "billing", element: <PatientBilling /> },
      { path: "medical-records", element: <MedicalRecords /> },
      { path: "prescriptions", element: <Prescriptions /> },
      { path: "lab-reports", element: <LabReports /> },
      { path: "payment/verify", element: <PaymentVerify /> },
    ],
  },
  {
    path: "/reception",
    element: (
      <ProtectedRoute allowedRoles={["receptionist"]}>
        <ReceptionistLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <ReceptionistHome /> },
      { path: "approvals", element: <Approvals /> },
      { path: "assign", element: <AssignDoctor /> },
      { path: "billing", element: <Billing /> },
      { path: "register", element: <RegisterPatient /> },
      { path: "records", element: <PatientRecord /> },
      { path: "appointments", element: <ReceptionsitAppointment /> },
      { path: "add-appointment", element: <ScheduleAppointment /> },
      { path: "messages", element: <MessagesPage /> },
      { path: "profile", element: <ReceptionistProfile /> },
    ],
  },
  {
    path: "/doctor",
    element: (
      <ProtectedRoute allowedRoles={["doctor"]}>
        <DoctorLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DoctorHome /> },
      { path: "patient-queue", element: <PatientQueue /> },
      {
        path: "consultations",
        children: [
          { index: true, element: <ConsultationSession /> },
          { path: ":id", element: <ConsultationSession /> },
        ],
      },
      { path: "prescription-creation", element: <PrescriptionCreation /> },
      { path: "profile", element: <DoctorProfile /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminHome /> },
      { path: "doctor-management", element: <DoctorManagement /> },
      { path: "patient-management", element: <PatientManagement /> },
      { path: "receptionist-management", element: <ReceptionistManagement /> },
      {
        path: "appointment-management",
        element: <AdminAppointmentManagement />,
      },
      { path: "billing-management", element: <BillingManagement /> },
      { path: "add-doctor", element: <AddDoctor /> },
      { path: "add-receptionist", element: <AddReceptionist /> },
      { path: "add-patient", element: <AddPatient /> },
      { path: "update-receptionist/:id", element: <UpdateReceptionist /> },
      { path: "update-doctor/:id", element: <UpdateDoctor /> },
      { path: "update-patient/:id", element: <UpdatePatient /> },
    ],
  },
];
