interface MenuItem {
  label: string;
  href: string;
}

export const MENU_ITEMS_LINKS: MenuItem[] = [
  {
    label: 'Accueil',
    href: '/',
  },
  {
    label: 'Quizz',
    href: '/categories',
  },
  {
    label: 'Bons de réduction',
    href: '/coupons',
  },
];
