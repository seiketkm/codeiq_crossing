// node.js code
var start = new Date();
var fs = require('fs');

// 同期ファイル読み込み    
var file = fs.readFileSync('crossing.txt');
var input = file.toString().split(/\r?\n/);
var i;
for(i = 0; i< input.length; i+=1){
  input[i] = parseInt(input[i],10);
}
// 末尾の改行対応
if(isNaN(input[input.length-1])){
  input.length = input.length-1;
}
/* debug */
//var loaded = new Date();
//console.log((loaded - start)/1000 + " sec");
//console.log(input);
//console.log(input.length);

/* 交差点 */
var cross = 0;

// マージソートの実装
var msort = function(input){
  // マージソートを再帰的に実行
  if(input.length == 1){
    return input;
  }
  var mid = Math.ceil(input.length / 2);
  var left  = input.slice(0, mid);
  var right = input.slice(mid, input.length);
  left  = msort(left);
  right = msort(right);
  // マージソート実装
  var sorted = [];
  var idxL = 0, idxR = 0;
  while(true){
    if(left[idxL] < right[idxR]){
      sorted.push(left[idxL]);
      idxL+=1;
      if (left.length === idxL){
        break;
      }
    }
    else{
      // 交差点の数を加算
      cross += left.length - idxL;
      sorted.push(right[idxR]);
      idxR+=1;
      if (right.length === idxR){
        break;
      }
    }
  }
  sorted = sorted
    .concat(left.slice (idxL,left.length))
    .concat(right.slice(idxR,right.length));
  return sorted;
};
// マージソートを実行
output = msort(input);
//console.log(output);
console.log("Crossing " + cross);
var end = new Date();
console.log("Time " + (end - start) / 1000 + " sec");
