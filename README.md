# 改自(https://github.com/zizhengwu/daft-auto-spacing)[https://github.com/zizhengwu/daft-auto-spacing]
=================
## Api使用说明 
```
const str = '这行应该大约有40个字这行应该大约有40个字这行应该大约有40个字这行应该大约有40个字
本行有35字本行有35字本行有35字本行有35字本行有35字本行有35字本行有35字
到这一行就只有30个字到这一行就只有30个字到这一行就只有30个字
In this line有33个字In this line有33个字In this line有33个字啊啊啊'

const autoSpace = new AutoSpace()
const output = autoSpace.spacing(str,32,48,'##') //参数1传入字符串，2传入最小值，3传入最大值，4传入插入的字符串
console.log(output)
<!-- 这行应该大约有 40 个字这行应该大约有 40 个字##这行应该大约有 40 个字这行应该大约有 40 个字
本行有 35 字本行有 35 字本行有 35 字本行有##35 字本行有 35 字本行有 35 字本行有 35 字
到这一行就只有 30 个字到这一行就只有 30 个字到这一行就只有 30 个字
In this line 有 33 个字 In this li##ne 有 33 个字 In this line 有 33 个字啊啊啊 -->
<!-- 将str的数字、英文前后补空格，并且每行如果字数在32-48个之间(英文数字算半个)就在中间插入## -->
```