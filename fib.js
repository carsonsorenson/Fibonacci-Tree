document.title = 'Fibonacci';
var div = document.createElement('div');
div.setAttribute('class', 'red shadowed stuff-box');
document.querySelector('body').appendChild(div);
var form = document.createElement('form');
var slider = document.createElement('input')
var text = document.createElement('span');
var title = document.createElement('h2');
title.textContent="Fibonacci List";
text.setAttribute('class', 'large');
slider.type = 'range';
slider.min='0';
slider.max ='50';
slider.value='0';
text.textContent='Fib(' + parseInt(slider.value) + ')';
div.appendChild(title);
div.appendChild(form);
form.appendChild(text);
form.appendChild(slider);

var treeDiv = document.createElement('div');
treeDiv.setAttribute('class', 'black shadowed stuff-box');
document.querySelector('body').appendChild(treeDiv);
var treeForm = document.createElement('form');
var treeSlider = document.createElement('input');
var treeText = document.createElement('span');
var treeTitle = document.createElement('h2');
treeTitle.textContent='Fibonacci Tree';
treeText.setAttribute('class', 'large');
treeSlider.type = 'range';
treeSlider.min = '0';
treeSlider.max = '11';
treeSlider.value = '0';
treeText.textContent='Fib(' + parseInt(treeSlider.value) + ')';
treeDiv.appendChild(treeTitle);
treeDiv.appendChild(treeForm);
treeForm.appendChild(treeText);
treeForm.appendChild(treeSlider);

function fibList(val){
    var first = 0;
    var second = 1;
    var fibContainer = document.createElement('div');
    fibContainer.setAttribute('class', 'fib flex');
    fibContainer.setAttribute('id', 'list');
    if (val == 0){
        var fibNum = document.createElement('div');
        fibNum.textContent = '0';
        fibContainer.appendChild(fibNum);
    }
    else{
        for (var i = 0; i <= val; i++) {
            var fibNum = document.createElement('div');
            fibNum.setAttribute('class', 'fib-list');
            fibNum.textContent = first;
            fibContainer.appendChild(fibNum);
            var tmp = first + second;
            first = second;
            second = tmp;
        }
    }
    return {'val': fibContainer};
}

fibString = function(a, b){
    return 'Fib(' + a + ') = ' + b;
}

//fib = (fib - 1) + (fib - 2)
//fib - 1 = left node
//fib - 2 = right node
function fibTree(fibRecursion){
    var innerDiv = document.createElement('div');
    innerDiv.setAttribute('class', 'fib');
    innerDiv.setAttribute('id', 'tree');
    fibRecursion = parseInt(fibRecursion);
    var result = 0;
    //base cases if num == 0,1, or 2
    if (fibRecursion === 0){
        result = 0;
        var para = document.createElement('p');
        para.textContent = fibString(fibRecursion, result);
        innerDiv.appendChild(para);
    }
    else if (fibRecursion === 1){
        result = 1;
        var para = document.createElement('p');
        para.textContent = fibString(fibRecursion, result);
        innerDiv.appendChild(para);
    }
    else if (fibRecursion === 2){
        result = 1;
        var para = document.createElement('p');
        para.textContent = fibString(fibRecursion, result);
        var leftDiv = document.createElement('div');
        var leftDivContent = document.createElement('p');
        var rightDiv = document.createElement('div');
        var rightDivContent = document.createElement('p');
        leftDiv.setAttribute('class', 'fib fib-left');
        rightDiv.setAttribute('class', 'fib fib-right');
        leftDivContent.textContent = fibString(1, 1);
        rightDivContent.textContent = fibString(0, 0);
        leftDiv.appendChild(leftDivContent);
        rightDiv.appendChild(rightDivContent);
        innerDiv.appendChild(para);
        innerDiv.appendChild(leftDiv);
        innerDiv.appendChild(rightDiv);
    }
    else{
        var leftNode = fibTree(fibRecursion -1);
        leftNode.innerDiv_.setAttribute('class', 'fib fib-left');
        var rightNode = fibTree(fibRecursion-2);
        rightNode.innerDiv_.setAttribute('class', 'fib fib-right');
        var para = document.createElement('p');
        result = leftNode.result_ + rightNode.result_;
        para.textContent = fibString(fibRecursion, result);
        innerDiv.appendChild(para);
        innerDiv.appendChild(leftNode.innerDiv_);
        innerDiv.appendChild(rightNode.innerDiv_);
    }
    return {'result_':result, 'innerDiv_':innerDiv};
}

slider.onchange = function(){
    var value = slider.value;
    var existingList = div.querySelector('div#list');
    if (existingList){
        div.removeChild(existingList);
    }
    text.textContent="Fib("+ value + ')';
    var list = fibList(value);
    div.appendChild(list.val);
}

treeSlider.onchange = function(){
    var value = treeSlider.value;
    var existingTree = treeDiv.querySelector('div#tree');
    if (existingTree){
        treeDiv.removeChild(existingTree);
    }
    treeText.textContent="Fib("+ value + ')';
    var newFibTree = fibTree(value);
    treeDiv.appendChild(newFibTree.innerDiv_);
}