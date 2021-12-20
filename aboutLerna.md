<!--
 * @Author: your name
 * @Date: 2021-12-20 18:25:21
 * @LastEditTime: 2021-12-20 18:26:55
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \jsTools\aboutLerna.md
-->

## Lerna

> Lerna能优化git和npm管理多包存储的工作流。Lerna内部使用Yarn和npm CLI来引导项目（即为每个包安装所有第三方依赖）。简单来说，对项目中的每个使用的包Lerna都是用yarn/npm进行安装，然后在引用的包之间创建软链接。 Lerna只是对包管理器进行了一层包装，所以Lerna无法有效的处理node_modules里面的内容
> Lerna通过 yarn install 安装包，这会对重复引用的包多次安装，这样会使得项目变得过载，因为package.json里面的引用的包是相互独立的，不会批次共享依赖。所以经常使用的第三方包，都会重复安装，这会造成大量重复
Lerna是先创建包，然后创建包之前的引用链接，这会造成的问题是会引起包管理器node_modules内的不一致，所以从包中运行yarn install可能会破坏Lerna管理的结构。

## Yarn Workspaces

> Yarn Workspaces允许用户在单个根package.json文件的子文件夹中从多个package.json文件中安装依赖。
> 通过防止Workspaces中依赖包的重复，使原生Workspaces到Yarn可以实现更快更轻松的依赖安装。Yarn还可以在依赖于彼此的Workspaces之间创建软链接，并确保所有目录的一致性和正确性。

## leran 简单使用

**因为使用`lerna`进行包管理，依赖的安装和删除必须使用lerna 命令操作**

### Global Options

--loglevel       What level of logs to report.  
--concurrency    How many processes to use when lerna parallelizes tasks.  
--reject-cycles  Fail if a cycle is detected among dependencies.  
--no-progress    Disable progress bars. (Always off in CI)  
--no-sort        Do not sort packages topologically (dependencies before dependents).  
--max-buffer     Set max-buffer (in bytes) for subcommand execution  
-h, --help       Show help  
-v, --version    Show version number  

## Command

### add

`add <package> [globs..] [@version] [--dev] [--exact]  // Add a single dependency to matched packages`  
将单个依赖添加到匹配的包，默认所有包  
--dev devDependencies 替代 dependencies  
--exact 安装准确版本，就是安装的包版本前面不带^, Eg: "^2.20.0" ➜ "2.20.0"  
Examples:

``` bash
# 为packages/prefix-开头的模块添加module-1依赖
> lerna add module-1 packages/prefix-*

# 为module-2模块添加module-1依赖
> lerna add module-1 --scope=module-2

# Install module-1 to module-2 in devDependencies
> lerna add module-1 --scope=module-2 --dev

# Install module-1 in all modules except module-1
> lerna add module-1

# Install babel-core in all modules
> lerna add babel-core
```

### bootstrap

`bootstrap [--exact] // Link local packages together and install remaining package dependencies`  
引导目前Lerna库的所有package，安装它们全部的依赖关系并连接任何相互交叉依赖的关系。  
lerna bootstrap respects the --ignore, --ignore-scripts, --scope and --include-filtered-dependencies

### changed

`changed // List local packages that have changed since the last tagged release`  
列出自上次标记的版本以来已更改的本地包

### clean

`clean // Remove the node_modules directory from all packages`  
删除所有包的 mode_modules 目录

### create

`create <name> [loc]  // Create a new lerna-managed package`  
创建一个新的 lerna 管理包
Example:

``` bash
# 根目录的package.json, 指定工作目录
'workspaces': [
  'packages/*',
  'packages/@jc3910/*'
]

# 创建一个包 package1 默认放在 workspaces[0] 所指位置
> lrena create package1

# 创建一个包 package2 指定放在 packages/@jc3910 文件夹下，注意必须在workspaces先写入packages/@jc3910
> lerna create package2 packages/@jc3910
```

### diff

`diff [pkgName] // Diff all packages or a single package since the last release`  
对比所有包或指定的包与最后一次发布的差异 类似git diff  
Examples:

``` bash
# 查看所有变更
> lerna diff

# 查看指定包module1变更内容
> lerna diff module1
```

### exec

`exec -- [cmd] [args..] // Execute an arbitrary command in each package`  
执行任意命令在每一个包。
Examples:

``` bash
# 删除所有模块中的react-dom依赖
> lerna exec -- npm uninstall react-dom

# basic-components模块删除antd依赖
> lerna exec --scope=basic-components yarn remove antd

# 
```

### import

`import <dir> // Import a package into the monorepo with commit history`  
将包导入具有提交历史记录的monorepo；导入本地已经存在的包

### info

`info // Prints debugging information about the local environment`  
打印有关本地环境的调试信息  

### init

`init // Create a new Lerna repo or upgrade an existing repo to the current version of Lerna`  
创建新的Lerna repo 或将现有的repo升级到当前版本的lerna

### link

`link // Symlink together all packages that are dependencies of each other`  
项目包建立软链接，类似`npm link`  

### list

`list // show all lerna packages`  
列出所有的包，如果与实际不符，进入相应包执行npm init -y 解决

### publish

`publish [bump] // Publish packages in the current project.`  
发布当前包 npm/git
> Lerna不会发布标记为私有的软件包（"private": true在中package.json）。  
> 注意：要发布作用域包，您需要在每个包中添加以下内容package.json：

``` bash
# lerna version + lerna publish from-git
# 发布自上次发布来有更新的包(这里的上次发布也是基于上次执行lerna publish 而言)
lerna publish

# 发布当前 commit 中打上 annoted tag version 的包(即 lerna publish from-git)
lerna publish from-git 

# 发布 package 中 package.json 上的 version 在 registry(高于 latest version)不存在的包
# 发布在最近 commit 中修改了 package.json 中的 version (且该 version 在 registry 中没有发布过)的包(即 lerna publish from-package)
lerna publish from-packages 
```

``` bash
"publishConfig": {
  "access": "public"
}
```

### run

`run <script> // Run an npm script in each package that contains that script`  
在包含该脚本的每个包中运行一个npm脚本  
lerna run respects the --concurrency, --scope, --ignore, --stream, and --parallel flags  
lerna run遵循--concurrency、--scope、--ignore、--stream和--parallel标志

Example:

``` bash
# 执行 my-component 包中的 test 脚本 
> lerna run --scope my-coponent test
```

### version

`version [bump] // Bump version of packages changed since the last release.`  

## yarn.json

``` js
{
  "useWorkspaces": true, // 使用 workspaces 配置。此项为 true 的话，将使用 package.json 的 "workspaces"，下面的 "packages" 字段将不生效
  "version": "0.1.0", // 所有包版本号，独立模式-"independent"
  "npmClient": "cnpm", // npm client，可设置为 cnpm、yarn 等
  "packages": [ // 包所在目录，可指定多个
    "packages/*"
  ],
  "command": { // lerna 命令相关配置
    "publish": { // 发布相关
      "ignoreChanges": [ // 指定文件或目录的变更，不触发 publish
        ".gitignore",
        "*.log",
        "*.md"
      ]
    },
    "bootstrap": { // bootstrap 相关
      "ignore": "npm-*",  // 不受 bootstrap 影响的包
      "npmClientArgs": [ // bootstr 执行参数
        "--no-package-lock"
      ]
    }
  }
}
```

另外可以安装tree插件生成目录文件树

```shell
# Mac OS 安装tree
brew install tree

# 生成树文件结构输出到tree.md
 tree -I 'node_modules' >tree.md
```
