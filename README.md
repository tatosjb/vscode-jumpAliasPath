# Vscode recognition webpack alias Jump 

** to complete the degree is not high, not to recommend the use of ** 


> alias identification webpack jump, but need to click on `from` reference section,` import` name is temporarily unavailable due in part to intercept vscode own events ( click on the name will prompt two locations) so temporarily shut down 

---- 
only supports `` /@.*\*/ mode 

support webpack configuration file `alias` field, other items not support 

---- 

# # ConfigurationConfiguration item 
in `settings.json` 

### Mapping relationship` 
fileAliasSetting.aliasMap` Set the mapping relationship, use ~~ relative path ~~ (temporarily use absolute path, later adaptation grouping and relative path), also Find webpack config file, but this will be configured as a master, the same name as overrides (temporarily) webpack config file 

* there is no good way to determine the root directory, the temporary use absolute paths * 

** ** aliasMap packet identification has been completed 

        // to Namespace top-level folder named key 
        "fileAliasSetting.aliasMap": { 
            "webpack": { 
                "@": "root/work/webpack/src" 
            }, 
            "default":{// default
                "@": "root/work/webpack/src" 
            }, 
        }, 

### The file suffix 
`fileAliasSetting.fileSuffixs` recognizes the file suffix (the following four are the default, if you can find others in` settings.json` (These four types do not need to be configured in setting.json) 

    "fileAliasSetting.fileSuffixs": [ 
        "js", 
        "ts", 
        "vue", 
        " 
jsx ", 
    ], 

### indicates the webpack config file name 
`fileAliasSetting .configPos` indicates webpack config file name, key name is project folder name, value is `webpack config` file name 

        " fileAliasSetting.configPos ": { 
            " project root ":" webpack configuration item file name ", 
        }, 

** Do not use ./ or / ** 

        "fileAliasSetting.configPos" for keys whose configuration files are not under the root directory :{ 
            "webpack-project-name": "webpack.config.js",
            "vue-project-name": "build / webpack.config.dev.js" // Do not use relative or absolute symbols 
            "default": "webpack.config.js", // default webpack configuration file name, optional or not Fill in 
        }, 


## Future plan 
| Plan name | Priority | Completion degree | Remarks | 
|-|-| ---- | --- | 
| Support webpack config | High | Complete | Support webalia configuration file `alias `field | 
| supports full [webpack alias] (https://webpack.docschina.org/configuration/resolve/#resolve-alias) | high | unfinished | | 
| the typescript of | low | unfinished || 
| support points Project analysis | Low | 99% | ~~ Need to identify the root directory ~~, the top folder of the workspace is called the root directory | 
| Data persistence | Low | Unfinished ||
