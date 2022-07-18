

if(localStorage.getItem('loginStatus') == "True"){
    location.assign('orders.html')
}
else{
    const userName  = document.getElementById('userName')
    const passWord  = document.getElementById('passWord')
    const LoginBtn = document.getElementById('LoginBtn')
    
    LoginBtn.addEventListener('click',(e)=>{
        console.log('working')
        e.preventDefault()
        if((userName.value).length > 0 && (passWord.value).length > 0){
            if(userName.value == passWord.value){
                 alert('Login Successful')
                 localStorage.setItem('loginStatus',"True")
                     location.assign('orders.html')    
            }else{
                alert('Username and password Should be same')
            }
        }else{
            alert('Please enter valid credentials!')
        }
    })
}

