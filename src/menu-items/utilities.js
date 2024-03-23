import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  LoadingOutlined,
  UnorderedListOutlined
} from '@ant-design/icons';

const icons = {
  FontSizeOutlined,
  BgColorsOutlined,
  BarcodeOutlined,
  AntDesignOutlined,
  LoadingOutlined,
  AppstoreAddOutlined,
  UnorderedListOutlined
};

const utilities = {
  id: 'utilities',
  title: 'Basico',
  type: 'group',
  children: [
    {
      id: 'list-clients',
      title: 'Clientes',
      type: 'item',
      url: '/list-clients',
      icon: icons.UnorderedListOutlined
    },
    {
      id: 'ant-design',
      title: 'Ant Design',
      type: 'item',
      url: '/icons/ant',
      icon: icons.AntDesignOutlined,
      breadcrumbs: false
    }
  ]
};

export default utilities;
