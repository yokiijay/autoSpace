function AutoSpace() {
    var unicode = []
    unicode['latin'] = ['[A-Za-z0-9\u00C0-\u00FF\u0100-\u017F\u0180-\u024F\u1E00-\u1EFF]'];
    unicode['punc'] = ['[@&=_\,\.\?\!\$\%\^\*\-\+\/]', '[\(\\[\'"<‘“]', '[\)\\]\'">”’]'];
    unicode['hanzi'] = ['[\u4E00-\u9FFF]', '[\u3400-\u4DB5\u9FA6-\u9FBB\uFA70-\uFAD9\u9FBC-\u9FC3\u3007\u3040-\u309E\u30A1-\u30FA\u30FD\u30FE\uFA0E-\uFA0F\uFA11\uFA13-\uFA14\uFA1F\uFA21\uFA23-\uFA24\uFA27-\uFA29]', '[\uD840-\uD868][\uDC00-\uDFFF]|\uD869[\uDC00-\uDEDF]', '\uD86D[\uDC00-\uDF3F]|[\uD86A-\uD86C][\uDC00-\uDFFF]|\uD869[\uDF00-\uDFFF]', '\uD86D[\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1F]', '[\u31C0-\u31E3]'];
    unicode['biaodian'] = ['[·・︰、，。：；？！—ー⋯…．·／]', '[「『（〔【《〈“‘]', '[」』）〕】》〉’”]'];
    unicode['zhuyin'] = [];
    unicode['zhuyin'][0] = '[\u3105-\u312D\u31A0-\u31BA]';
    unicode['zhuyin']['shengmu'] = '[\u3105-\u3119\u312A-\u312C\u31A0-\u31A3]';
    unicode['zhuyin']['jieyin'] = '[\u3127-\u3129]';
    unicode['zhuyin']['yunmu'] = '[\u311A-\u3126\u312D\u31A4-\u31B3\u31B8-\u31BA]';
    unicode['zhuyin']['yunjiao'] = '[\u31B4-\u31B7]';
    unicode['zhuyin']['diao'] = '[\u02D9\u02CA\u02C5\u02C7\u02CB\u02EA\u02EB]';
    unicode['shuzi'] = []
    unicode['shuzi']['quanjiao'] = '[\uff10-\uff19]'
    unicode['shuzi']['banjiao'] = '[\u0030-\u0039]'

    var unicode_set = function(set) {
        var join = (set.match(/[hanzi|latin]/)) ? true : false;
        var result = (join) ? unicode[set].join('|') : unicode[set];
        return result;
    }

    // space-god操作
    this.space = (str,oneSpace)=>{
        let hanzi = unicode_set('hanzi');
        let latin = unicode_set('latin') + '|' + unicode['punc'][0];
        let punc = unicode['punc'];
        let patterns = ['/(' + hanzi + ')(' + latin + '|' + punc[1] + ')/ig', '/(' + latin + '|' + punc[2] + ')(' + hanzi + ')/ig'];
    
        patterns.forEach(function(exp) {
            str = str.replace(eval(exp), '$1 $2');
        },
        this);

        str = oneSpace ? str.replace( /( )+/g,' ' ) : str

        return str
    }

    // 全角数字转半角
    this.numAngelTransfer = str=>{
        let quanNum = '０１２３４５６７８９'
        for(let i=0;i<10;i++){
            str = str.replace(new RegExp(quanNum.charAt(i),'g'),`${i.toString(16)}`)
        }
        return str
    }

    // 全角英文转半角
    this.enAngelTransfer = str=>{
        let quanEn = 'ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＷＺ'
        let banEn = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

        for(let i=0;i<quanEn.length;i++){
            str = str.replace(new RegExp(quanEn.charAt(i),'g'),banEn.charAt(i))
        }
        return str
    }

    // 去punc
    this.puncBye = (str, list)=>{
        let punc = /[@&=_\,\.\;\{\}~`\#\|\:?\!\%\^\*\-\+\/\(\['"<‘“\)\]\'">”’\\]/
        if(!list){
            str = str.replace( new RegExp(punc,'g'),'' )/* .replace( /( )+/g,' ' ) */
        }else{
            for(let i=0;i<list.length;i++){
                str = str.replace( new RegExp(`\\${list.charAt(i)}`,'g'),'' )/* .replace( /( )+/g,' ' ) */
            }
        }
        return str
    }

    // 获取punc
    this.puncDetect = (str)=>{
        let punc = /[@&=_\,\.\;\{\}~`\#\|\:?\!\%\^\*\-\+\/\(\['"<‘“\)\]\'">”’\\]/
        str = str.match( new RegExp(punc,'g') )
        str = str ? str.filter((val,index,arr)=>(
            arr.indexOf(val) === index
        )) : str
        str = str ? str.join('') : ''
        return str
    }

    // 去标点
    this.biaodianBye = (str, list, oneSpace)=>{
        let biaodian = /[·・︰、，。：；？！—ー⋯…．·／「『（〔【《〈“‘」』）〕】》〉’”]+/
        if(!list){
            str = str.replace( new RegExp(biaodian,'g'),' ' )
        }else{
            for(let i=0;i<list.length;i++){
                if(oneSpace && typeof oneSpace==='boolean'){
                    str = str.replace( new RegExp(`\\${list.charAt(i)}| +`,'g'),' ' )
                }else {
                    str = str.replace( new RegExp(`\\${list.charAt(i)}`,'g'),' ' )
                }
            }
        }
        return str
    }
    
    // 获取biaodian
    this.biaodianDetect = (str)=>{
        let biaodian = /[·・︰、，。：；？！—ー⋯…．·／「『（〔【《〈“‘」』）〕】》〉’”]/
        str = str.match( new RegExp(biaodian,'g') )
        str = str ? str.filter((val,index,arr)=>(
            arr.indexOf(val) === index
        )) : str
        str = str ? str.join('') : ''
        return str
    }

    // 插入insert 
        /* 
            1. 判断字数
            2. 字数>min 切割成两半 : 字数<min 不作处理
            3. 取右边那半 判断第一个单词是否是Latin (排除数字)
            4. 是Latin 第一个空格处插入insert字段 : 不是Latin 在开头插入insert字段
        */
    this.insert = (str,insert,min,max)=>{
        max = max || Number.POSITIVE_INFINITY
        insert = insert || ''
        const wrapStr = str.replace(/\n/g,'@wrap@')
        let arrStr = wrapStr.split(/@wrap@/g)
        str = arrStr.map((val,index)=>{
            if(val.gblen() > min*2 && val.gblen() < max*2){
                const strIndex = Math.round(val.length/2)
                let strLeft = val.substring(0,strIndex)
                let strRight = val.substring(strIndex)
                let newStr = ''

                const ifLetterFirst = new RegExp(`^${unicode['latin'][0]+'[^0-9]'}+`).test(strRight)
                || new RegExp( /^[@&=_\,\.\;\{\}~`\#\|\:?\!\%\^\*\-\+\/\(\['"<‘“\)\]\'">”’]/, 'g' ).test(strRight)
                || new RegExp( /[·・︰、，。：；？！—ー⋯…．·／「『（〔【《〈“‘」』）〕】》〉’”]+/, 'g' ).test(strRight)
                if(ifLetterFirst){
                    strRight = strRight.replace(/(\w+)?([@&=_\,\.\;\{\}~`\#\|\:?\!\%\^\*\-\+\/\(\['"<‘“\)\]\'">”’·・︰、，。：；？！—ー⋯…．·／「『（〔【《〈“‘」』）〕】》〉’”]?)/,`$1$2${insert} `)
                }else{
                    strRight = insert+strRight
                }
                newStr = strLeft+strRight
                return newStr
            }else{
                return val
            }
        }).join('\n')

        return str
    }

    // 计算字符个数 如 中文两个字符 英文一个
    String.prototype.gblen = function() {    
        var len = 0;    
        for (var i=0; i<this.length; i++) {    
            if (this.charCodeAt(i)>127 || this.charCodeAt(i)==94) {    
                 len += 2;    
             } else {    
                 len ++;    
             }    
         }    
        return len;    
    }
}







// var unicode = [];

// unicode['latin'] = ['[A-Za-z0-9\u00C0-\u00FF\u0100-\u017F\u0180-\u024F\u1E00-\u1EFF]'];
// unicode['punc'] = ['[@&=_\,\.\?\!\$\%\^\*\-\+\/]', '[\(\\[\'"<‘“]', '[\)\\]\'">”’]'];
// unicode['hanzi'] = ['[\u4E00-\u9FFF]', '[\u3400-\u4DB5\u9FA6-\u9FBB\uFA70-\uFAD9\u9FBC-\u9FC3\u3007\u3040-\u309E\u30A1-\u30FA\u30FD\u30FE\uFA0E-\uFA0F\uFA11\uFA13-\uFA14\uFA1F\uFA21\uFA23-\uFA24\uFA27-\uFA29]', '[\uD840-\uD868][\uDC00-\uDFFF]|\uD869[\uDC00-\uDEDF]', '\uD86D[\uDC00-\uDF3F]|[\uD86A-\uD86C][\uDC00-\uDFFF]|\uD869[\uDF00-\uDFFF]', '\uD86D[\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1F]', '[\u31C0-\u31E3]'];
// unicode['biaodian'] = ['[·・︰、，。：；？！—ー⋯…．·／]', '[「『（〔【《〈“‘]', '[」』）〕】》〉’”]'];
// unicode['zhuyin'] = [];
// unicode['zhuyin'][0] = '[\u3105-\u312D\u31A0-\u31BA]';
// unicode['zhuyin']['shengmu'] = '[\u3105-\u3119\u312A-\u312C\u31A0-\u31A3]';
// unicode['zhuyin']['jieyin'] = '[\u3127-\u3129]';
// unicode['zhuyin']['yunmu'] = '[\u311A-\u3126\u312D\u31A4-\u31B3\u31B8-\u31BA]';
// unicode['zhuyin']['yunjiao'] = '[\u31B4-\u31B7]';
// unicode['zhuyin']['diao'] = '[\u02D9\u02CA\u02C5\u02C7\u02CB\u02EA\u02EB]';

// var unicode_set = function(set) {
//     var join = (set.match(/[hanzi|latin]/)) ? true : false;
//     var result = (join) ? unicode[set].join('|') : unicode[set];
//     return result;
// };

// var text_replace = function() {
//     var hanzi = unicode_set('hanzi');
//     var latin = unicode_set('latin') + '|' + unicode['punc'][0];
//     var punc = unicode['punc'];
//     var patterns = ['/(' + hanzi + ')(' + latin + '|' + punc[1] + ')/ig', '/(' + latin + '|' + punc[2] + ')(' + hanzi + ')/ig'];

//     var dom1 = document.querySelector(".no-space");
//     var dom2 = document.querySelector(".with-space");
//     var text = dom1.value;

//     patterns.forEach(function(exp) {
//         text = text.replace(eval(exp), '$1 $2');
//     },
//     this);

//     dom2.value = text;
// };
