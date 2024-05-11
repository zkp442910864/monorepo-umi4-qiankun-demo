

module.exports = {
    // Umi 项目
    extends: [
        require.resolve('umi/eslint'),
    ],
    globals: {
        TObj: true,
        JSX: true,
        TExpandData: true,
        TGetOneData: true,
        TGetApiResponse: true,
        TGetApiResponseDetail: true,
        TPermissionCode: true,
        TGetApiResponseV2: true,
        TGetComponentRef: true,
    },
    rules: {
        indent: ['off'],
        '@typescript-eslint/no-unused-vars': [1],
        'import/no-unresolved': ['off'],
        // 'import/no-unresolved': [2, {
        //     ignore: ['^umi/'],
        //     caseSensitive: true,
        //     caseSensitiveStrict: true,
        // }],

        'no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-expressions': ['error', {
            allowShortCircuit: true,
            allowTernary: true,
            allowTaggedTemplates: true,
        }],

        'no-extra-parens': 'off',
        // '@typescript-eslint/no-extra-parens': 'off',
        '@typescript-eslint/no-extra-parens': ['warn', 'all', {
            ignoreJSX: 'all',
        }],

        'space-before-function-paren': 'off',
        '@typescript-eslint/space-before-function-paren': 'error',
        '@typescript-eslint/no-use-before-define': ['error', {
            functions: false,
            variables: false,
            enums: false,
        }],
        /** 命名约定 */
        '@typescript-eslint/naming-convention': [
            'warn',
            {
                // interface IAa {}
                selector: 'interface',
                prefix: ['I'],
                format: ['PascalCase'],
            },
            {
                // type Tt = string;
                selector: 'typeAlias',
                prefix: ['T'],
                format: ['PascalCase'],
            },
            {
                // enum Ee = {};
                selector: 'enum',
                prefix: ['E'],
                format: ['PascalCase'],
            },
        ],

    },
};
