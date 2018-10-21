module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "globals": {
        "__dirname": false,
        "process": false
    },
    "rules": {
        "no-console": process.env.NODE_ENV === 'production' ? 2 : 0,
        "indent": "off",
        "quotes": [
            "warn",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-unused-vars": [
            "warn", { "args": "none" }
        ],
        "no-undef": "off",
    }
};