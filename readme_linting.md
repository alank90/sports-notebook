# Setting Up Project for Linting with Vite

_*Note*_: See this [article](https://blog.logrocket.com/using-prettier-eslint-javascript-formatting/) for writeup on **eslint** and **prettier** and integrating them.

_Vite_ is a web development build tool that allows for lightning fast serving of code due to its native ES Module import approach.

Vue projects can quickly be set up with Vite by running the following commands in your terminal.
With npm 7+, extra double-dash is needed:

```
$ npm init vite@latest <project-name> -- --template vue

$ cd <project-name>
$ npm install
$ npm run dev
```

Before you set up ESLint for your project, you will first need to install ESLint and _eslint-plugin-vue_. This plugin allows us to check the template and script of .vue files with ESLint, as well as Vue code in .js files. If you want to use SFCs then you'll also need to install _@vue/compiler-sfc_ (_compiler-sfc_ is now included in main vue package so no longer need seperate install):

`npm init @eslint/config@latest`

`npm install eslint-plugin-vue --save-dev`

**_ This step no longer necessary with previous npm init command _**

Now that ESLint is installed along with associated packages, you can initialize an ESLint configuration for your project using the following command:
`./node_modules/.bin/eslint --init`

An important piece in this command is the --init flag. The ./node_modules/.bin/eslint section of the command is the path to ESLint in your project. Using the --init flag activates ESLint for your project. Activating or initializing ESLint will create an ESLint configuration file that will allow you to customize how ESLint works with your project.

Follow the prompts to setup your .eslint.config.js file. More Info can be found at https://eslint.org/docs/latest/use/getting-started

To integrate ESLint into Visual Studio Code, you will need to install the ESLint extension for Visual Studio Code. Navigate back to Visual Studio Code and search for ESLint in the Extensions tab. Click Install once you have located the extension:

**_Integrating Prettier for Code Formatting_**
Issue following command:

`npm install -D prettier eslint-plugin-prettier eslint-config-prettier`

then add entries to _*eslint.config.js*_:

`import eslintPluginPrettier from "eslint-config-prettier";`

`export default [eslintPluginPrettier,]`

Lastly, in VSCode's _*settings.json*_ file find the **Editor - Default Formatter** key and choose _Prettier - Code formatter_ from drop down list.

## Getting error _"eslint error The template root requires exactly one element."_

In Vue 3 you can have more then one root element. The **eslint-plugin-vue** doesn't recognize this so add this line to rules section of eslintrc:

`"rules": { "vue/no-multiple-template-root": "off" }`

## Error _"Module is not defined"_ with eslint

The module global is specific to Node.js, ESLint needs to be configured to recognize it.
To enable node support, add it to the _env_ field in the **eslintrc** file.

```
env: {
    node: true,
  }
```

## Integrating Prettier w/ESLint into your project

To install prettier in your project and pin its version as recommended, run:

`npm install prettier -D --save-exact`

Using Prettier Configuration files to set formatting options is the recommended approach. Options are searched recursively down from the file being formatted so if you want to apply prettier settings to your entire project simply set a configuration in the root.
To run _prettier_ from the command line prefix the command with _npx_ (e.g. _npx prettier --help_)

### Basic Cinfiguration of Prettier

```JS:
// prettier.config.js or .prettierrc.js
module.exports = {
  trailingComma: "es5",
  tabWidth: 4,
  semi: false,
  singleQuote: true,
};
```

### Installing Prettier in VSCode

Install the **"Prettier - Code formatter"** extension from the extensions sidebar. Once this is complete, open a code file and press _Alt + Shift + F_ to auto format it. You should see a prompt asking you to choose which code formatter you would like to use since you now have two available. Select Prettier from the prompt.

### Disabling ESLint style formatting, so no conflicts with Prettier

Linters usually contain not only code quality rules, but also stylistic rules. Most stylistic rules are unnecessary when using Prettier, but worse – they might conflict with Prettier! Use Prettier for code formatting concerns, and linters for code-quality concerns. To turn off linter eslint use _eslint-config-prettier_ in your project.

`npm install --save-dev eslint-config-prettier`

Then, add "prettier" to the "extends" array in your .eslintrc.\* file. Make sure to put it last, so it gets the chance to override other configs.

```{
 "extends": [

 "some-other-config-you-use",
 "prettier"
 ]
 }
```

That’s it! Extending "prettier" turns off a bunch of core ESLint rules, as well as a few rules from ESLint plugins.

### Updating all NPM packages

` npx npm-check --global --update-all`
