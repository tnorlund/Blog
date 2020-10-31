export const COLOR_MODE_KEY = `color-mode`

export const INITIAL_COLOR_MODE_CSS_PROP = `--initial-color-mode`

export const COLORS = {
  gray: {
    default: `#464849`,
    dark: `#3d3d3d`,
    darker: `#1a1d23`,
    darkest: `#060606`,
    light: `#bcbcbc`,
    lighter: `#e5e5e5`,
    lightest: `#f7f7f7`,
  },
  brown: {
    default: `#ffc88a`,
    dark: `#E6B47C`,
    darker: `#BF9667`,
    darkest: `#806445`,
    light: `#FFDAB0`,
    lighter: `#FFECD6`,
  },
  orange: {
    default: `#f7df1e`,
    dark: `#ff9100`,
    darker: `#ff7600`,
    darkest: `#b75500`,
  },
  blue: {
    default: `#6CCCF5`,
    dark: `#60B6DB`,
    darker: `#5097B5`,
    darkest: `#346275`,
    light: `#91D8F6`,
    lighter: `#B6E3F7`,
  },
  red: {
    light: `#F46275`,
    dark: `#B54857`,
  },
}

const { gray, brown, blue, red } = COLORS

export const MODE_COLORS = {
  text: {
    light: `black`,
    dark: gray.lighter,
  },
  background: {
    light: `white`,
    dark: gray.darker,
  },
  shadow: {
    light: gray.lighter,
    dark: `black,`
  },
  link: {
    light: blue.light,
    dark: blue.lighter,
  },
  lightLink: {
    light: blue.lighter,
    dark: blue.lighter
  },
  accentBackground: {
    light: `rgba(0, 0, 0, 0.05)`,
    dark: `rgba(0, 0, 0, 0.7)`,
  },
  red: {
    light: red.light,
    dark: red.dark,
  },
  gray: {
    light: gray.regular,
    dark: gray.light,
  },
  lightGray: {
    light: gray.lightest,
    dark: gray.darker,
  },
  darkGray: {
    light: gray.default,
    dark: gray.darkest,
  },
  a: {
    light: brown.default,
    dark: brown.darker,
  },
  b: {
    light: blue.dark,
    dark: blue.darkest,
  },
  c: {
    light: blue.light,
    dark: blue.lighter,
  },
  d: {
    light: brown.darker,
    dark: brown.darkest,
  },

  filter: {
    light: `invert(90%) sepia(72%) saturate(7448%) hue-rotate(301deg)`
      + ` brightness(103%) contrast(116%)`,
    dark: `invert(64%) sepia(10%) saturate(1467%) hue-rotate(352deg)`
      + ` brightness(94%) contrast(92%)`,
  },
  textfilter: {
    light: `invert(0%) sepia(42%) saturate(839%) hue-rotate(2deg)`
      + ` brightness(89%) contrast(98%)`,
    dark: `invert(100%) sepia(3%) saturate(800%) hue-rotate(207deg)`
      + ` brightness(118%) contrast(80%)`,
  },
}

export const typography = {
  fonts: `"Helvetica Neue", "Helvetica", Arial, sans-serif`,
  // These font sizes and line heights are in em units.
  minFontSize: 0.9,
  maxFontSize: 1.1,
  minLineHeight: 1.5,
  maxLineHeight: 1.8,
}
