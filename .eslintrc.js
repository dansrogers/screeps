module.exports = {
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
    },
    "rules": {
        // enable additional rules
        "indent": ["error", 4],
        "linebreak-style": ["error", "unix"],
        "semi": ["error", "always"],
        "no-console": "off",
        "comma-dangle": ["error", "always-multiline"],
        "strict": ["error", "never"],
        "no-trailing-spaces": [
            "error",
            {
                "ignoreComments": true,
            },
        ],
    },
    "plugins": [
        "screeps",
    ],
    "env": {
        "screeps/screeps": true,
        "node": true,
        "es6": true,
    },
};
