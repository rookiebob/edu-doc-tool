edu-doc-tool工具主要用于以下作用：
- 修正eslint检测出来的，但是没法通过--fix参数默认修复的问题
- 根据组件池的注释，一键生成API,并追加到README
- 提供本地组件文档预览功能

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
开始处理：【/Users/rookiebob/edu-work/pool/component-calendar/src/calendar/component.js】
开始处理：【/Users/rookiebob/edu-work/pool/component-calendar/src/datePicker/component.js】
开始处理：【/Users/rookiebob/edu-work/pool/component-calendar/src/dateRangePicker/component.js】
开始处理：【/Users/rookiebob/edu-work/pool/component-calendar/src/dateTimePicker/component.js】
开始处理：【/Users/rookiebob/edu-work/pool/component-calendar/src/timePicker/component.js】
【/Users/rookiebob/edu-work/pool/component-calendar/src/datePicker/component.js】 apis append success!
【/Users/rookiebob/edu-work/pool/component-calendar/src/datePicker/component.js】 events append success!
【/Users/rookiebob/edu-work/pool/component-calendar/src/dateRangePicker/component.js】 apis append success!
【/Users/rookiebob/edu-work/pool/component-calendar/src/calendar/component.js】 apis append success!
【/Users/rookiebob/edu-work/pool/component-calendar/src/calendar/component.js】 events append success!
【/Users/rookiebob/edu-work/pool/component-calendar/src/dateTimePicker/component.js】 apis append success!
【/Users/rookiebob/edu-work/pool/component-calendar/src/dateTimePicker/component.js】 events append success!
【/Users/rookiebob/edu-work/pool/component-calendar/src/timePicker/component.js】 apis append success!
【/Users/rookiebob/edu-work/pool/component-calendar/src/timePicker/component.js】 events append success!


```

### 4，本地组件启动预览
```
edu-doc-tool -s
```
```javascript

.gitignore已经忽略mock文件！
[/Users/rookiebob/mydemo/edu-doc-tool/src/template/_navbar.md] copy success!
[/Users/rookiebob/mydemo/edu-doc-tool/src/template/index.html] copy success!
[/Users/rookiebob/mydemo/edu-doc-tool/src/template/_sidebar.md] copy success!
/index.html已添加到.gitignore
/_sidebar.md已添加到.gitignore
/_navbar.md已添加到.gitignore
stdout: *** DEPRECATION WARNING *** The exts option will REPLACE extensions in 0.6.4. ***

stdout: 
Serving /Users/rookiebob/edu-work/pool/component-calendar now.
Listening at http://localhost:3000
```
