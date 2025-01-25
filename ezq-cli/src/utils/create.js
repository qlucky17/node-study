
const ora = require('ora');
const chalk = require('chalk');
const download = require('download-git-repo');
const { exec } = require("child_process");
const inquirer = require('inquirer');
const prompt = inquirer.createPromptModule();

const init = () => {
  prompt([
    {
      type: "input",
      message: "请输入项目名称",
      name: 'project_name',
    },
    {
      type: "list",
      message: "请选择项目类型",
      name: 'type',
      choices: ['Vue', 'React', 'WeChat'],
    },
  ]).then((answers) => {
    console.log("answers = ", answers);
    const loadingTxt = chalk.white('正在下载, 请稍候...');
    const spinning = ora(loadingTxt).start();
    try {
      // 方法1: 使用download-git-repo
      download('github:qhuang05/q-tools', answers.project_name, (error) => {
        if(error){
          spinning.fail('下载失败');
        } else {
          spinning.succeed('下载成功');
        }
      });

      // 方法2: 使用命令
      // const url = "https://github.com/qhuang05/q-tools.git";
      // exec(`git clone ${url}`, (error, stdout, stderr) => {
      //   if (error) {
      //     spinning.fail('下载失败');
      //   } else {
      //     spinning.succeed('下载成功');
      //   }
      //   process.exit();
      // });
    } catch (error) {
      spinning.fail(error);
    }
  });
}

init();
