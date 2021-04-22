/**
 * @type {string} The key used to change the user details using session
 * storage. */
export const USER_KEY: string = `user`

/**
 * @type {string} The key used to change the authentication modal view using
 * session storage. */
export const AUTH_KEY: string = `auth`

/**
 * @type {string} The key used to change the visitor's privacy settings using
 *                session storage.
 */
export const PRIVACY_KEY: string = `privacy`

/**
 * @type {string} The key used to access the visitor's unique identification
 *                from session storage.
 */
export const VISITOR_KEY: string = `visitor`

/**
 * @type {string} The key used to change the version of the most recent Terms
 * of Service using session storage. */
export const TOS_KEY: string = `tos`

/** @type {string} The key used to change the color mode using local storage. */
export const COLOR_MODE_KEY: string = `color-mode`

export const INITIAL_COLOR_MODE_CSS_PROP: string = `--initial-color-mode`

export const COLORS = {
  black: {
    default: `#201e1f`
  },
  white: {
    default: `#e5e5e5`
  },
  brown: {
    default: `#f8eee0`
  },
  gray: {
    light: `#333031`,
    default: `#21262d`
  },
  pink: {
    default: `#eeaeb3`
  },
  blue: {
    default: `#4692b7`,
  },
  yellow: {
    default: `#f2cd50`,
  },
  red: {
    default: `#d94234`,
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

const { gray, brown, blue, red, black, white, pink, yellow } = COLORS

export const MODE_COLORS = {
  text: {
    light: black.default,
    dark: white.default,
  },
  buttontext: {
    light: brown.default,
    dark: white.default
  },
  background: {
    light: brown.default,
    dark: gray.default,
  },
  shadow: {
    light: gray.default,
    dark: `black,`
  },
  link: {
    light: blue.default,
    dark: blue.default,
  },
  lightLink: {
    light: blue.default,
    dark: blue.default
  },
  accentBackground: {
    light: `rgba(0, 0, 0, 0.05)`,
    dark: `rgba(0, 0, 0, 0.5)`,
  },
  yellow: {
    light: yellow.default,
    dark: yellow.default
  },
  blue: {
    light: blue.default,
    dark: blue.default
  },
  red: {
    light: red.default,
    dark: red.default,
  },
  green: {
    light: yellow.default,
    dark: yellow.default,
  },
  gray: {
    light: gray.default,
    dark: gray.default,
  },
  // lightGray: {
  //   light: gray.lightest,
  //   dark: gray.darker,
  // },
  darkGray: {
    light: gray.default,
    dark: gray.default,
  },
  a: {
    light: yellow.default,
    dark: yellow.default,
  },
  b: {
    light: gray.light,
    dark: black.default,
  },
  c: {
    light: red.default,
    dark: red.default,
  },
  d: {
    light: pink.default,
    dark: pink.default,
  },
  orange: {
    light: red.default,
    dark: red.default,
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
    light: black.default,
    dark: white.default
  },
  sparkText: {
    light: COLORS.spark.text,
    dark: gray.default,
  },
  pandasText: {
    light: COLORS.pandas.purple,
    dark: gray.default
  },
  postgresqlText: {
    light: COLORS.postgresql.text,
    dark: gray.default,
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


