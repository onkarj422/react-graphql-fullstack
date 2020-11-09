module.exports = {
    parser: "@typescript-eslint/parser",
    extends: [
        "airbnb",
        "airbnb/hooks",
        "plugin:@typescript-eslint/recommended",
        "plugin:jest/recommended",
        "plugin:jest/style",
        "plugin:jest-dom/recommended",
        "plugin:testing-library/react",
        "prettier",
        "prettier/@typescript-eslint",
        "prettier/react",
    ],
    plugins: ["@typescript-eslint", "jest", "jest-dom", "testing-library"],
    settings: {
        "import/resolver": {
            typescript: {},
        },
    },
    env: {
        browser: true,
        node: true,
        es6: true,
        jest: true,
    },
    rules: {
        "no-use-before-define": "off",
        "global-require": "off",
        "no-console": "off",
        "no-underscore-dangle": "off",
        "no-param-reassign": "off",
        "react/jsx-props-no-spreading": "off",
        "react/jsx-filename-extension": [
            "error",
            {
                extensions: [".js", ".jsx", ".ts", ".tsx"],
            },
        ],
        "import/extensions": "off",
        "import/no-extraneous-dependencies": [
            "error",
            {
                devDependencies: true,
            },
        ],
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-var-requires": "off",
        indent: ["error", 4],
    },
    globals: {
        __CLIENT__: true,
        __SERVER__: true,
        __DEV__: true,
    },
};
