# eslint-config-qcobjects

ESLint Config for QCObjects

## Install

```shell
  npm i -D eslint-config-qcobjects
```

**NOTE:** Make sure you have installed QCObjects and ESLint before you use this

To install them

```shell
  npm i --save-dev qcobjects eslint
```

## Settings

Create a .eslintrc.json file with this content

```json
  {
    "extends": [
      "qcobjects"
    ]
  }
```

## Extended settings to work with modules

Create a .eslintrc.json file with this content

```json
{
    "extends": [
      "qcobjects"
    ],
    "ecmaFeatures": {
        "modules": true,
        "spread" : true,
        "restParams" : true
    },
    "parserOptions": {
        "sourceType": "module"
    }
  }
```

## Include eslint in your test script in package.json

```shell
  npx eslint . --fix
```

```json
{
  "scripts":{
    "test": "npx eslint . --fix"
  }
}
```
