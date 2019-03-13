//navigationBar
const menuids = ["suckertree1"]; //Enter id(s) of SuckerTree UL menus, separated by commas

function buildsubmenus() {
    for (var i = 0; i < menuids.length; i++) {
        var ultags = document.getElementById(menuids[i]).getElementsByTagName("ul")
        for (var t = 0; t < ultags.length; t++) {
            ultags[t].parentNode.getElementsByTagName("a")[0].className = "subfolderstyle"
            ultags[t].parentNode.onmouseover = function () {
                this.getElementsByTagName("ul")[0].style.display = "block"
            }
            ultags[t].parentNode.onmouseout = function () {
                this.getElementsByTagName("ul")[0].style.display = "none"
            }
        }
    }
}

if (window.addEventListener)
    window.addEventListener("load", buildsubmenus, false)
else if (window.attachEvent)
    window.attachEvent("onload", buildsubmenus)

//Slider
function newSlider() {
    var dl = document.getElementById("dd").getElementsByTagName("li");
    var il = document.getElementById("ii").getElementsByTagName("li");
    var dlen = dl.length;
    var timer = null, index = 0, autoTime = 3000;
    //timer定时器，index当前显示的是第几个，autotime自动切换时间

    dl[0].className = "on", il[0].className = "on";

    //切换函数
    function play(j) {
        index = j;
        stopAuto();//停止计时
        for (var i = 0; i < dlen; i++) {
            dl[i].className = "";
            il[i].className = "";

        }
        dl[j].className = "on";
        il[j].className = "on";
        startAuto();//重新开始计时
    }

    //mouseover表切换
    for (var i = 0; i < dlen; i++) {
        dl[i].onmouseover = function (j) {
            return function () {
                play(j);
            }
        }(i)
    }

    //click按钮切换
    for (var i = 0; i < dlen; i++) {
        il[i].onclick = function (j) {
            return function () {
                play(j);
            }
        }(i)
    }

    //自动切换开始
    function startAuto() {
        timer = setInterval(function () {
            index++;
            index = index > dlen - 1 ? 0 : index;
            play(index);

        }, autoTime);
    }

    //自动切换停止
    function stopAuto() {
        clearInterval(timer);
    }

    //启动自动切换
    startAuto()
}

window.onload = function () {
    newSlider();
}

function LoginShow(){
    document.getElementById('shade').classList.remove('hide');
    document.getElementById('login-modal').classList.remove('hide');
}
function LoginHide(){
    document.getElementById('shade').classList.add('hide');
    document.getElementById('login-modal').classList.add('hide');
}
function RegisterShow(){
    document.getElementById('shade').classList.remove('hide');
    document.getElementById('register-modal').classList.remove('hide');
}
function RegisterHide(){
    document.getElementById('shade').classList.add('hide');
    document.getElementById('register-modal').classList.add('hide');
}

var times = 0;
function colorChange(_this) {
    if(_this.onclick){
        times++;
        if(times % 2 == 0){
            _this.style.color = "black";
        }
        else{
            _this.style.color = "red";
        }
    }
}