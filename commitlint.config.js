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