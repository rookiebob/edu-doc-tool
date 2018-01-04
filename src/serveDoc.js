const fs = require('fs-extra');
const path = require('path');
const ejs = require('ejs');
const Promise = require('bluebird');
const chalk = require('chalk');
const childProcess = require('child_process');

const IndexHtmlPath = path.resolve(__dirname , './template/index.html');
const SideBarMdPath = path.resolve(__dirname , './template/_sidebar.md');
const NavBarMdPath = path.resolve(__dirname , './template/_navbar.md');
const GitIgnorePath = path.resolve('./' , './.gitignore');


const ReadFile = (path) =>{
    return new Promise((resolve , reject) => {
        fs.readFile(path , 'utf8' , (err , data) => {
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    });
};

const genIndexHtml = () =>{

    ReadFile(IndexHtmlPath).then(
        (data) => {
            fs.outputFileSync('./index.html', data);
            console.log("[%s] copy success!" ,IndexHtmlPath);
        },
        (err) =>{
            console.error(err);
        }

    );
};

const genNavBarMd = () =>{

    ReadFile(NavBarMdPath).then(
        (data) => {
            fs.outputFileSync('./_navbar.md', data);
            console.log("[%s] copy success!" ,NavBarMdPath);
        },
        (err) =>{
            console.error(err);
        }

    );

};



//
const genSideBarMd = () => {

    ReadFile(SideBarMdPath).then(
        (data) => {
            const file = ejs.render(data, {
                componentName: '组件'
            });

            fs.outputFileSync('./_sidebar.md', file);
            console.log("[%s] copy success!" , SideBarMdPath);
        },
        (err) =>{
            console.error(err);
        }

    );


};

const addGitIgnore = () => {
    ReadFile(GitIgnorePath).then(
        (data) => {
            const arr = ["/index.html" , '/_sidebar.md' , '/_navbar.md'];
            arr.forEach((it , index) => {
                if(!data.includes(arr[index])){
                    fs.appendFile(GitIgnorePath , `\n${arr[index]}` , (err) => {
                        if(err) throw err;
                        console.log(`${arr[index]}已添加到.gitignore`);
                    });
                }
            });
            console.log('.gitignore已经忽略mock文件！');
        },
        (err) => console.error(err)
    );
}

const serveDocsify = () => {

    return new Promise((resolve , reject) => {

        const ls = childProcess.exec("docsify serve --open true");
        ls.stdout.on('data', function (data) {
            console.log('stdout: ' + data);
        });

        ls.stderr.on('data', function (data) {
            console.log('stderr: ' + data);
        });

        ls.on('close', function (code) {
            console.log('child process exited with code ' + code);
        });
    })
}


//生成启动必备文件
const serverDoc = () => {

    genIndexHtml();
    genNavBarMd();
    genSideBarMd();
    addGitIgnore();
    serveDocsify().then((msg) => {
        childProcess.exec(`echo ${msg}`);
    })

}



module.exports = serverDoc;