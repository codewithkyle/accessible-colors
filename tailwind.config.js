const { colors } = require('tailwindcss/defaultTheme');
module.exports = {
    theme: {
        extend: {
            colors: {
                neutral: {
                    '100': '#f5f5f5',
                    '200': '#eeeeee',
                    '300': '#e0e0e0',
                    '400': '#bdbdbd',
                    '500': '#9e9e9e',
                    '600': '#757575',
                    '700': '#616161',
                    '800': '#424242',
                    '900': '#212121',
                },
                primary: colors.blue,
                success: colors.green,
                warning: colors.yellow,
                danger: colors.red,
                grey: colors.gray,
            },
        },
    },
};
