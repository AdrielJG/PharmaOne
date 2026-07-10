// menuItems.js
import DashboardLogo from '../../assets/svgs/Dashboard.svg';
import Compliance from '../../assets/svgs/Compliance.svg';
import ReportsLogo from '../../assets/svgs/Reports.svg';
import GroupsLogo from '../../assets/svgs/Groups.svg';
import ConfigurationsLogo from '../../assets/svgs/Configurations.svg';
import Quality from '../../assets/svgs/Quality.svg';
import ContactLogo from '../../assets/svgs/Contact Management.svg';
import NotificationsLogo from '../../assets/svgs/Notifications.svg';
import HelpLogo from '../../assets/svgs/Help.svg';

export const menuItems = [
  { label: 'Dashboards', icon: DashboardLogo, path: '/dashboardA' },
  { label: 'User Management', icon: Quality, path: '/inventoryA' },
  { label: 'Compliance Checks', icon: Compliance, path: '/complianceA' },
  { label: 'Complaints/Feedback', icon: Quality, path: '/feedbackA' },
  { label: 'Documents to be Verified', icon: ContactLogo, path: '/docsA' },
  { label: 'Audit Logs', icon: ContactLogo, path: '/auditA' },
  { label: 'Finance Management', icon: HelpLogo, path: '/financeA' },
  { label: 'Reports', icon: ReportsLogo, path: '/reportsA' },
  { label: 'Groups', icon: GroupsLogo, path: '/groupsA' },
  { label: 'Configuration', icon: ConfigurationsLogo, path: '/configurationA' },
  { label: 'Notifications', icon: NotificationsLogo, path: '/notificationsA' },
  { label: 'Help & Support', icon: HelpLogo, path: '/contactusA' },
];
