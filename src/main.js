const path = require('path');
const rd  = require('rd');

const lintPath = require('./lintPath.js');
const genDoc2md  = require('./jsdoc2Md.js');
const serveDoc  = require('./serveDoc.js');
const fs = require('fs-extra');
const prog = require('commander');

const rootPath = process.cwd();
const ReadMePath = rootPath + '/README.md';


module.exports = function () {

    function main(){
        prog.version('0.0.1')
            .usage('npm run edu-doc-tool')
            .option('-l, --lintPath', '修正代码中错误的注释')
            .option('-g, --genDoc', '生成组件的readme文档')
            .option('-s, --serveDoc', '单个组件编写文档的时候，预览效果生成器')
            .parse(process.argv);


        //单个组件提供本地预览环境
        if(prog.serveDoc){
            serveDoc();
        }

        //检测并修复文档注释
        if(prog.lintPath){
            rd.eachFileFilterSync('./src', /\.js$/, (f, s) => {
                console.log('开始处理：【%s】' ,f);
                lintPath(f);
            });
        }

        //生成api
        if(prog.genDoc){

            fs.readFile(ReadMePath, 'utf8' , (err, data) => {
                if(data.indexOf('### API') > 0){
                    data = data.slice(0 , data.indexOf('### API'));
                }
                fs.writeFile(ReadMePath , data + `\n### API\n`);
            });

            rd.eachFileFilterSync('./src', /\.js$/, (f, s) => {
                if(f.indexOf('component.js') > -1){
                    console.log('开始处理：【%s】' ,f);
                    genDoc2md(f);
                }
            });
        }

    }

    main();
};

