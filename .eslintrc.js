module.exports = {
  // ESLint 사용을 위해 지원하려는 Javascript 언어 옵션
  parserOptions: {
    ecmaVersion: 2021, //  사용할 ECMAScript 버전
    sourceType: 'module', // parser 의  export  형태를 설정
    ecmaFeatures: {
      // ECMScript 규격의 JSX 사용 여부
      jsx: true,
    },
  },
  // 사전 정의된 전역 변수 사용을 정의
  // browser, node 설정을 하지 않으면  console, require
  // 같은 사전에 정의된 전역변수 환경에 있는  static  메서드를 인식할 수 없어 에러가 발생한다.
  env: {
    browser: true,
    node: true,
    'jest/globals': true,
  },
  plugins: ['react-hooks', 'jest', 'simple-import-sort'],
  extends: ['airbnb', 'plugin:react/recommended'],
  rules: {
    'no-unused-vars': 'error',
    'no-nested-ternary': 'off', //  중첩된 삼항식을 허용
    'no-unused-prop-types': 'off',
    'react/require-default-props': 'off',
    'no-console': 'warn',
    'react/jsx-one-expression-per-line': 'off',
    // 컨테이너 대소문자 때문에 주석처리
    // 'react-hooks/rules-of-hooks': 'error',
    // 'react-hooks/exhaustive-deps': 'warn',
    'import/prefer-default-export': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
      },
    ],
    'prefer-destructuring': ['error', { object: true, array: false }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'react/react-in-jsx-scope': 'off',
  },
  overrides: [
    {
      files: '**/*.+(ts|tsx)',
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
      plugins: ['@typescript-eslint'],
      extends: ['airbnb-typescript'],
      settings: {
        'import/resolver': {
          typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
        },
      },
      rules: {
        'import/no-cycle': 'off',
        'jsx-quotes': 'off',
        'object-curly-newline': 'off',
        '@typescript-eslint/comma-dangle': 'off',
        'import/prefer-default-export': 'off',
        'max-len': 'off',
        'linebreak-style': 'off',
        'arrow-body-style': 'off',
        'react/display-name': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/jsx-one-expression-per-line': 'off',
        'implicit-arrow-linebreak': 'off',
        'no-confusing-arrow': 'off',
        'react/jsx-curly-newline': 'off',
        'function-paren-newline': 'off',
        '@typescript-eslint/no-shadow': 'off',
        'no-param-reassign': ['error', { props: false }],
        'react/jsx-wrap-multilines': [
          'error',
          { arrow: true, return: true, declaration: true },
        ],
        'eol-last': 'warn',
        'react/no-array-index-key': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/indent': 'off',
        'react/require-default-props': 'off',
        'react/jsx-closing-tag-location': 'off',
        'react/react-in-jsx-scope': 'off',
        'operator-linebreak': 'off',
        'quote-props': 'off',
        'react/destructuring-assignment': 'off',
        'no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-expressions': 'error',
        'no-plusplus': 'off',
      },
    },
  ],
};
