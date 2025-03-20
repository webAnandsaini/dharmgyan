/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "15px",
        },
      },
      fontFamily: {
        'Rowdies': ["Rowdies", "sans-serif"],
        'roboto' : ["Roboto Condensed", "sans-serif"],
        'signika' : ["Signika", "sans-serif"]
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',

        primary :    '#3F382F',
        secondary :  '#F02500',

        red : {
          light : '#FE2B00',
          extraDark: '#470601',
        },

        grey: {
          DEFAULT: '#6F6962',
          100: '#707070',
          200: '#EAEAEA',
        },

        brown: {
          DEFAULT: '#821F37',
        }

      },
      fontSize: {
        'h1': ['70px', {
          lineHeight: '1.25',
          fontWeight: '400',
        }],
        'h2': ['36px', {
          lineHeight: '1.25',
          fontWeight: '400',
        }],
        'h3': ['35px', {
          lineHeight: '60px',
          fontWeight: '700',
        }],
        'h4': ['30px', {
          lineHeight: '37px',
          fontWeight: '400',
        }],
        'h5': ['22px', {
          lineHeight: '27px',
          fontWeight: '700',
        }],
        'h6': ['20px', {
          lineHeight: '25px',
          fontWeight: '700',
        }],
        'size-15': ['15px', {
          lineHeight: '17px',
        }],
        'size-25': ['25px', {
          lineHeight: '50px',
        }],
        'size-40': ['40px', {
          lineHeight: '53px',
        }],
        'size-50': ['50px', {
          lineHeight: '65px',
        }],
        'size-30': ['30px', {
          lineHeight: '35px',
          fontWeight: '600',
        }],
        'size-80': ['80px', {
          lineHeight: '66px',
        }],
        'size-160': ['160px', {
          lineHeight: '132px',
        }],
      },
      maxWidth: {
        'site-inner': '1485px',
        'site-outer': '1533px',
        'site-inner-md': '1366px',
      },
      borderRadius: {
        '23': '23px',
      },
      spacing: {
        '4.5': '18px',
        '5.5': '22px',
        '6.5': '26px',
        '13': '50px',
        '7.5': '30px',
        '15': '60px',
        '17': '71px',
        '25': '100px',
      },
      screens: {
        'xs': '480px',
      }
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          '@screen sm': {
            maxWidth: '640px',
          },
          '@screen md': {
            maxWidth: '768px',
          },
          '@screen lg': {
            maxWidth: '1280px',
          },
          '@screen xl': {
            maxWidth: '1440px',
          },
        }
      })
    }
  ]
};
