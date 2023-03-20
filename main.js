var myform=document.getElementById('booking_form');
myform.addEventListener('submit',add_data);

function add_data(e)
{
    e.preventDefault();
    var name=document.getElementById('name').value;
    var  email=document.getElementById('email').value;
    var phone_no=document.getElementById('phone_no').value;
    var str=name+" - "+email+" - "+phone_no;

    //creating li attribute
    var data=document.getElementById('users');
    var li=document.createElement('li');
    li.appendChild(document.createTextNode(str));
    data.appendChild(li);

    //adding data as an object to local storage

    const user_obj={
        name: name,
        email: email,
        phone_no: phone_no
    };

    var obj_serialized=JSON.stringify(user_obj);
    localStorage.setItem(email,obj_serialized);

}