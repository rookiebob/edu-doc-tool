/**
 * Created by rookiebob on 2017/12/11.
 */


const jsdoc2md = require('jsdoc-to-markdown');
const fs = require('fs');
const Promise = require('bluebird');
const rootPath = process.cwd();

const ReadMePath = rootPath + '/README.md';

const genDoc =  (filepath) => {
    jsdoc2md.render({ files: filepath }).then((f) => {
        // if(filepath.includes("mask")){
        //     console.log(f);
        // }
        filterMd(f).then((new_f) =>{
            extractApis(filepath , new_f);
            extractEvents(filepath ,new_f);
        }).catch((err) => console.error(err))

    })
};

//处理提取出来的md一些异常的情况
const filterMd = (f) =>{
    return new Promise((resolve) => {
        const new_f = f.replace(/\\\|/g , '');
        resolve(new_f);
    })
};

//过滤拿出component.js的数据api
const extractApis = (filepath , f) => {
    const reg = /#(###\snew.*\n+(.*\s+\n)+(\|.*\n)+)\n/i;
    let apiString = '';

    //console.log(`【${filepath}】 ${reg.test(f)}`);

    if(reg.test(f)){
        apiString = RegExp.$1;
    }
    if(!apiString) return;

    fs.appendFile(ReadMePath , apiString , (err) => {
        if (err) throw err;
        console.log(`【${filepath}】 apis append success!`);
    })
};

//过滤拿出component.js的event
const extractEvents = (filepath ,f) => {
    const reg = /(###.*\n+\*\*Kind\*\*:\sevent.*(.*[\n\r\s])+)/i;
    let eventString = '';

    //console.log('event test:' + reg.test(f));

    if(reg.test(f)){
        eventString = RegExp.$1;
    }

    if(!eventString) return;

    fs.appendFile(ReadMePath , eventString , (err) => {
        if(err) throw err;
        console.log(`【${filepath}】 events append success!`);
    })
};

module.exports = genDoc;
