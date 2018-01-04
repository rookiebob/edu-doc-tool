const path = require('path');
const rd  = require('rd');

const lintPath = require('./lintPath.js');
const genDoc2md  = require('./jsdoc2Md.js');
const serveDoc  = require('./serveDoc.js');
const prog = require('commander');


module.exports = function () {

    function main(){
        prog.version('0.0.1')
            .usage('npm run edu-doc-tool')
            .option('-l, --lintPath', '修正代码中错误的注释')
            .option('-g, --genDoc', '生成组件的readme文档')
            .option('-s, --serveDoc', '单个组件编写文档的时候，预览效果生成器')
            .parse(process.argv);


        // 同步遍历目录下的所有js文件
        if(prog.serveDoc){
            serveDoc();
            return;
        }

        rd.eachFileFilterSync('./src', /\.js$/, (f, s) => {
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

