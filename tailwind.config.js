/*
 * Copyright 2020 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    boxShadow: {
      DEFAULT: '0 0 24px rgba(0, 0, 0, 0.15)',
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      none: 'none',
    },
    extend: {
      spacing: {
        '1px': '1px',
        13: '3.25rem',
        19: '4.75rem',
        19.5: '4.875rem',
        21: '5.25rem',
        22: '5.5rem',
        23: '5.75rem',
        25: '6.25rem',
        26: '6.5rem',
        27: '6.75rem',
        29: '7.25rem',
        30: '7.5rem',
        31: '7.75rem',
        34: '8.5rem',
        42: '9.5rem',
        43: '9.75rem',
        68: '17rem',
        70: '17.5rem',
        88: '22rem',
        97: '25rem',
        98: '26rem',
        100: '28rem',
        108: '30rem',
        147: '36.75rem',
      },
      height: {
        fit: 'fit-content',
      },
    },
    minWidth: {
      '8px': '8px',
      '12px': '12px',
      '16px': '16px',
      '20px': '20px',
      '32px': '32px',
      '56px': '56px',
      '104px': '104px',
      '2/3': '66%',
      '48px': '48px',
      '154px': '154px',
      '200px': '200px',
      '850px': '850px',
    },
    minHeight: {
      '16px': '16px',
      '40px': '40px',
      '60px': '60px',
      '64px': '64px',
      '80px': '80px',
    },
    maxHeight: {
      '20px': '20px',
    },
    maxWidth: {
      '1/2': '50%',
      '80px': '80px',
      '200px': '200px',
      '280px': '280px',
    },
    colors: {
      transparent: 'transparent',
      blue: {
        default: '#007fff',
        shade: '#006cd8',
        'medium-tint': '#3399ff',
        'light-tint': '#e5f2ff',
        'ultralight-tint': '#e5f2ff',
      },
      monochrome: {
        black: '#1b191b',
        white: '#ffffff',
        default: '#687481',
        shade: '#58626d',
        'dark-tint': '#a4acb3',
        'medium-tint': '#e3e6e8',
        'light-tint': '#f8f9fb',
      },
      green: {
        default: '#00b602',
        shade: '#009402',
        'medium-tint': '#33c535',
        'light-tint': '#e5f7e5',
      },
      red: {
        default: '#ee0000',
        shade: '#cc0000',
        'medium-tint': '#f13333',
        'light-tint': '#fccccc',
        'ultralight-tint': '#fde5e5',
      },
      yellow: {
        default: '#ffdd00',
        shade: '#ebcb00',
        'medium-tint': '#ffe74c',
        'light-tint': '#fffbe5',
      },
      orange: {
        default: '#f5a623',
        shade: '#dc931b',
        'medium-tint': '#f7b84f',
        'light-tint': '#fef6e9',
      },
      'data-visualization': {
        'scrollbar-thumb': '#ccd0db',
        coverage: '#62adfc',
        overlapping: '#4f8ac9',
        'scope-cover': '#aed4fd',
        'saved-time': '#67d5b5',
        auto: '#d599ff',
        manual: '#88e2f3',
      },
    },
    fontFamily: {
      bold: ['OpenSans-Semibold', 'sans-serif'],
      regular: ['OpenSans', 'sans-serif'],
      light: ['OpenSans-Light', 'sans-serif'],
    },
    fontSize: {
      10: '10px',
      12: '12px',
      14: '14px',
      16: '16px',
      18: '18px',
      20: '20px',
      22: '22px',
      24: '24px',
      26: '26px',
      28: '28px',
      30: '30px',
      32: '32px',
      36: '36px',
      40: '40px',
      48: '48px',
      64: '64px',
    },
    lineHeight: {
      10: '10px',
      12: '12px',
      14: '14px',
      16: '16px',
      18: '18px',
      20: '20px',
      22: '22px',
      24: '24px',
      26: '26px',
      28: '28px',
      30: '30px',
      32: '32px',
      34: '34px',
      36: '36px',
      38: '38px',
      40: '40px',
      48: '48px',
      64: '64px',
      86: '86px',
    },
    borderColor: theme => ({
      ...theme('colors'),
      'current-color': 'currentColor',
    }),
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(({ addUtilities }) => {
      const newUtilities = {
        '.link': {
          backgroundColor: 'transparent',
          color: '#007fff',
          cursor: 'pointer',
        },
        '.link:hover': {
          color: '#3399ff',
        },
        '.link:active': {
          color: '#006cd8',
        },
        '.text-ellipsis': {
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
      };

      addUtilities(newUtilities);
    }),
  ],
  corePlugins: {
    fontWeight: false,
  },
};
