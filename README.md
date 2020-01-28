# vscode identify webpack alias jump

** Completion is not high, not recommended for the time being **


> Recognize the webpack alias jump, but you need to click the `from` reference part, the` import` name part is temporarily closed due to the fact that vscode itself cannot be intercepted (clicking the name will prompt two places), so it is temporarily closed

----
Only support `/@.*\*/` mode for now

Supports the `alias` field of the webpack configuration file. Other related items are not supported yet.

----

## Configuration
Configuration items in `settings.json`

### Mapping relations
`fileAliasSetting.aliasMap` sets the mapping relationship, using ~~ relative path ~~ (temporarily use absolute path, later adaptation grouping and relative path), it will also look for the webpack config file, but this configuration will be the main one, and the same name item will be overwritten webpack config file (temporary)

* There is no good way to determine the root directory, and temporarily use absolute paths *

** aliasMap group identification has been completed **

        // Name the top-level folder of the namespace as the key
        "fileAliasSetting.aliasMap": {
            "webpack": {
                "@": "D: \\ work \\ webpack \\ src"
            },
            "default": {// default
                "@": "D: \\ work \\ webpack \\ src"
            },
        },

### File extension
`fileAliasSetting.fileSuffixs` identifies file suffixes (the following four are the default, if there are others, you can configure them in` settings.json`, these four types do not need to be configured in setting.json)

    "fileAliasSetting.fileSuffixs": [
        "js",
        "ts",
        "vue",
        "jsx",
    ],


### indicates webpack config file name
`fileAliasSetting.configPos` indicates the webpack config file name, the key name is the project folder name, and the value is the` webpack config` file name

        "fileAliasSetting.configPos": {
            "Project root": "webpack configuration file name",
        },

** Do not use ./ or / ** for keys whose configuration files are not under the root directory

        "fileAliasSetting.configPos": {
            "webpack-project-name": "webpack.config.js",
            "vue-project-name": "build / webpack.config.dev.js" // don't use relative or absolute symbols
            "default": "webpack.config.js", // default webpack configuration file name, optional or not
        },


## Future plan
| Plan Name | Priority | Completion | Remarks |
|-|-| ------- |
| Support webpack config | High | Done | Support the `alias` field of webpack configuration files |
| Support Full [webpack alias] (https://webpack.docschina.org/configuration/resolve/#resolve-alias) | High | Unfinished ||
| typeScript | Low | Incomplete ||
Support sub-project analysis | Low | 99% | ~~ Need to identify the root directory first ~~, the top folder of the workspace is named root directory |
| Data Persistence | Low | Unfinished ||
