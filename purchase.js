var productContainer= document.getElementById("imagess")
var Search = document.getElementById("search")
var productlist = productContainer.querySelectorAll("div")
Search.addEventListener("keyup",function(){
    var enteredvalue = event.target.value.toUpperCase()

    for(count=0;count<productlist.length;count=count+1)
    {
        var productname= productlist[count].querySelector("p").textContent

        if(productname.toUpperCase().indexOf(enteredvalue)<0)
        {
            productlist[count].style.display="none"
        }
        else{
            productlist[count].style.display="block"
        }
    }
})