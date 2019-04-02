// 获取 dom
const noSpace = document.querySelector('.no-space')
const withSpace = document.querySelector('.with-space')

const min = document.getElementById('min')
const max = document.getElementById('max')
const insert = document.getElementById('insert')
const puncList = document.getElementById('puncList')
const replaceList = document.getElementById('replace')

const radioInsert = document.getElementsByName('insert')
const radioPunc = document.getElementsByName('punc')

const insertCheck = document.getElementById( localStorage.getItem('insertChecked')||'insert1' )

// 初始化str和no-space
let initStr = localStorage.getItem('nospace') ? localStorage.getItem('nospace') : 'first空格blank\n１２３４５６７\nａｂｃｚＡＢＣＺ\n,.,.,....\n，。，。。。' //初始获取输入的值
const autoSpace = new AutoSpace()

//初始化处理一遍
let str = initStr
str = autoSpace.space(str,true) // str, oneSpace
str = autoSpace.numAngelTransfer(str) // str
str = autoSpace.enAngelTransfer(str) // str
/* 获取离线数据并填入表单 */
min.value = localStorage.getItem('insertMin') || '32'
max.value = localStorage.getItem('insertMax') || ''
insert.value = localStorage.getItem('insertInsert') || '##'
insertCheck.checked = true
radioInsert.forEach(dom=>{
	 if(dom.checked && dom.value=='false')
	 return // 不处理
	 if(dom.checked && dom.value=='true')
	 str = autoSpace.insert(str, insert.value, min.value, max.value) // str, insert, min, max
})

noSpace.value = initStr
withSpace.value = str
puncList.value = autoSpace.puncDetect(str)+autoSpace.biaodianDetect(str)
puncList.disabled = true
replaceList.disabled = true

// 监听input变化 处理
new Array(noSpace, min, max, insert, ...radioInsert, ...radioPunc, puncList, replaceList).forEach((dom)=>{
	 dom.addEventListener('input', ()=>{

			str = noSpace.value
			str = autoSpace.space(str,true) // str, oneSpace
			str = autoSpace.numAngelTransfer(str) // str
			str = autoSpace.enAngelTransfer(str) // str

			radioPunc.forEach(dom=>{
				 if(dom.checked && dom.value=='false'){
						puncList.value = autoSpace.puncDetect(str)+autoSpace.biaodianDetect(str)
						puncList.disabled = true
						replaceList.disabled = true
						return // 不处理
				 }
				 if(dom.checked && dom.value=='true'){
						if(
							(dom.getAttribute('hard') == 'true' && puncList.value == '')
							||
							(dom.getAttribute('replace') == 'true' && puncList.value == '')
						){
							 return 
						}
						puncList.disabled = false
						replaceList.disabled = false
						str = autoSpace.puncBye(str, puncList.value, replaceList.value) // str, list
				 }
			})

			radioInsert.forEach(dom=>{
				 if(dom.checked && dom.value=='false')
				 return // 不处理
				 if(dom.checked && dom.value=='true')
				 str = autoSpace.insert(str, insert.value, min.value, max.value) // str, insert, min, max
			})

			withSpace.value = str

			/* localStorage 保存离线数据 */ /* 控制台输入 localStorage.clear() 可清空复原 */
			localStorage.setItem('nospace', noSpace.value)
			radioInsert.forEach(dom=>{
				 if(dom.checked){
						localStorage.setItem('insertChecked', dom.id)
				 }
			})
			localStorage.setItem('insertMin', min.value)
			localStorage.setItem('insertMax', max.value)
			localStorage.setItem('insertInsert', insert.value)
			// console.log( localStorage )
	 })
})


/* utils 按钮功能 2019-04-02新需求 */
//  获取按钮
const btn1 = document.querySelector('#utils-1')
const clipboard = new ClipboardJS('.btn')

btn1.addEventListener('click',()=>{
	const str = withSpace.value
	const toArr = str.split('\n')
	const newStr = toArr.map((val,index)=>{
		return autoSpace.checkEnNum(val) ? val : null
	}).join('\n')
	confirm( newStr+'\n\n是否要复制结果？' ) && btn1.setAttribute('data-clipboard-text',newStr)
})