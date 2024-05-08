module.exports = {
    extends: [
        // Umi 项目
        require.resolve('umi/stylelint'),
    ],
    rules: {
        'selector-pseudo-class-no-unknown': [true, {
            ignorePseudoClasses: ["global"],
        }],
        'max-line-length': 200,
    },
}
