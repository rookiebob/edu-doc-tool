const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const rootPath = process.cwd();
const lintConfigPath = path.resolve(rootPath, './.eslintrc.json');


const updateLintConifg = () => {
    const lintConfig = require(lintConfigPath);

    if (lintConfig.rules && !lintConfig.rules.hasOwnProperty('valid-jsdoc')) {
        lintConfig.rules['valid-jsdoc'] = ["error", {
            "prefer": {
                "arg": "param", "argument": "param", "class": "constructor",
                "return": "returns", "virtual": "abstract"
            }
        }];
        //console.log(JSON.stringify(lintConfig, null, 4));
        fs.writeFile(lintConfigPath, JSON.stringify(lintConfig, null, 4), (err) => {
            if(err) throw err;
            console.log(chalk.green(`【${lintConfigPath}】add valid-jsdoc success`));
        });
    }
}

module.exports = updateLintConifg;