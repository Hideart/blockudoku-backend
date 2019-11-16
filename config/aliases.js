const path = require('path');

const alias = {
    'react-native': 'react-native-web',
    '@': path.resolve('./src'),
    '@admin': path.resolve('./src/app/super-admin'),
    '@ch': path.resolve('./src/app/channel-partner'),
    '@dispatcher': path.resolve('./src/app/dispatcher'),
};

module.exports = {
    alias,
};
