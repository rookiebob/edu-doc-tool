const fs = require('fs');
const path = require('path');
const rd  = require('rd');

const lintPath = require('./lintPath.js');
const genDoc2md  = require('./jsdoc2Md.js');
const prog = require('commander');


module.exports = function () {

    function main(){
        // 同步遍历目录下的所有js文件
        rd.eachFileFilterSync('./src', /\.js$/, (f, s) => {

            prog.version('0.0.1')
                .usage('npm run edu-doc-tool')
                .option('-l , --lintPath', '修正代码中错误的注释')
                .option('-g, --genDoc', '生成组件的readme文档')
                .parse(process.argv);

            console.log('开始处理：【%s】' ,f);
            if(prog.lintPath){
                lintPath(f);
            }
            if(prog.genDoc && f.indexOf('component.js') > -1){
                genDoc2md(f);
            }
        });
    }

    main();
};

