# Sports App

This app pulls scores and standings from various sports leagues and inserts the data into simple to read tables to give a quick & easy way to read rundown of yesterday's scores and your team favorite standings.

&nbsp;&nbsp;This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more. It is designed to be cloned from the command line by the _vite-setup.cmd_ script.
&nbsp;&nbsp;The _vite-setup.cmd_ script will download this file from Github and install all the dependencies. It will also add a remote repo for your new project and push it to Github. The added benefit of using vite-setup is that the **eslintrc.js** & **prettierrc.js** config files are also downloaded and configured with sane defaults.

### vite-setup.cmd requirements
&nbsp;&nbsp;[Github CLI](https://github.com/cli/cli) (e.g.,**gh**) is GitHub on the command line. It brings pull requests, issues, and other GitHub concepts to the terminal next to where you are already working with git and your code. It enables us to create a _remote repo_ of the cloned vite project. This is done in the ***vite-setup*** script so you dont have to create a remote repo of your new project yourself.

&nbsp;&nbsp;The easiest way to install _gh_ is thru chocolaty. At admin command line issue -

_choco install gh_

&nbsp;&nbsp;We also use the _npm-check-updates_ to update all packages to latest versions for each new project. To update all of our package dependencies in package.json (excluding our “vue” package), we would do the following:

_ncu --upgrade_

_npm install_

&nbsp;&nbsp;Unfortunately as of this writing we also have to run _npm install vue@next_ seperately to insure latest version of vue is installed for the new project.


## Service Workers
This app uses *Service Workers* to cache responses from API calls. To make it easier to work with SW's we use the Vite plugin which can be installed as:

`npm install` *vite-plugin-pwa* `-D`

then you may configure the SW's in the vite.config.js file w/options. To read about how to configure SW's, goto [vite-plugin-pwa](https://vite-pwa-org.netlify.app/guide/)

If you are still using Vue/CLI you can add SW's by issuing command:

`vue add pwa`

then add pwa property w/options to vue.config.js. See [cli-plugin-pwa](https://cli.vuejs.org/core-plugins/pwa.html)

***Further reading***

[Building a PWA with Vue.js](https://blog.logrocket.com/building-pwa-vue/)

[PWA for Vue applications: A practical guide ](https://dev.to/pegahsafaie/pwa-for-vue-applications-a-practical-guide-4de3)



