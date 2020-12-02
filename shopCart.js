var item = [];
var itemCounter=-1;


function getStoredProducts(){
    if(!localStorage.prodObj){
        localStorage.prodObj = JSON.stringify(prodObj);
    }
    return JSON.parse(localStorage.prodObj);    
}

function getItems(){
    if(!localStorage.item){
        localStorage.item = JSON.stringify(item);
    }
    return JSON.parse(localStorage.item);    
}
function storeItems(){
    localStorage.item = JSON.stringify(item);
}

item=getItems();


window.addEventListener("load",function heading(){
    var head = document.createElement("h1");
    var text = document.createTextNode("Shopping Cart");
    head.appendChild(text);
    document.getElementById("shoppingHead").appendChild(head);
});

window.addEventListener("load",function purHeading(){
    var pitemSeq = ["Your Item","Quantity","Amount"];
    var div = document.createElement("div");
    div.setAttribute("id","plistHead");
    var checkOut = document.createElement("BUTTON");
    var text = document.createTextNode("Check Out!");
    checkOut.setAttribute("id","checkOut");
    checkOut.appendChild(text);
    var purDiv = document.createElement("div");
    purDiv.setAttribute("id","purItemData");
    for(var i=0;i<pitemSeq.length;i++){
        var p = document.createElement("p");
        var text = document.createTextNode(pitemSeq[i]);
        p.setAttribute("class","pheadP");
        p.appendChild(text);
        div.appendChild(p);
    }
    document.getElementById("purchaseList").appendChild(div);
    document.getElementById("purchaseList").appendChild(purDiv);
    document.getElementById("purchaseList").appendChild(checkOut);
    
});


window.addEventListener("load",function takeDetails(){
    var div1 = document.createElement("div");
    var div2 = document.createElement("div");
    var div3 = document.createElement("div");
                var name = document.createElement('INPUT');
                name.setAttribute('class','buyer');
                name.setAttribute('id','buyerName');
                name.setAttribute('placeholder','Name');
                div1.appendChild(name);
                document.getElementById('takeDetails').appendChild(div1);
                var add = document.createElement('TEXTAREA');
                add.setAttribute('class','buyer');
                add.setAttribute('id','buyerAdd');
                add.setAttribute('placeholder','Address..');
                div2.appendChild(add);
                document.getElementById('takeDetails').appendChild(div2);
                var sub = document.createElement('BUTTON');
                var text = document.createTextNode('Submit');
                sub.addEventListener('click',makeBill);
                sub.appendChild(text);
                sub.setAttribute('class','buyer');
                sub.setAttribute('id','buyerSub');
                div3.appendChild(sub);
                document.getElementById('takeDetails').appendChild(div3);
});

var createOrderObject = function(name,add){
    this.name = name;
    this.add = add;
    this.getBName = function(){
        return this.name;
    }
    this.getBAdd = function(){
        return this.add;
    }
}

function makeBill(){
    var name = document.getElementById("buyerName").value;
    var add = document.getElementById("buyerAdd").value;
    order = new createOrderObject(name,add);
    
}


window.addEventListener("load",function showData(){
    //alert("dfd");
    var itemSeq = ["Name","Desc","Price","Quantity"];
    var div = document.createElement("div");
    div.setAttribute("id","listHead");
    for(var i=0;i<itemSeq.length;i++){
        var p = document.createElement("p");
        var text = document.createTextNode(itemSeq[i]);
        p.setAttribute("class","headP");
        p.appendChild(text);
        div.appendChild(p);
    }
    document.getElementById("itemList").appendChild(div);
    createItemList();
    getItemsList();
});

function getItemsList(){
    for(var i=0;i<item.length;i++){
        var strl = item[i].id.length;
        var generalId = item[i].id.substring(3,strl);
        makeCartList(item[i],generalId,item[i].id);
        document.getElementById("item"+generalId).innerHTML = "Added!!!";
        document.getElementById("q"+generalId).innerHTML = item[i].qty;
    }
}

$(document).ready(function(){
    $('#checkOut').fadeIn('slow');
    $('#checkOut').click(function(){
        if(document.getElementById('purItemData').childNodes.length!=0){
            $('#checkOut').animate({opacity:'1.0'});
            $('#takeDetails').slideDown('slow',function(){
                $('.buyer').fadeIn('slow');
            });
        }
        else{
            $('#checkOut').animate({opacity:'0.5'});
        }
    });
});



/*THIS IS THE PART WHERE WE MANAGE QUANTITY OF THE ITEM*/
/////////////////////////////////
function changeQtyText(event,signal){
    var id = event.target.id;
    var strl = id.length;
    var num = id.substring(1,strl); 
    //document.write(num);
    if(!(signal)){
        var butval = document.getElementById("q"+num).innerText;
        var changedVal = parseInt(butval) + 1;
        document.getElementById("q"+num).innerHTML = changedVal;
    }
    else{
        var butval = document.getElementById("q"+num).innerText;
        if(parseInt(butval)==0){
            alert("cant do that!!");
        }
        else{
            var changedVal = parseInt(butval) - 1;
            document.getElementById("q"+num).innerHTML = changedVal;
        }
    }
}
function subtractVal(event){
 var flag = true;
 changeQtyText(event,flag);
}
function addVal(event){
 var flag=false;
 changeQtyText(event,flag);
}
///////////////////////////////// 


/*THIS FUNCTION FOR CREATING AN OBJECT*/
////////////////////////////////
var createItemObject = function(gid,name,qty,price){
    this.id = gid;
    this.name = name;
    this.qty = qty;
    this.price = price;
    this.getId = function(){
        return this.id;
    }
    this.getName = function(){
        return this.name;
    }
    this.getQty = function(){
        return this.qty;
    }
    this.getPrice = function(){
        return this.price;
    }
};
///////////////////////////////


/*THIS FUNCTION REMOVE THE LIST FROM THE CART*/
////////////////////////////////
function dontWannaBuy(event){
    var remId = event.target.id;
    //alert(remId);
    event.target.parentElement.parentElement.removeChild(event.target.parentElement);
    var itemId = "item" + remId.substring(3,remId.length);
    var itemAdd = document.getElementById(itemId);
    itemAdd.innerHTML = "Add Item To Cart";
    storeItems();
    //if(event.target.parentElement.parentElement.childNodes)
    
    
}
////////////////////////////////



function makeCartList(iObject,generalId,uListId){
    //var purchaseList = document.getElementById("purItemData");
        var div = document.createElement("div");
        div.setAttribute("class","pdivs");

        var ul = document.createElement("ul");
        ul.setAttribute("id",uListId);
        ul.setAttribute("class","pulists");

        var remove = document.createElement("BUTTON");
        var text = document.createTextNode("Remove");
        remove.appendChild(text);
        remove.addEventListener("click",dontWannaBuy);
        remove.setAttribute("id","rem"+generalId);
        remove.setAttribute("class","rembutt");
        
        

        var info1 = document.createElement("li");    var text1 = document.createTextNode(iObject.name); info1.appendChild(text1); ///Items that have been purcahsed
        var info2 = document.createElement("li");    var text2 = document.createTextNode(iObject.qty);      info2.appendChild(text2); /// by a user.
        var info3 = document.createElement("li");    var text3 = document.createTextNode(iObject.price);   info3.appendChild(text3);
        info1.setAttribute("class","vals3");
        info2.setAttribute("class","vals3");
        info3.setAttribute("class","vals3");

        ul.appendChild(info1);
        ul.appendChild(info2);
        ul.appendChild(info3);
        div.appendChild(ul);
        div.appendChild(remove);
        document.getElementById("purItemData").appendChild(div);

        itemCounter++;
    
    
}


/*THIS FUNCTION WOULD ADD ITEM TO THE CART AND GENERATE THE BILL*/
////////////////////////////////
function addItemToCart(event){
    
        var itemId = event.target.id; //add to cart button id
        var itemAdd = document.getElementById(itemId);
        
        var generalId = itemId.substring(4,itemId.length); // it is the id that is being used for the quantity button,purchase item divs
        var qtyid = "q"+generalId; // id of the quantity
        

        var itemname = itemAdd.parentNode.childNodes[0].childNodes[0].innerText; // the name of the item booked
        var qty = document.getElementById(qtyid).innerText; // the number of item buyer is buying
        var itemprice = itemAdd.parentNode.childNodes[0].childNodes[2].innerText;
        var itemsP = "$"+parseInt(qty)*parseInt(itemprice.substring(1,itemprice.length)); // combined price of the item

        var uListId = "pul"+generalId;
        var iObject = new createItemObject(uListId,itemname,qty,itemsP);

        makeCartList(iObject,generalId,uListId);
        alert(iObject.name);
    if(itemAdd.innerHTML!='Added!!!'){ 
        alert(iObject.name);       
        item[itemCounter] = iObject;    

        itemAdd.innerHTML = 'Added!!!';        
    }
    else{
        for(var i=0;i<item.length;i++){
            if(item[i].id=="pul"+generalId){
                item[i].qty = qty;
                item[i].price = itemsP;
            }
        }

        var pul = document.getElementById("pul"+generalId);
        var a = [itemname,qty,itemsP]
        for(var i=0;i<3;i++){
            pul.childNodes[i].innerHTML = a[i];
        }
    }
    storeItems();
}

////////////////////////////////

/*THE FUNCTION THAT CREATES LIST AT THE LOADING OF THE PAGE FROM THE LOCAL STORAGE*/
////////////////////////////////////////////////////////
function createItemList(){
    var l=3,j;
    var items = getStoredProducts();
    for(var i=0;i<items.length;i++){
        j=1;
        var div = document.createElement("div");
        div.setAttribute("class","listDivs");

        var ul = document.createElement("ul");
        ul.setAttribute("id","ul"+i);
        ul.setAttribute("class","ulists");

        var butsub  = document.createElement("BUTTON");
        var butsubText = document.createTextNode("-");
        butsub.appendChild(butsubText);
        butsub.addEventListener("click",subtractVal);
        butsub.setAttribute("id","b"+i);
        butsub.setAttribute("class","butts");

        var qtyValButt = document.createElement("BUTTON");
        var qtyValButtText = document.createTextNode("0");
        qtyValButt.appendChild(qtyValButtText);
        qtyValButt.setAttribute("id","q"+i);
        qtyValButt.setAttribute("class","butts");

        var butadd  = document.createElement("BUTTON");
        var butaddText = document.createTextNode("+");
        butadd.appendChild(butaddText);
        butadd.addEventListener("click",addVal);
        butadd.setAttribute("id","b"+i);
        butadd.setAttribute("class","butts");

        var itemAdd = document.createElement("BUTTON");
        var itemAddText = document.createTextNode("Add Item To Cart");
        itemAdd.appendChild(itemAddText);
        itemAdd.addEventListener("click",addItemToCart);
        itemAdd.setAttribute("id","item"+i);
        itemAdd.setAttribute("class","butts");
        
        for(var prop in items[i]){
            var li = document.createElement("li");
            li.setAttribute("class","litem")
            var text = document.createTextNode(items[i][prop]);
            li.appendChild(text);
            ul.appendChild(li);
            if(j==l)
                break;
            j++;
        }

        div.appendChild(ul);
        div.appendChild(butsub);
        div.appendChild(qtyValButt);
        div.appendChild(butadd);
        div.appendChild(itemAdd);
        document.getElementById("itemList").appendChild(div);
    }
}
///////////////////////////////////////////////////////////////////////



/*
else{
        for(var i=0;i<item.length;i++){
            if(item[i].id==uListId){
                item[i].qty = iObject.qty;
                item[i].price = iObject.price;
            }
        }

        var pul = document.getElementById(uListId);
        var a = [iObject.name,iObject.qty,iObject.price]
        for(var i=0;i<3;i++){
            pul.childNodes[i].innerHTML = a[i];
        }
    }
*/