const strFormat = function(str,args) {
    // console.log('debugstr,typeof str',typeof str)
    if (typeof str == 'object') {
        str = str.props.children;
        // console.log('debugstr,str',str)
    }
    var keys = Object.keys(args);
    keys.forEach(one=>{
        // console.log('debugstr,正在替换字符串预计替换',str,one,args[one])
        str = str.toString().replace(new RegExp("\\{" + one + "\\}", "g"), args[one]);
    })
    return str;
}

function generateToken(length){
    //edit the token allowed characters
    var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    var b = [];  
    for (var i=0; i<length; i++) {
        var j = (Math.random() * (a.length-1)).toFixed(0);
        b[i] = a[j];
    }
    return b.join("");
}

function getGuild(client,guild_id) {
    let guild;
    client.guilds.cache.map(one=>{
        if (one.id == guild_id) {
            guild = one;
        }
    });
    return guild;
}

const autoDecimal = function(num) {
    num = Number(num);
    let foramt_num;

    let num_abs = Math.abs(num);
    if (num_abs > 10000) {
        foramt_num = parseInt(num);
    }else if (num_abs > 1) {
        // console.log('debug02,2位小数',num);
        foramt_num = num.toFixed(2);
    }else if(num_abs > 0.001) {
        foramt_num = num.toFixed(4);
    }else if(num_abs > 0.000001) {
        // console.log('debug02,8位小数',num);
        foramt_num = num.toFixed(8);
    }else if(num_abs > 0.0000000001) {
        // console.log('debug02,8位小数',num);
        foramt_num = num.toFixed(12);
    }else if(num_abs > 0.00000000000001) {
        // console.log('debug02,8位小数',num);
        foramt_num = num.toFixed(16);
    }else {
        // console.log('debug02,似乎超出了预期的小数',num);
        foramt_num = toNonExponential(num);
    }

    return foramt_num;
    // return parseFloat(foramt_num);
}


module.exports = {
    "strFormat" : strFormat,
    "generateToken" : generateToken,
    "getGuild"      : getGuild,
    "autoDecimal"   : autoDecimal
}