
### 前端脚手架开发

### 命令行工具开发

### package.json
"bin": {
  "ezq-cli": "bin/ezq-cli.js"
},

### 参考链接
[Node.js命令行程序开发教程](https://www.kancloud.cn/kancloud/command-line-with-node/48657 "Node.js命令行程序开发教程")

### 问题记录
在尝试使用Common.js加载chalk和ora库时(require)遇到Error[ERR_REQUIRE_ESM]，问题根源在于这两个库的版本不兼容。
通过降级ora和chalk到特定版本（chalk: ^4.1.2, ora: ^5.1.0）成功解决了此问题。