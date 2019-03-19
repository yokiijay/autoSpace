function AutoSpace() {
    let unicode = []
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

    var unicode_set = function(set) {
        var join = (set.match(/[hanzi|latin]/)) ? true : false;
        var result = (join) ? unicode[set].join('|') : unicode[set];
        return result;
    };

    this.spacing = (str,min,max,insert)=>{
        let hanzi = unicode_set('hanzi');
        let latin = unicode_set('latin') + '|' + unicode['punc'][0];
        let punc = unicode['punc'];
        let patterns = ['/(' + hanzi + ')(' + latin + '|' + punc[1] + ')/ig', '/(' + latin + '|' + punc[2] + ')(' + hanzi + ')/ig'];
        let text = ''

        const wrapStr = str.replace(/\n/g,'@wrap@')
        let arrStr = wrapStr.split(/@wrap@/g)
        let newStr = arrStr.map((val,index)=>{
            console.log(val.length)
            if(val.gblen() > min*2 && val.gblen() < max*2){
                const strIndex = Math.round(val.length/2)
                const newStr = val.substring(0,strIndex)+`${insert=insert?insert:'\#\#'}`+val.substring(strIndex)
                return newStr
            }else{
                return val
            }
        }).join('\n')
        
        patterns.forEach(function(exp) {
            newStr = newStr.replace(eval(exp), '$1 $2');
        },
        this);
        return newStr
    }
}

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
