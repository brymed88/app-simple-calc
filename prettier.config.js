module.exports = {
   printWidth: 100,
   tabWidth: 3,
   singleQuote: true,
   bracketSameLine: true,
   trailingComma: 'es5',
   semi: false,
   plugins: [require.resolve('prettier-plugin-tailwindcss')],
   tailwindAttributes: ['className'],
}
