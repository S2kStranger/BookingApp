var myform=document.getElementById('booking_form');
myform.addEventListener('submit',add_data);

function add_data(e)
{
    e.preventDefault();
    var name=document.getElementById('name');
    var  email=document.getElementById('email');
    var phone_no=document.getElementById('phone_no');
    var str=name.value+" - "+email.value+" - "+phone_no.value;

    const user_obj=new newUser(name.value,email.value,phone_no.value);

    var obj_serialized=JSON.stringify(user_obj);
    localStorage.setItem(user_obj.email,obj_serialized);

    name.value='';
    email.value='';
    phone_no.value='';
    //creating li attribute
    var data=document.getElementById('users');
    var li=document.createElement('li');
    li.appendChild(document.createTextNode(str));

    //create delete button
    var btn=document.createElement('button');
    btn.appendChild(document.createTextNode('Delete'));
    li.append(btn);
    btn.addEventListener('click',(e) =>
    {
        e.preventDefault();
        li.remove();
        localStorage.removeItem(user_obj.email);
    });

    //create edit button
    var editbtn=document.createElement('button');
    editbtn.appendChild(document.createTextNode('Edit'));
    li.append(editbtn);
    editbtn.addEventListener('click',(e)=>
    {
        e.preventDefault();
        li.remove();
        localStorage.removeItem(user_obj.email);
        name.value=user_obj.name;
        email.value=user_obj.email;
        phone_no.value=user_obj.phone_no;

    });


    data.appendChild(li);

    //adding data as an object to local storage

   /* const user_obj={
        name: name,
        email: email,
        phone_no: phone_no
    };
    */

    

}


function newUser(name,email,phone_no)
{
    this.name=name;
    this.email=email;
    this.phone_no=phone_no;
}