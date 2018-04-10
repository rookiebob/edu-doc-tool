const path = require('path');
const rd  = require('rd');
const chalk  = require('chalk');

const lint = require('./lint.js');
const genDoc2md  = require('./jsdoc2Md.js');
const serveDoc  = require('./serveDoc.js');
const package  = require('../package.json');
const updateLintConfig  = require('./updateLintConfig.js');
const fs = require('fs-extra');
const prog = require('commander');

const rootPath = process.cwd();
const ReadMePath = rootPath + '/README.md';


module.exports = function () {

    function main(){
        prog.version(package.version)
            .usage('npm run edu-doc-tool')
            .option('-l, --lint', '修正代码中错误的注释')
            .option('-g, --genDoc', '生成组件的readme文档')
            .option('-s, --serveDoc', '单个组件编写文档的时候，预览效果生成器')
            .option('-v, --version', '查看版本号')
            .parse(process.argv);


        //单个组件提供本地预览环境
        if(prog.serveDoc){
            console.log(chalk.blue('***当前执行预览效果生成器***'));
            serveDoc();
        }

        //检测并修复文档注释
        if(prog.lint){
            console.log(chalk.blue('***当前执行代码修正***'));
            updateLintConfig();
            rd.eachFileFilterSync('./src', /\.js$/, (f, s) => {
                console.log('开始处理：【%s】' ,f);
                lint(f);
            });
        }

        //生成api
        if(prog.genDoc){
            console.log(chalk.blue('***当前执行文档生成***'));
            try{
                var data = fs.readFileSync(ReadMePath, 'utf8');
                if(data.indexOf('### API') > 0){
                    data = data.slice(0 , data.indexOf('### API'));
                }
                fs.writeFileSync(ReadMePath , data + `\n### API\n`);
            }catch(err){
                throw err;
            }

            genDoc2md();

        }

    }

    main();
};

