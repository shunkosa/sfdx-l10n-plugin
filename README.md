# sfdx-l10n-plugin

[![Version](https://img.shields.io/npm/v/sfdx-l10n-plugin.svg)](https://npmjs.org/package/sfdx-l10n-plugin)
[![Downloads/week](https://img.shields.io/npm/dw/sfdx-l10n-plugin.svg)](https://npmjs.org/package/sfdx-l10n-plugin)
[![License](https://img.shields.io/npm/l/sfdx-l10n-plugin.svg)](https://github.com/shunkosa/sfdx-l10n-plugin/blob/master/package.json)

A Salesforce CLI plugin to retrieve and set language/locale of user/org.

![](img/screenshot.gif)

## Setup
### Install as plugin
1. Install plugin: `sfdx plugins:install sfdx-l10n-plugin`

### Install from source
1. Install the SDFX CLI.
2. Clone the repository: `git clone git@github.com:shunkosa/sfdx-l10n-plugin.git`
3. Install npm modules: `npm install`
4. Link the plugin: `sfdx plugins:link` .

## Use
Use ``--help`` option for the detail.

### Set user language/locale
`sfdx l10n:user:set --lang ja --locale en_US`

### Display user current language and locale
`sfdx l10n:user:get`

### Set org language/default locale
`sfdx l10n:org:set --lang ja --locale en_US`

### Display org current language and default locale
`sfdx l10n:org:get`

## Resources
* [Supported Languages - Salsforce Help](https://help.salesforce.com/articleView?id=faq_getstart_what_languages_does.htm&type=5)
