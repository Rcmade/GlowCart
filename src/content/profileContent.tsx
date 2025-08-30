export const menuItems = [
  {
    icon: 'location-outline',
    title: 'Address',
    subtitle: 'Manage your saved address',
    onPress: () => {},
  },
  {
    icon: 'receipt-outline',
    title: 'Order History',
    subtitle: 'View your past orders',
    onPress: () => {},
  },
  { icon: 'globe-outline', title: 'Language', subtitle: '', onPress: () => {} },
  {
    icon: 'notifications-outline',
    title: 'Notifications',
    subtitle: '',
    onPress: () => {},
  },
];

export type MenuItemsType = (typeof menuItems)[number];

export const supportItems = [
  { icon: 'call-outline', title: 'Contact Us', onPress: () => {} },
  { icon: 'help-circle-outline', title: 'Get Help', onPress: () => {} },
  { icon: 'shield-outline', title: 'Privacy Policy', onPress: () => {} },
  {
    icon: 'document-text-outline',
    title: 'Terms and Conditions',
    onPress: () => {},
  },
];


export type SupportItemsType = (typeof supportItems)[number];
