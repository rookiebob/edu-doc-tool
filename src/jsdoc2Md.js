/**
 * Created by rookiebob on 2017/12/11.
 */


const jsdoc2md = require('jsdoc-to-markdown');
const fs = require('fs');
const rootPath = process.cwd();


const genDoc =  (filepath) => {
    console.log('********************');
    jsdoc2md.render({ files: filepath }).then((f) => {

        extractApis(f);
        extractEvents(f);
    })
};

//过滤拿出component.js的数据api
const extractApis = (f) => {
    const reg = /####\snew.*\n+(.*\s+\n(\|.*\n)+)\n/i;
    let apiString = '';

    //console.log(reg.test(f));

    if(reg.test(f)){
        apiString = RegExp.$1;
    }
    if(!apiString) return;

    fs.appendFile(rootPath + '/README.md' , apiString , (err) => {
        if (err) throw err;
        console.log('apis append success!');
    })
};

//过滤拿出component.js的event
const extractEvents = (f) => {
    const reg = /(###.*\n+\*\*Kind\*\*:\sevent.*(.*[\n\r\s])+)/i;
    let eventString = '';

    //console.log('event test:' + reg.test(f));

    if(reg.test(f)){
        eventString = RegExp.$1;
    }

    if(!eventString) return;

    fs.appendFile(rootPath + '/README.md' , eventString , (err) => {
        if(err) throw err;
        console.log('events append success!')
    })
};

module.exports = genDoc;
