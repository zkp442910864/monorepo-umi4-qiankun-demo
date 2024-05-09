const child_process = require('child_process');
const minimist = require('minimist');
const shell = require('shelljs');
const fs = require('fs');
const chalk = require('chalk');


const startCommand = (project, action) => {
    const str = `pnpm run --filter ./project/${project} ${action}`;
    console.log(str);

    return new Promise((rel) => {
        shell.exec(str, {silent: false}, (code, stdout, stderr) => {
            // 执行完成后的回调
            // console.log("Exit code:", code);
            // console.log("Program output:", stdout);
            // console.log("Program stderr:", stderr);
            rel();
        });
    })
}

try {
    const {project = 'main', action = 'start'} = minimist(process.argv.splice(2));
    // console.log(action, project);
    if (action === 'start') {
        startCommand(project, action);
    }
    else if (action === 'build') {
        startCommand(project, action);
    }
    else if (action === 'build:all') {
        // startCommand(project, action);
        const data = fs.readdirSync('./project');
        // data.forEach(async (str) => await startCommand(str, 'build'));
        (async () => {
            for (const str of data) {
                console.log('~~~~~~~~~~~~~~ 开始 ' + chalk.green(str) + ' ~~~~~~~~~~~~~~');
                await startCommand(str, 'build')
                console.log('~~~~~~~~~~~~~~ 结束 ' + chalk.green(str) + ' ~~~~~~~~~~~~~~');
            }
        })()
    }
}
catch (error) {
    console.log(error);
}

