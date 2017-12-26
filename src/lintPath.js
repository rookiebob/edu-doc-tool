const fs = require('fs');

function getRightFilePath(filePath){
    const reg = /((component-|cache-|module-).*)\..*/ig;
    reg.test(filePath);
    //console.log(RegExp.$1);
    return RegExp.$1;
}

function lintPath(filePath){
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

    fs.writeFileSync(filePath,res,'utf8',() => {
        console.log('file rewrite success',filePath);
    })


};


module.exports = lintPath;