module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "react/jsx-uses-vars": 2,
        "react/jsx-uses-react": 2,
        "react/jsx-no-duplicate-props": 2,
        "react/jsx-no-undef": 2,
        "react/no-multi-comp": 2,
        "react/jsx-indent-props": [
            "error",
            4
        ],
        "react/jsx-pascal-case": 2,
        "react/prop-types": 2,
        "react/jsx-indent": [
            "error",
            4
        ],
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-undef": [
            "warn"
        ]
    }
};