/**
 * @type {String} The key used to change the user details using session
 * storage. */
export const USER_KEY = `user`

/**
 * @type {String} The key used to change the authentication modal view using
 * session storage. */
export const AUTH_KEY = `auth`

/**
 * @type {String} The key used to change the visitor's privacy settings using
 *                session storage.
 */
export const PRIVACY_KEY = `privacy`

/**
 * @type {String} The key used to access the visitor's unique identification
 *                from session storage.
 */
export const VISITOR_KEY = `visitor`

/**
 * @type {String} The key used to change the version of the most recent Terms
 * of Service using session storage. */
export const TOS_KEY = `tos`

/** @type {String} The key used to change the color mode using local storage. */
export const COLOR_MODE_KEY = `color-mode`

export const INITIAL_COLOR_MODE_CSS_PROP = `--initial-color-mode`

export const COLORS = {
  gray: {
    light: `#bcbcbc`,
    lighter: `#e5e5e5`,
    lightest: `#f7f7f7`,
    default: `#484F58`,
    dark: `#3d3d3d`,
    darker: `#1a1d23`,
    darkest: `#060606`,

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
    light: `#FFEDB3`,
    default: `#F5DE93`,
    dark: `#F5D162`,
    darker: `#ff7600`,
    darkest: `#b75500`,
  },
  blue: {
    light: `#9FD8F5`,
    default: `#7697A8`,
    dark: `#566FF5`,
    darker: `#293475`,
    darkest: `#131836`,
  },
  purple: {
    light: `#B387F5`,
    default: `#7654A8`
  },
  red: {
    light: `#FF8C97`,
    default: `#B3505A`,
    dark: `#F54960`,
  },
  green: {
    light: `#49F56D`,
    dark: `#31F55A`,
  },
  spark: {
    text: `#3c3a3e`,
    star: `#e25b26`
  },
  pandas: {
    purple: `#1e1853`,
    pink: `#e50888`,
    yellow: `#ffcb05`,
  },
  postgresql: {
    blue: `#3780b0`,
    text: `#231f20`,
  },
}

const { gray, brown, blue, purple, red, orange, green } = COLORS

export const MODE_COLORS = {
  text: {
    light: `black`,
    dark: gray.lighter,
  },
  buttontext: {
    light: `white`,
    dark: gray.default
  },
  background: {
    light: `white`,
    dark: gray.default,
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
    light: blue.light,
    dark: blue.dark
  },
  accentBackground: {
    light: `rgba(0, 0, 0, 0.05)`,
    dark: `rgba(0, 0, 0, 0.5)`,
  },
  blue: {
    light: blue.light,
    dark: blue.dark
  },
  red: {
    light: red.light,
    dark: red.dark,
  },
  green: {
    light: green.light,
    dark: green.dark,
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
    light: orange.light,
    dark: orange.default,
  },
  b: {
    light: blue.light,
    dark: blue.default,
  },
  c: {
    light: red.default,
    dark: red.light,
  },
  d: {
    light: brown.darker,
    dark: brown.darkest,
  },
  orange: {
    light: orange.dark,
    dark: orange.darker,
  },
  filter: {
    // eslint-disable-next-line max-len
    light: `invert(86%) sepia(39%) saturate(519%) hue-rotate(346deg) brightness(98%) contrast(96%);`,
    // eslint-disable-next-line max-len
    dark: `filter: invert(87%) sepia(87%) saturate(999%) hue-rotate(314deg) brightness(109%) contrast(92%);`,
  },
  textfilter: {
    light: `invert(0%) sepia(42%) saturate(839%) hue-rotate(2deg)`
      + ` brightness(89%) contrast(98%)`,
    dark: `invert(100%) sepia(3%) saturate(800%) hue-rotate(207deg)`
      + ` brightness(118%) contrast(80%)`,
  },
  socialColor: {
    light: blue.light,
    dark: `white`
  },
  sparkText: {
    light: COLORS.spark.text,
    dark: gray.lighter,
  },
  pandasText: {
    light: COLORS.pandas.purple,
    dark: gray.lighter
  },
  postgresqlText: {
    light: COLORS.postgresql.text,
    dark: gray.lighter,
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


