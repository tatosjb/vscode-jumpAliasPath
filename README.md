# vscode 识别webpack 别名 跳转

>识别webpack 别名跳转，但是需要点击`from`引用部分，`import`名称部分由于暂时无法拦截vscode 自身的事件(点击名称会提示两个位置)所以暂时关闭

----
暂时只支持 `/@.*/` 模式

----

## Configuration
在 `settings.json`内的配置项

`fileAliasSetting.aliasMap` 设置映射关系,使用相对路径

        "fileAliasSetting.aliasMap": {
            "@": "./src",
        },


`fileAliasSetting.fileSuffixs` 识别文件后缀（默认以下四种，如有其他可在 `settings.json` 中另行配置）

    "fileAliasSetting.fileSuffixs":[
        "js",
        "ts",
        "vue",
        "jsx",
    ],


## 未来计划
|计划名称|优先级|完成度|备注|
|--|--|--|---|
|支持 webpack config| 高| 未完成| |
|支持 完整[webpack 别名](https://webpack.docschina.org/configuration/resolve/#resolve-alias)|高|未完成| |
| typeScript 化| 低|未完成||
|支持分项目解析|低|未完成| 需要先识别根目录|