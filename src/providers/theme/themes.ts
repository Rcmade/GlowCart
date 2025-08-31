export const colors = {
  // Primary brand colors
  primary: '#B84953',
  primaryLight: '#CC3D3D',
  primaryDark: '#8F292B',

  // Accent / frequently used extra
  accent: '#C4767C',
  accentMuted: '#AD7373',

  // Neutral grayscale (dark to light)
  black: '#000000',
  darkGray: '#333333',
  mediumDarkGray: '#4B4B4B',
  mediumGray: '#666666',
  mediumGray2: '#767676',
  secondaryGray: '#6C6C6C',
  lightGray: '#8E8E8F',
  mutedGray: '#8F8F8F',
  extraLightGray: '#9A8F8E',
  veryLightGray: '#E0E0E0',
  surfaceLight: '#F4F4F4',

  // Background colors
  backgroundLight: '#FFFFFF',
  backgroundOffWhite: '#F8F8F8',
  backgroundWarm: '#FFEDE8',
  backgroundWarmLight: '#FFF7F7',
  backgroundWarm2: '#F4D4C7',
  backgroundSoft: '#FDF2EF',

  // Neutral / muted background stops (gradients)
  gradientWarm1: '#CDB7AF',
  gradientWarm2: '#C9A7A2',
  neutralLight1: '#D5C0BA',
  neutralLight2: '#F3E2DD',

  // Text colors
  textPrimary: '#070707',
  textSecondary: '#333333',
  textDisabled: '#8E8E8F',
  mutedText: '#636363',

  // Alerts / destructive
  error: '#E74C3C',

  // Special colors
  white: '#FFFFFF',

  // Overlays / alpha hex variants (kept as hex with alpha exactly as used)
  overlayBlack45: '#00000073',
  overlayDark38: '#33333360',
  overlayDark19: '#33333331',

  // Miscellaneous / extras
  tintColorPrimary: '#B84953',

  // Additional small palette items used across app
  bagIconBg: '#C9A7A2',
};

export const lightTheme = {
  colors: colors,
};

export const darkTheme: typeof lightTheme = {
  colors: colors,
};
