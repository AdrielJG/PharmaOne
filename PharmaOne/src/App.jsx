import { useState } from 'react';
import './App.css';
import ProtectedRoute from "./ProtectedRoute"; // Import Protected Route
import { AuthProvider } from "./AuthContext";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



/* Manufacturer */
import Layout from './Modules/Manufacturer/components/Layout';
import Dashboard from './Modules/Manufacturer/components/Dashboard';
import Inventory from './Modules/Manufacturer/components/Inventory';
import MedicineList from './Modules/Manufacturer/components/Inventory/MedicineList';
import MedicineDetails from './Modules/Manufacturer/components/Inventory/MedicineDetails';
import AddMedicine from './Modules/Manufacturer/components/Inventory/AddMedicine';
import MedicineGroups from './Modules/Manufacturer/components/Inventory/MedicineGroups';
import Configuration from './Modules/Manufacturer/components/Configuration';
import Home from './Modules/Manufacturer/components/Home';
import Login from './Modules/Manufacturer/components/Login';
import ComplianceRecords from './Modules/Manufacturer/components/ComplianceRecords';
import Groups from './Modules/Manufacturer/components/Groups';
import OngoingOrders from './Modules/Manufacturer/components/OngoingOrders';
import Notification from './Modules/Manufacturer/components/Notification';
import DisOrders from './Modules/Manufacturer/components/DisOrders';
import DispatchedOrders from './Modules/Manufacturer/components/DispatchedOrders';
import Registration from './Modules/Manufacturer/components/Registration/Registration';
import RequestsPage from './Modules/Manufacturer/components/Requests';
import OrderDetails from './Modules/Manufacturer/components/OrderDetails';
import ProfilePage from './Modules/Manufacturer/components/ProfilePage'
import ContactUs from './Modules/Manufacturer/components/ContactUs';
import ChatInterface from './Modules/Manufacturer/components/ChatInterface';
import SalesReport from './Modules/Manufacturer/components/SalesReport';
import Registration2 from './Modules/Manufacturer/components/Registration/Registration2';

/* Distributer */
import LayoutD from './Modules/Distributor/components/Distributor/Layout';
import DashboardD from './Modules/Distributor/components/Distributor/Dashboard';
import ReportsD from './Modules/Distributor/components/Distributor/Reports';
import ConfigurationD from './Modules/Distributor/components/Distributor/Configuration';
import HomeD from './Modules/Distributor/components/Distributor/Home';
import LoginD from './Modules/Distributor/components/Distributor/Login';
import ComplianceRecordsD from './Modules/Distributor/components/Distributor/ComplianceRecords';
import GroupsD from './Modules/Distributor/components/Distributor/Groups';
import NotificationD from './Modules/Distributor/components/Distributor/Notification';
import ContactUsD from './Modules/Distributor/components/Distributor/ContactUs';
import ChatInterfaceD from './Modules/Distributor/components/Distributor/ChatInterface';
import Registration2D from './Modules/Distributor/components/Registration/Registration2';
import ProfileD from './Modules/Distributor/components/Distributor/ProfilePage';
import QReportD from './Modules/Distributor/components/Distributor/QualityReport';
import QualityRecD from './Modules/Distributor/components/Distributor/QualityRecords';
import InventoryOverviewD from './Modules/Distributor/components/Distributor/InventoryOverview';
import FinancialsD from './Modules/Distributor/components/Distributor/Financials';
import ShipmentPerformanceD from './Modules/Distributor/components/Distributor/ShipmentPerformance';
import SupplierManagementD from './Modules/Distributor/components/Distributor/SupplierManagement';
import OrdersD from './Modules/Distributor/components/Distributor/Orders';
import PendingOrdersD from './Modules/Distributor/components/Distributor/PendingOrders';
import DispatchedOrdersD from './Modules/Distributor/components/Distributor/DispatchedOrders';
import MedicineDetailsD from './Modules/Distributor/components/Inventory/MedicineDetails';
import DispatchReportD from './Modules/Distributor/components/Distributor/DispatchReport';

/* Regulator */
import LayoutR from './Modules/Regulator/components/Regulators/Layout';
import DashboardR from './Modules/Regulator/components/Regulators/Dashboard';
import ReportsR from './Modules/Regulator/components/Regulators/Reports';
import ConfigurationR from './Modules/Regulator/components/Regulators/Configuration';
import HomeR from './Modules/Regulator/components/Regulators/Home';
import LoginR from './Modules/Regulator/components/Regulators/Login';
import ComplianceRecordsR from './Modules/Regulator/components/Regulators/ComplianceRecords';
import GroupsR from './Modules/Regulator/components/Regulators/Groups';
import NotificationR from './Modules/Regulator/components/Regulators/Notification';
import ContactUsR from './Modules/Regulator/components/Regulators/ContactUs';
import Registration2R from './Modules/Regulator/components/Registration/Registration2';
import ProfileR from './Modules/Regulator/components/Regulators/ProfilePage';
import SalesReportR from './Modules/Regulator/components/Regulators/SalesReport';
import QReportR from './Modules/Regulator/components/Regulators/QualityReport';
import QualityRecR from './Modules/Regulator/components/Regulators/QualityRecords';
import DistributorDashboardR from './Modules/Regulator/components/Regulators/DistributorDashboard';
import ChatInterfaceR from './Modules/Regulator/components/Regulators/ChatInterface';

/* Pharmacy */
import LayoutP from './Modules/Pharmacy/components/Pharmacy/Layout';
import DashboardP from './Modules/Pharmacy/components/Pharmacy/Dashboard';
import InventoryP from './Modules/Pharmacy/components/Pharmacy/Inventory';
import ReportsP from './Modules/Pharmacy/components/Pharmacy/Reports';
import MedicineListP from './Modules/Pharmacy/components/Inventory/MedicineList';
import MedicineDetailsP from './Modules/Pharmacy/components/Inventory/MedicineDetails';
import AddMedicineP from './Modules/Pharmacy/components/Inventory/AddMedicine';
import MedicineGroupsP from './Modules/Pharmacy/components/Inventory/MedicineGroups';
import ConfigurationP from './Modules/Pharmacy/components/Pharmacy/Configuration';
import OrderPageP from './Modules/Pharmacy/components/Pharmacy/OrderPage';
import HomeP from './Modules/Pharmacy/components/Pharmacy/Home';
import LoginP from './Modules/Pharmacy/components/Pharmacy/Login';
import ComplianceRecordsP from './Modules/Pharmacy/components/ComplianceRecords';
import GroupsP from './Modules/Pharmacy/components/Pharmacy/Groups';
import OngoingOrdersP from './Modules/Pharmacy/components/Pharmacy/OngoingOrders';
import NewOrdersP from './Modules/Pharmacy/components/Pharmacy/NewOrder';
import NotificationP from './Modules/Pharmacy/components/Pharmacy/Notification';
import DisOrdersP from './Modules/Pharmacy/components/Pharmacy/DisOrders';
import DispatchedOrdersP from './Modules/Pharmacy/components/Pharmacy/DispatchedOrders';
import RegistrationP from './Modules/Pharmacy/components/Registration/Registration';
import OrderDetailsP from './Modules/Pharmacy/components/Pharmacy/OrderDetails';
import ProfilePageP from './Modules/Pharmacy/components/Pharmacy/ProfilePage'
import ContactUsP from './Modules/Pharmacy/components/Pharmacy/ContactUs';
import ChatInterfaceP from './Modules/Pharmacy/components/Pharmacy/ChatInterface';
import SalesReportP from './Modules/Pharmacy/components/Pharmacy/SalesReport';
import Registration2P from './Modules/Pharmacy/components/Registration/Registration2';
import GroupsMedicinesListP from './Modules/Pharmacy/components/Inventory/GroupsMedicinesList';

/* Admin */
import LayoutA from './Modules/Admin/components/Admin/Layout';
import DashboardA from './Modules/Admin/components/Admin/Dashboard';
import ReportsA from './Modules/Admin/components/Admin/Reports';
import ConfigurationA from './Modules/Admin/components/Admin/Configuration';
import HomeA from './Modules/Admin/components/Admin/Home';
import LoginA from './Modules/Admin/components/Admin/Login';
import ComplianceRecordsA from './Modules/Admin/components/Admin/Users';
import GroupsA from './Modules/Admin/components/Admin/Groups';
import NotificationA from './Modules/Admin/components/Admin/Notification';
import ContactUsA from './Modules/Admin/components/Admin/ContactUs';
import Registration2A from './Modules/Admin/components/Registration/Registration2';
import ProfileA from './Modules/Admin/components/Admin/ProfilePage';
import QReportA from './Modules/Admin/components/Admin/QualityReport';
import QualityRecA from './Modules/Admin/components/Admin/QualityRecords';
import InventoryA from './Modules/Admin/components/Admin/Compliance';
import ComplianceListA from './Modules/Admin/components/Admin/ComplianceList';
import ScheduledA from './Modules/Admin/components/Admin/ScheduledComp';
import FeedbackA from './Modules/Admin/components/Admin/Feedback';
import FinanceA from './Modules/Admin/components/Admin/Finance';
import AuditA from './Modules/Admin/components/Admin/Audit';
import RequestsA from './Modules/Admin/components/Admin/Requests';
import MedicineListA from './Modules/Admin/components/Admin/InventoryList';
import UserReportA from './Modules/Admin/components/Admin/UserReports';
import SiteReportA from './Modules/Admin/components/Admin/SiteReports';
import DocumentVerificationA from './Modules/Admin/components/Admin/Documents';
import ChatInterfaceA from './Modules/Admin/components/Admin/ChatInterface';

import Unauthorized from './Unauthorized'
import NotVerified from './Notverified';

function App() {
  const [count, setCount] = useState(0);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Route for login page */}
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/registration2" element={<Registration2 />} />
          <Route path="/" element={<Home />} />

          <Route path="/notverified" element={<NotVerified />} />

          {/* Routes for the rest of the application */}
          {/* Manufacturer */}
          <Route element={<ProtectedRoute allowedRoles={["manufacturer"]} />}>
            <Route path="/" element={<Layout />}>
              <Route path="/track" element={<OrderDetails />} />
              <Route path="/notifications" element={<Notification />} />
              <Route path="/disorder" element={<DisOrders />} />
              <Route path="/dispatch" element={<DispatchedOrders />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/configuration" element={<Configuration />} />
              <Route path="/inventory/medicinelist" element={<MedicineList />} />
              <Route path="/inventory/medicinegroups" element={<MedicineGroups />} />
              <Route path="/inventory/medicinelist/addmedicine" element={<AddMedicine />} />
              <Route path="/inventory/medicinedetails/:id" element={<MedicineDetails />} />
              <Route path="/reports" element={<SalesReport />} />
              <Route path="/compliance" element={<ComplianceRecords />} />
              <Route path="/requests" element={<RequestsPage />} />
              <Route path="/groups" element={<Groups />} />
              <Route path="/orders" element={<OngoingOrders />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/chat" element={<ChatInterface />} />
              <Route path="/chat/:id" element={<ChatInterface />} />
            </Route>
          
          </Route>
          {/* Distributer */}
          <Route element={<ProtectedRoute allowedRoles={["distributor"]} />}>
            <Route path="/" element={<LayoutD />}>
              <Route path="/notificationsD" element={<NotificationD />} />
              <Route path="/dashboardD" element={<DashboardD />} />
              <Route path="/configurationD" element={<ConfigurationD />} />
              <Route path="/reportsD" element={<ReportsD />} />
              <Route path="/complianceD" element={<ComplianceRecordsD />} />
              <Route path="/groupsD" element={<GroupsD />} />
              <Route path="/disreportD" element={<DispatchReportD />} />
              <Route path="/qsalesD" element={<QReportD />} />
              <Route path="/contactusD" element={<ContactUsD />} />
              <Route path="/profileD" element={<ProfileD />} />
              <Route path="/qualityrecD" element={<QualityRecD />} />
              <Route path="/registration2D" element={<Registration2D />} />
              <Route path="/inventoryoverviewD" element={<InventoryOverviewD/>} />
              <Route path="/financialsD" element={<FinancialsD />} />
              <Route path="/shipmentD" element={<ShipmentPerformanceD />} />
              <Route path="/supplierD" element={<SupplierManagementD />} />
              <Route path="/ordersD" element={<OrdersD />} />
              <Route path="/pendingordersD" element={<PendingOrdersD />} />
              <Route path="/dispatchedordersD" element={<DispatchedOrdersD />} />
              <Route path="/medicine/:id" component={MedicineDetails} />
              <Route path="/chatD" element={<ChatInterfaceD />} />   
              <Route path="/chatD/:id" element={<ChatInterfaceD />} />
            </Route>
          </Route>

          {/* Regulator */}
          <Route element={<ProtectedRoute allowedRoles={["regulator"]} />}>
            <Route path="/" element={<LayoutR />}>
              <Route path="/notificationsR" element={<NotificationR />} />
              <Route path="/dashboardR" element={<DashboardR />} />
              <Route path="/configurationR" element={<ConfigurationR />} />
              <Route path="/reportsR" element={<ReportsR />} />
              <Route path="/complianceR" element={<ComplianceRecordsR />} />
              <Route path="/groupsR" element={<GroupsR />} />
              <Route path="/salesR" element={<SalesReportR />} />
              <Route path="/qsalesR" element={<QReportR />} />
              <Route path="/contactusR" element={<ContactUsR />} />
              <Route path="/profileR" element={<ProfileR />} />
              <Route path="/qualityrecR" element={<QualityRecR />} />
              <Route path="/registration2R" element={<Registration2R />} />
              <Route path="/dashboard_distR" element={<DistributorDashboardR />} />
              <Route path="/chatR" element={<ChatInterfaceR />} />
              <Route path="/chatR/:id" element={<ChatInterfaceR />} />
            </Route>
          </Route>

          {/* Pharmacy */}
          <Route element={<ProtectedRoute allowedRoles={["pharmacy"]} />}>
            <Route path="/" element={<LayoutP />}>
              <Route path="/trackP" element={<OrderDetailsP />} />
              <Route path="/notificationsP" element={<NotificationP />} />
              <Route path="/disorderP" element={<DisOrdersP />} />
              <Route path="/dispatchP" element={<DispatchedOrdersP />} />
              <Route path="/dashboardP" element={<DashboardP />} />
              <Route path="/inventoryP" element={<InventoryP />} />
              <Route path="/configurationP" element={<ConfigurationP />} />
              <Route path="/inventoryP/medicinelist" element={<MedicineListP />} />
              <Route path="/inventoryP/medicinegroups" element={<MedicineGroupsP />} />
              <Route path="/inventoryP/groupsmedicinelist/:groupId" element={<GroupsMedicinesListP />} />
              <Route path="/inventoryP/medicinelist/addmedicine" element={<AddMedicineP />} />
              <Route path="/inventoryP/medicinelist/:id" element={<MedicineDetailsP />} />
              <Route path="/reportsP" element={<SalesReportP />} />
              <Route path="/complianceP" element={<ComplianceRecordsP />} />
              <Route path="/groupsP" element={<GroupsP />} />
              <Route path="/ordersP" element={<OngoingOrdersP />} />
              <Route path="/ordernowP" element={<NewOrdersP />} />
              <Route path="/ordernowP/orderpage" element={<OrderPageP />} />
              <Route path="/profileP" element={<ProfilePageP />} />
              <Route path="/contactusP" element={<ContactUsP />} />
              <Route path="/chatP" element={<ChatInterfaceP />} />
              <Route path="/chatP/:id" element={<ChatInterfaceP />} />
            </Route>
          </Route>

          {/* Admin */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/" element={<LayoutA />}>
              <Route path="/notificationsA" element={<NotificationA />} />
              <Route path="/dashboardA" element={<DashboardA />} />
              <Route path="/configurationA" element={<ConfigurationA />} />
              <Route path="/reportsA" element={<ReportsA />} />
              <Route path="/inventoryA" element={<ComplianceRecordsA />} />
              <Route path="/compliance/compliancelistA" element={<ComplianceListA />} />
              <Route path="/compliance/scheduledA" element={<ScheduledA />} />
              <Route path="/feedbackA" element={<FeedbackA />} />
              <Route path="/financeA" element={<FinanceA />} />
              <Route path="/auditA" element={<AuditA />} />
              <Route path="/userreportA" element={<UserReportA />} />
              <Route path="/sitereportA" element={<SiteReportA />} />
              <Route path="/docsA" element={<DocumentVerificationA />} />
              <Route path="/groupsA" element={<GroupsA />} />
              <Route path="/complianceA" element={<InventoryA />} />
              <Route path="/requestsA" element={<RequestsA />} />
              <Route path="/medicineA" element={<MedicineListA />} />
              <Route path="/qsalesA" element={<QReportA />} />
              <Route path="/contactusA" element={<ContactUsA />} />
              <Route path="/profileA" element={<ProfileA />} />
              <Route path="/qualityrecA" element={<QualityRecA />} />
              <Route path="/registration2A" element={<Registration2A />} />
              <Route path="/chatA/:id" element={<ChatInterfaceA />} />
            </Route>
          </Route>
          <Route path="/notauthorized" element={<Unauthorized />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
