// menuItems.js
import DashboardLogo from '../../assets/svgs/Dashboard.svg';
import Orders from '../../assets/svgs/Orders.svg';
import ReportsLogo from '../../assets/svgs/Reports.svg';
import GroupsLogo from '../../assets/svgs/Groups.svg';
import ConfigurationsLogo from '../../assets/svgs/Configurations.svg';
import NotificationsLogo from '../../assets/svgs/Notifications.svg';
import HelpLogo from '../../assets/svgs/Help.svg';

export const menuItems = [
  { label: 'Dashboards', icon: DashboardLogo, path: '/dashboardD' },
  { label: 'Orders', icon: Orders, path: '/ordersD' },
  { label: 'Reports', icon: ReportsLogo, path: '/reportsD' },
  { label: 'Groups', icon: GroupsLogo, path: '/groupsD' },
  { label: 'Configuration', icon: ConfigurationsLogo, path: '/configurationD' },
  { label: 'Notifications', icon: NotificationsLogo, path: '/notificationsD' },
  { label: 'Help & Support', icon: HelpLogo, path: '/contactusD' },
];
