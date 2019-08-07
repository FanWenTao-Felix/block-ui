// 作用是在控制台中输出不同的颜色的字，大致这样用chalk.blue('Hello world')，这款插件只能改变命令行中的字体颜色
var chalk = require('chalk')
/**
 * 是用来对特定的版本号做判断的，比如
 * semver.gt('1.2.3','9.8.7')   false 1.2.3版本比9.8.7版本低
 * semver.satisfies('1.2.3','1.x || >=2.5.0 || 5.0.0 - 7.2.3') true 1.2.3的版本符合后面的规则
 */
var semver = require('semver')
// 要注意require是直接可以导入json文件的，并且requrie返回的就是json对象
var packageConfig = require('../package.json')
// shelljs作用是用来执行Unix系统命令
var shell = require('shelljs')

var exec = function (cmd) {
    //脚本可以通过 child_process 模块新建子进程，从而执行 Unix 系统命令
    // 实际就是把cmd这个参数传递的值转化成前后没有空格的字符串，也就是版本号
    return require('child_process').execSync(cmd).toString().trim()
}

var versionRequirements = [
    {
        name: 'node',
        // 使用semver插件吧版本信息转化成规定格式，也就是 '  =v1.2.3  ' -> '1.2.3' 这种功能
        currentVersion: semver.clean(process.version),
        // 这是规定的pakage.json中engines选项的node版本信息 "node":">= 4.0.0"
        versionRequirement: packageConfig.engines.node
    }
]

if (shell.which('npm')) {
    versionRequirements.push({
        name: 'npm',
        // 自动调用npm --version命令，并且把参数返回给exec函数，从而获取纯净的版本号
        currentVersion: exec('npm --version'),
        // 这是规定的pakage.json中engines选项的node版本信息 "npm": ">= 3.0.0"
        versionRequirement: packageConfig.engines.npm
    })
}

module.exports = function () {
    var warnings = []
    for (var i = 0; i < versionRequirements.length; i++) {
        var mod = versionRequirements[i]
        if (!semver.satisfies(mod.currentVersion, mod.versionRequirement))
        // 如果版本号不符合package.json文件中指定的版本号，就执行下面的代码
            warnings.push(mod.name + ': ' +
                chalk.red(mod.currentVersion) + ' should be ' +
                chalk.green(mod.versionRequirement)
            )
    }
}

if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()
    for (var i = 0; i < warnings.length; i++) {
        var warning = warnings[i]
        console.log('  ' + warning)
    }
    console.log()
    // 按照linux的规范，一般成功用0表示，而非0则表示失败。存在不满足版本要求的模块，执行失败
    process.exit(1)
}
