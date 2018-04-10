const fs = require('fs');
const chalk = require('chalk');

const getRightFilePath = (filePath) => {
    const reg = /((component-|cache-|module-).*)\..*/ig;
    reg.test(filePath);
    //console.log(RegExp.$1);
    return RegExp.$1;
}

const lintPath = (filePath) => {
    const fileContent = fs.readFileSync(filePath , 'utf8');
    const reg = /(@(method|member|module|class).*:?pool\/)([^\.\n]+)(\..+)?/ig;
    const _rightFilePath = getRightFilePath(filePath);
    const res = fileContent.replace(reg,(word , $1 , $2 ,$3 , $4) => {
        //console.log('-%s ** %s ** %s ** %s' , $1 , $2 ,$3 , $4);
        let result = '';
        if($3 != _rightFilePath){
            //console.log($1 + _rightFilePath +  ($4!='undefined')?$4:'');
            console.log(">>该文件下被替换的错误路径：" ,word);
        }
        if($1 && $2 && $3){
            if($4==undefined){
                result = $1 + _rightFilePath;
            }else {
                result = $1 + _rightFilePath + $4;
            }
            //console.log(result);
            return result;
        }
    });
    return res;
};

const lintJsdoc = (res) => {
    return res.replace(/@return\s/g , '@returns ').
                replace('{Void}' , '{void}');
};


const lint = (filePath)=>{

    //修正所有的注释路径错误
    const res = lintPath(filePath);

    //修正jsdoc的错误，相当于eslint --fix修复
    const result = lintJsdoc(res);

    fs.writeFile(filePath,result,'utf8',(err) => {
        if (err) throw err;

         console.log(chalk.green(`>>【${filePath}】eslint fix over && rewrite success`));
    })
}

module.exports = lint;