edu-doc-tool工具主要用于以下作用：
- 修正eslint检测出来的，但是没法通过--fix参数默认修复的问题
- 根据组件池的注释，一键生成API,并追加到README

# 快速使用
### 1,安装edu-doc-tool

```
npm install edu-doc-tool -g
```

### 2,修正脚本中错误的注释
```
cd component-xx
edu-doc-tool -l
```
看到输出并替换了错误的路径

```
开始处理：【/Users/rookiebob/edu-work/pool/component-calendar/src/datePicker/ui.js】
开始处理：【/Users/rookiebob/edu-work/pool/component-calendar/src/dateRangePicker/component.js】
>>该文件下被替换的错误路径： @class   module:pool/component-calendar/src/component/dateRangePicker/component.DateRangePicker
>>该文件下被替换的错误路径： @member {Number} module:pool/component-calendar/src/component/dateRangePicker/component.DateRangePicker#getGMTStartDate
>>该文件下被替换的错误路径： @member {Number} module:pool/component-calendar/src/component/dateRangePicker/component.DateRangePicker#getGMTEndDate
>>该文件下被替换的错误路径： @method  module:pool/component-calendar/src/component/dateRangePicker/component.DateRangePicker#config
>>该文件下被替换的错误路径： @method  module:pool/component-calendar/src/component/dateRangePicker/component.DateRangePicker#init
>>该文件下被替换的错误路径： @method  module:pool/component-calendar/src/component/dateRangePicker/component.DateRangePicker#doValidate
>>该文件下被替换的错误路径： @method  module:pool/component-calendar/src/component/dateRangePicker/component.DateRangePicker#destroy

```

### 3，生成组件API文档

```
cd component-xx
edu-doc-tool -g
```

看到输出了生成并追加到README的提示

```javascript
apis append success!
events append success!
events append success!
apis append success!
apis append success!
events append success!
apis append success!
events append success!

```
