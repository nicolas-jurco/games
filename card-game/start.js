
document.body.style.cssText = "min-height: 100%;margin: 0;padding: 0;"

var target = document.getElementById("last-div")
var element = document.createElement('div')
element.style.background = "blue"
element.style.height = "200px"
element.style.width = "100px"
document.body.insertBefore(element, target)

document.body.onscroll = (event) => {
    //console.log(event)
    //console.log(document.body.scrollTop)
    var p = amountscrolled()
    element.style.position = "absolute"
    var scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop
    element.style.top = scrollTop + "px"
    element.style.transform = "rotate("+ p +"deg)"
}

function amountscrolled(){
    var winheight= window.innerHeight || (document.documentElement || document.body).clientHeight
    var docheight = getDocHeight()
    var scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop
    var trackLength = docheight - winheight
    var pctScrolled = Math.floor(scrollTop/trackLength * 100) // gets percentage scrolled (ie: 80 or NaN if tracklength == 0)
    console.log(pctScrolled + '% scrolled')
    return pctScrolled
}

function getDocHeight() {
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    )
}

//document.getElementById("car-selector").onclick = (event) => {
//    console.log(even);
//    changeSomeText("this is a new text after clicking the selector")
//}
