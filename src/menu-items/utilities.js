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
  title: 'Utilities',
  type: 'group',
  children: [
    {
      id: 'list-tables',
      title: 'List',
      type: 'item',
      url: '/list-tables',
      icon: icons.UnorderedListOutlined
    },
    {
      id: 'ant-icons',
      title: 'Ant Icons',
      type: 'item',
      url: '/icons/ant',
      icon: icons.AntDesignOutlined,
      breadcrumbs: false
    }
  ]
};

export default utilities;
