## gitcommitlint 流程规范配置

| 依赖 | 作用描述 |
| - | - |
| husky | 操作 git 钩子的工具（在 git xx 之前执行某些命令） |
| lint-staged | 在提交之前进行 eslint 校验，并使用 prettier 格式化本地暂存区的代码， |
| @commitlint/cli | 校验 git commit 信息是否符合规范，保证团队的一致性 |
| @commitlint/config-conventional | Anglar 的提交规范 |
| commitizen | 基于 Node.js 的 git commit 命令行工具，生成标准化的 commit message |
| cz-git | 一款工程性更强，轻量级，高度自定义，标准输出格式的 commitize 适配器 |

### 1、husky（操作 git 钩子的工具）：
+ 安装：`npm install husky -D` 使用（为了添加.husky 文件夹）
+ 编辑 package.json > prepare 脚本并运行一次
``` bash
npm set-script prepare "husky install"
npm run prepare
```
### 2、 lint-staged（本地暂存代码检查工具）

+ 安装： `npm install lint-staged --D` 

> 添加 ESlint Hook（在.husky 文件夹下添加 pre-commit 文件）：<br />
> 作用：通过钩子函数，判断提交的代码是否符合规范，并使用 prettier 格式化代码

+ npx husky add .husky/pre-commit "npm run lint:lint-staged"
+ 新增 lint-staged.config.js 文件：
``` javascript
module.exports = {
	"*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
	"{!(package)*.json,*.code-snippets,.!(browserslist)*rc}": ["prettier --write--parser json"],
	"package.json": ["prettier --write"],
	"*.vue": ["eslint --fix", "prettier --write", "stylelint --fix"],
	"*.{scss,less,styl,html}": ["stylelint --fix", "prettier --write"],
	"*.md": ["prettier --write"]
};
```

### 3、commitlint（commit 信息校验工具，不符合则报错
+ 安装： 
``` bash
npm i @commitlint/cli @commitlint/config-conventional -D
```
+ 配置命令（在.husky 文件夹下添加 commit-msg 文件）：
``` bash
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```

### 4、commitizen（基于 Node.js 的 git commit 命令行工具，生成标准化的 message）#
+ 安装 commitizen，如此一来可以快速使用 cz 或 git cz 命令进行启动。
``` bash
npm install commitizen -D
```

### 5、cz-git#
指定提交文字规范，一款工程性更强，高度自定义，标准输出格式的 commitizen 适配器
+ 安装 commitizen，如此一来可以快速使用 cz 或 git cz 命令进行启动。
``` bash
npm install cz-git -D
```

+ 配置 package.json：
``` json
text
"config": {
  "commitizen": {
    "path": "node_modules/cz-git"
  }
}
```

+ 新建 commitlint.config.js 文件：

``` javascript
// @see: https://cz-git.qbenben.com/zh/guide
/** @type {import('cz-git').UserConfig} */

module.exports = {
	ignores: [(commit) => commit.includes("init")],
	extends: ["@commitlint/config-conventional"],
	rules: {
		// @see: https://commitlint.js.org/#/reference-rules
		"subject-empty": [2, "never"],
		"type-empty": [2, "never"],
		"subject-case": [0],
		"type-enum": [
			2,
			"always",
			[
				"feat",
				"fix",
				"docs",
				"style"
			],
		],
	},
	prompt: {
		messages: { //  自定义命令行提问信息
			type: "选择你要提交的类型 :",
			subject: "填写简短精炼的变更描述 :\n"
		},
		types: [ // 自定义选择类型提示
			{ value: "feat", name: "feat:   🚀  新增功能", emoji: "🚀" },
			{ value: "fix", name: "fix:   ✅  修复缺陷", emoji: "✅" },
			{ value: "docs", name: "docs:   📚  文案文案变更", emoji: "📚" },
			{ value: "style", name: "style:   🎨  代码格式（不影响功能，例如空格、分号等格式修正）", emoji: "🎨" }
		],
		useEmoji: true, // 是否开启 commit message 带有 Emoji 字符。
		skipQuestions: [ // 跳过问题
			'body',
			'scope',
			'footer',
			'footerPrefix',
			'confirmCommit',
			'breaking'
		]
	}
};
```

+ 配置 package.json 命令
``` json
{
	"scripts": {
		"lint:lint-staged": "lint-staged",
    "prepare": "husky install",
		"commit": "git pull origin master && git add -A && git-cz && git push origin master"
	}
}
```
