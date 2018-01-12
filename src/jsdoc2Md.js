/**
 * Created by rookiebob on 2017/12/11.
 */


const jsdoc2md = require('jsdoc-to-markdown');
const fs = require('fs');
const Promise = require('bluebird');
const rd  = require('rd');
const rootPath = process.cwd();
const chalk = require('chalk');

const ReadMePath = rootPath + '/README.md';
const docConfigJson = rootPath + '/.docconfig.json';

const genDoc2md = () => {

    getDocConfig().then((result) => {
        rd.eachFileFilterSync('./src', /\.js$/, (f, s) => {

            if((!result && f.indexOf('component.js') > -1) ||
                result && result.includes(f)
            ){
                console.log('开始处理：【%s】' ,f);
                extractInfos(f);
            }
        });
    }).catch((e) => {
        console.error(e);
    });

}

//读取用户的配置，如果存在.docconfig.json，优先读取配置，否则读取所有的component.js
const getDocConfig = () => {
    return new Promise((resolve) => {
        fs.readFile(docConfigJson ,'utf8' ,(err, data) => {
            let result = false;
            if(data){
                try{
                    data = JSON.parse(data);
                    result = (data.path && data.path.length>0)?data.path:false;
                    if(result){
                        console.log(chalk.green(`读取.docconfig.json的配置`));
                    }
                }catch(e){
                    throw new Error(e);
                }

            }else{
                console.log(chalk.green(`默认读取所有component.js文件，如有需求，请配置.docconfig.json的path路径！`));
            }
            resolve(result);
        })
    });


}
const extractInfos =  (filepath) => {
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

module.exports = genDoc2md;
