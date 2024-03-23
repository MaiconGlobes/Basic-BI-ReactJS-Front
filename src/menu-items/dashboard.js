import { DashboardOutlined } from '@ant-design/icons';

const icons = {
	DashboardOutlined
};

const dashboard = {
	id: 'group-dashboard',
	title: 'Inicio',
	type: 'group',
	children: [
		{
			id: 'dashboard',
			title: 'Dashboard',
			type: 'item',
			url: '/dashboard/default',
			icon: icons.DashboardOutlined,
			breadcrumbs: false
		}
	]
};

export default dashboard;
