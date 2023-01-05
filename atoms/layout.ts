import { atom } from 'recoil';

export const mobileCheck = atom({
  key: 'mobileCheck',
  default: false,
});

export const mobileMenuOpen = atom({
  key: 'mobileMenuOpen',
  default: false,
});

export const confirmOpen = atom({
  key: 'confirmOpen',
  default: false,
});
