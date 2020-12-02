var objCounter = 0;
var prodObj = [];
var flag = 0;
var editId;
var editLock = 0;

var form = ["Name:","Desc:","Price:","Quantity:"];
var id = ["t1","t2","t3","t4"];
var msg = ["m1","m2","m3","m4"];
var divId = ["d1","d2","d3","d4"];

//localStorage.setItem("counter",0);
objCounter = localStorage.getItem("counter");
prodObj = getStoredProducts();
addSearch();
makeList();
function makeList(){
    objCounter=0;
    for(var i=0;i<prodObj.length;i++){
        removeEdit(prodObj[i].name,prodObj[i].desc,prodObj[i].price,prodObj[i].qty);
    }
}

function addSearch(){
    var searchBox = document.createElement("INPUT");
    searchBox.setAttribute("id","search");
    searchBox.setAttribute("placeholder","Search...");
    document.getElementById("list").appendChild(searchBox);
    searchBox.addEventListener("keyup",searchElement);
}

function searchElement(){
    var searchVal = document.getElementById("search").value;
    var greatParent = document.getElementById("list");
    if(searchVal==""){
        for(var i=2;i<=objCounter+1;i++){
            greatParent.childNodes[i].style.display="block";
        }
    }
    //var listVal = 
    for(var i=2;i<=objCounter+1;i++){
        if(greatParent.childNodes[i].childNodes[0].innerText.startsWith(searchVal)){
            greatParent.childNodes[i].style.display="block";
        }
        else{
            greatParent.childNodes[i].style.display="none";
        }
    }
}


function storeProducts(){
    localStorage.prodObj = JSON.stringify(prodObj);
}

function getStoredProducts(){
    if(!localStorage.prodObj){
        localStorage.prodObj = JSON.stringify(prodObj);
    }
    return JSON.parse(localStorage.prodObj);
    
}


    
document.getElementById("add").addEventListener("click",showForm);

function removeForm(){
       var remDiv = document.getElementById("appd");
        while(remDiv.children[0]){
            remDiv.removeChild(remDiv.childNodes[0]);
        }
}

function remove(event){
        var index = event.target.id;
        prodObj.splice(parseInt(index),1);
        objCounter--;
        storeProducts();
        localStorage.setItem("counter",objCounter);
        event.target.parentElement.parentElement.removeChild(event.target.parentElement);
        //document.write("df");
        var dex=parseInt(index);
        //alert("sdf");
        //document.write(dex+1+" "+objCounter);
        for(var i=(dex+1);i<=objCounter;i++){
            var id2Edit = parseInt(document.getElementById(i).id)-1;
            document.getElementById(i).id = id2Edit;
            document.getElementById("ed"+i).id = "ed"+id2Edit;
        }
        
}

function change(event){
    flag=1;
    editId = event.target.id;
    //document.write(editId+" "+objCounter);
    showForm();
}  
   
/*REMOVEEDIT - THIS WILL CREATE A LIST FOR DISPLAYING AND ADD REMOVE AND EDIT BUTTONS TO IT */
function removeEdit(name,desc,price,qty){     

    var dataArr = [name,desc,price,qty];
    var li,data;
    var ol = document.createElement("ol");
    //alert(objCounter);
    var edit = document.createElement("BUTTON");
    var edname = document.createTextNode("Edit");
    edit.appendChild(edname);
    edit.setAttribute("id","ed"+objCounter);
    edit.addEventListener("click",change);

    var delt = document.createElement("BUTTON");
    var deltName = document.createTextNode("Remove");
    delt.appendChild(deltName);
    delt.setAttribute("id",objCounter);
    delt.addEventListener("click",remove);

    for(var i=0;i<dataArr.length;i++){
        li = document.createElement("li");
        data = document.createTextNode(dataArr[i]);
        li.appendChild(data);
        ol.appendChild(li);
    }
    ol.appendChild(delt);
    ol.appendChild(edit);
    document.getElementById("list").appendChild(ol);
    objCounter++;
}

/* THIS IS THE OBJECT WHICH ASSIGN THE VALUES OF PROPERTY TO THEM */
var createList = function(name,desc,price,qty){
        var data;
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.qty = qty;
        this.getData = function(){
            data = this.name+" | "+this.desc+" | "+this.price+" | "+this.qty;
            return data;
        };
        this.getName = function(){
            return this.name;
        };
        this.getDesc = function(){
            return this.desc;
        };
        this.getPrice = function(){
            return this.price;
        };
        this.getQty = function(){
            return this.qty;
        };
        //document.getElementById("n").innerHTML = this.name;
};

 /* IT JUST THE MAKE THE ONE TEXTAREA FOR THE DESCRIPTION OF THE PRODUCTS*/   
function makeFormTextbox(i){
    
                var div = document.createElement("div");
                div.setAttribute("id",divId[i]);        
                //document.write(0);     
                var p1 = document.createElement("p");  
                var text1 = document.createTextNode(form[i]);        
                p1.appendChild(text1);
                var p2 = document.createElement("p");  
                var text2 = document.createTextNode("*FILL THE FIELD");        
                p2.appendChild(text2);
                p2.setAttribute("id",msg[i]);
                p2.style.visibility = "hidden";        
                var textin = document.createElement("TEXTAREA");
                textin.setAttribute("type","text");
                textin.setAttribute("id",id[i]);
                //document.body.appendChild(textin);
                div.appendChild(p1);
                div.appendChild(textin);
                div.appendChild(p2);
                document.getElementById("appd").appendChild(div);
}

/* IT MAKES THE REST OF THE TEXTBOX REQUIRED AND ALSO THE RESPECTIVE DIV WORKS*/
function makeFormInput(i){
                var div = document.createElement("div");
                div.setAttribute("id",divId[i]);
                var p1 = document.createElement("p");  
                var text1 = document.createTextNode(form[i]);        
                p1.appendChild(text1);
                var p2 = document.createElement("p");  
                var text2 = document.createTextNode("*FILL THE FIELD");        
                p2.appendChild(text2);
                p2.setAttribute("id",msg[i]);
                p2.style.visibility = "hidden";        
                var textin = document.createElement("INPUT");
                textin.setAttribute("type","text");
                textin.setAttribute("id",id[i]);
                //document.body.appendChild(textin);
                div.appendChild(p1);
                div.appendChild(textin);
                div.appendChild(p2);
                document.getElementById("appd").appendChild(div);
}
         
    
    

function showForm(){    
    
    document.getElementById("heading").style.visibility = "hidden";
      
    for(var i=0;i<form.length;i++){ 
        //document.write(i);
        if(form[i]=="Desc:"){ 
            
            makeFormTextbox(i);            
        }
        else{
            makeFormInput(i);
        }  
        
    }
    
    if(flag==0){
        var lastD = document.createElement("div");
        var butt1 = document.createElement("BUTTON");
        var butt2 = document.createElement("BUTTON");
        var butName1 = document.createTextNode("Submit");
        var butName2 = document.createTextNode("Cancel");
        butt1.appendChild(butName1);
        butt2.appendChild(butName2);
        butt1.setAttribute("id","b1");
        butt2.setAttribute("id","b2");
        lastD.appendChild(butt1);
        lastD.appendChild(butt2);
        document.getElementById("appd").appendChild(lastD);
        butt1.addEventListener("click",check);
        butt2.addEventListener("click",empty);
    }
    else if(flag==1){

        var lastD = document.createElement("div");
        var butt1 = document.createElement("BUTTON");
        var butt2 = document.createElement("BUTTON");
        var butName1 = document.createTextNode("Update");
        var butName2 = document.createTextNode("Cancel");
        butt1.appendChild(butName1);
        butt2.appendChild(butName2);
        butt1.setAttribute("id","b1");
        butt2.setAttribute("id","b2");
        lastD.appendChild(butt1);
        lastD.appendChild(butt2);
        document.getElementById("appd").appendChild(lastD);
        butt1.addEventListener("click",update);
        butt2.addEventListener("click",empty);
        flag=0;

        var listVal=document.getElementById(editId).parentElement;
        //document.write(listVal);
        for(var i=0;i<4;i++){
            document.getElementById(id[i]).value = listVal.childNodes[i].textContent;
        }
    }

    function update(event){
        var list,data;
        var val = [];
        
        var all_val=0;
        var li,div;
        for(var i=0;i<4;i++){
            var c = document.getElementById(id[i]).value;
            if(c==""){
                document.getElementById(msg[i]).style.visibility = "inherit";
            }
            else{
                all_val++;
                val[i] = c;
                //document.getElementById(id[i]).value="";
                document.getElementById(msg[i]).style.visibility = "hidden";
            }
        }
        if(all_val==4){
            var i=0;
            for(var i=0;i<prodObj.length;i++){
                if("ed"+i==editId) break;
            }
            //document.write(i);
            prodObj[i].name = val[0];
            prodObj[i].desc = val[1];
            prodObj[i].price = val[2];
            prodObj[i].qty = val[3];
            storeProducts();
            var listVal=document.getElementById("ed"+i).parentElement;
            for(var i=0;i<val.length;i++){
                listVal.childNodes[i].textContent = val[i];
            }
            removeForm();
            document.getElementById("heading").style.visibility = "inherit";
        }
    }

    
    function check(){
        var list,data;
        var val = [];
        
        var all_val=0;
        var li,div;
        for(var i=0;i<4;i++){
            var c = document.getElementById(id[i]).value;
            if(c==""){
                document.getElementById(msg[i]).style.visibility = "inherit";
            }
            else{
                all_val++;
                val[i] = c;
                document.getElementById(id[i]).value="";
                document.getElementById(msg[i]).style.visibility = "hidden";
            }
        }
        if(all_val==4){
            list = new createList(val[0],val[1],val[2],val[3]);
            prodObj[objCounter] = list;
            //document.write(prodObj[objCounter].name);
            storeProducts();
            removeEdit(list.getName(),list.getDesc(),list.getPrice(),list.getQty());
            localStorage.setItem("counter",objCounter);

            removeForm();
            document.getElementById("heading").style.visibility = "inherit";
      }
    
    }

    function empty(){
        for(var i=0;i<4;i++){
            document.getElementById(id[i]).value="";
            document.getElementById(msg[i]).style.visibility = "hidden";            
        }
        removeForm();
        document.getElementById("heading").style.visibility = "inherit";
    } 
    
}




/*
var delt = document.createElement("BUTTON");
            var rem = document.createTextNode("Remove");
            delt.appendChild(rem);
            delt.setAttribute("id",objCounter);            
            
            li = document.createElement("li");
            data = document.createTextNode(list.getData());
            li.appendChild(data);
            li.appendChild(delt);

            delt.addEventListener("click",remove);

            document.getElementById("prods").appendChild(li);

*/ 
