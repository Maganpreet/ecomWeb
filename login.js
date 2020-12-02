var flag1=0;
var flag2=0;
var pcount = 0;
var accounts = [];
var adminCODE = "XXX";

function storeAccounts(){
    localStorage.accounts = JSON.stringify(accounts);
}

function getStoredAccounts(){
    if(!localStorage.accounts){
        localStorage.accounts = JSON.stringify(accounts);
    }
    return JSON.parse(localStorage.accounts);
    
}
accounts = getStoredAccounts();
pcount = accounts.length;
alert(pcount);

window.addEventListener("load",function(){
    var head = document.createElement("h1");
    var text = document.createTextNode("ShopAway");
    head.appendChild(text);
    document.getElementById("heading").appendChild(head);
});

function removeForm(remDiv){
        while(remDiv.children[0]){
            remDiv.removeChild(remDiv.childNodes[0]);
        }
}

function code(){
    var admin = document.getElementById("admin");
    if(admin.checked == true){
        document.getElementById('cd').style.display = 'block';
    }
    else{
        document.getElementById('cd').style.display = 'none';
    }
}

function makeCodeForm(){
    var input = document.createElement("INPUT");
    input.setAttribute("placeholder","CODE>>>");
    input.setAttribute("id","cd");
    input.style.display = 'none';
    return input;
}

function makeSignForm(arr){
    if(flag2 == 1){
        var a = document.getElementById("login");
        removeForm(a);
        flag2 = 0;
    }
    var div = document.createElement("div");
    div.setAttribute("class","sign");
    for(var i=0;i<arr.length;i++){
        var p2 = document.createElement("p");  
        var text2 = document.createTextNode("*FILL THE FIELD");        
        p2.appendChild(text2);
        p2.setAttribute("class","message");
        //p2.setAttribute("id",msg[i]);
        p2.style.display = "none";        
        var textin = document.createElement("INPUT");
        textin.setAttribute("type","text");
        textin.setAttribute("placeholder",arr[i]);
        textin.setAttribute("class","input");     
        div.appendChild(p2); 
        div.appendChild(textin);        
    }
    var subDiv = document.createElement("div");
    var check1 = document.createElement("input");
    var p = document.createElement("p");
    var text = document.createTextNode("Admin");
    p.appendChild(text);
    var co = makeCodeForm();
    check1.setAttribute("type","checkbox");
    check1.setAttribute("id","admin");
    check1.addEventListener("click",code);
    subDiv.appendChild(check1);
    subDiv.appendChild(p);
    subDiv.appendChild(co);
    var signup = document.createElement("BUTTON");
    var text = document.createTextNode("Sign Up");
    signup.appendChild(text);
    signup.addEventListener("click",collectData);
    div.appendChild(subDiv);
    div.appendChild(signup);
    document.getElementById("signup").appendChild(div);
    flag1=1;
}

function makeLogForm(arr){
    if(flag1 == 1){
        var a = document.getElementById("signup");
        removeForm(a);
        flag1 = 0;
    }
    var div = document.createElement("div");
    div.setAttribute("class","sign");
    for(var i=0;i<arr.length;i++){
        var p2 = document.createElement("p");  
        var text2 = document.createTextNode("*FILL THE FIELD");        
        p2.appendChild(text2);
        p2.setAttribute("class","message");
        p2.style.display = "none";        
        var textin = document.createElement("INPUT");
        textin.setAttribute("type","text");
        textin.setAttribute("placeholder",arr[i]);
        textin.setAttribute("class","input");
        div.appendChild(p2);
        div.appendChild(textin); 
    }
    var login = document.createElement("BUTTON");
    var text = document.createTextNode("Login");
    login.appendChild(text);
    login.addEventListener("click",checkData);
    div.appendChild(login);
    document.getElementById("login").appendChild(div);
    flag2=1;
}

function validate(data,mes){
    var d = [],j=0;
    for(var i=0;i<data.length;i++){
        
        if((data[i].value) == ""){
            //alert(data[i].value);
            mes[i].style.display = "block";
        }else{
            d[j++] = data[i].value;
            mes[i].style.display = "none";
        }
    }
    return d;
}

function validateCode(cd){
    if(cd == adminCODE){
        return true;
    }else return false;
}

function validateEmail(email){
    alert(accounts.length);
    for(var i=0;i<accounts.length;i++){
        alert(accounts[i].email);
        if(accounts[i].email == email)
            return i;
    }
    return -1;
}

function validatePass(pass,e){
    if(e==-1){
        for(var i=0;i<accounts.length;i++){
            //alert(accounts[i].email);
            if(accounts[i].password == pass)
                return 1;
        }
        return 0;
    }
    else{
        if(accounts[e].password == pass)
            return 1;
        return 0;
    }
}

function checkData(){
    var data = document.getElementsByClassName("input");
    var mes = document.getElementsByClassName("message");
    var d = validate(data,mes);
    if(d.length == 2){
        var e = validateEmail(d[0]);
        if(e!=-1){
            if(validatePass(d[1],e))
                alert("HAVE A GOOD SHOP");
            else alert("WRONG PASSWORD");
        }
        else if(validatePass(d[1],e))
            alert("WRONG EMAIL");
        else
            alert("ACCOUNT DOESN\'T EXIST");
    }
}

function accountCreation(flag,list){
    if(flag){
        accounts[pcount++] = list;
        storeAccounts();
        return "ACCOUNT CREATED PLEASE LOGIN";
    }
    else return "TRY AGAIN";
}

function collectData(){
    var data = document.getElementsByClassName("input");
    var mes = document.getElementsByClassName("message");
    var d = validate(data,mes);
    var admin = document.getElementById("admin");
    var user,list,notmade=1;
    alert(d.length);
    if(d.length == 3){        
        if(admin.checked == true){
            user = "admin";
            if(!validateCode(document.getElementById("cd").value)){
                alert("YOUR CODE IS WRONG");
                notmade = 0;
            }else{
                list = new accountList(user,d[0],d[1],d[2]);
            }
        }
        else{
            user = "customer";
            list = new accountList(user,d[0],d[1],d[2]);
        }
    }
    alert(accountCreation(notmade,list));
}

var accountList = function(type,name,email,password){
    this.type = type;
    this.name = name;
    this.email = email;
    this.password = password;
}

document.getElementById("logB").addEventListener("click",function(){
    var attr = ["Email","Password"];
    if(flag2==0)
        makeLogForm(attr);
});

document.getElementById("signB").addEventListener("click",function(){
    var attr = ["Name","Email","Password"];
    if(flag1==0)
        makeSignForm(attr);
});