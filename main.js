var myform=document.getElementById('booking_form');
myform.addEventListener('submit',add_data);

axios.get("https://crudcrud.com/api/4d2fe7a4e6f741699d45f3cabf86c4f1/AppointmentApp")
    .then((response) => {
        for(var i=0;i<response.data.length;i++)
        {
            showOnScreen(response.data[i]);
        }
    })
    .catch((err) => alert(err));

    var nam=document.getElementById('name');
    var  email=document.getElementById('email');
    var phone_no=document.getElementById('phone_no');

function add_data(e)
{
    e.preventDefault();
    console.log(e);
    const user_obj=new newUser(nam.value,email.value,phone_no.value);
    axios.post("https://crudcrud.com/api/4d2fe7a4e6f741699d45f3cabf86c4f1/AppointmentApp",user_obj)
        .then((response) => {
            showOnScreen(response.data)
        })
        .catch((err) => {
            alert(err)
        })
    // var obj_serialized=JSON.stringify(user_obj);
    // localStorage.setItem(user_obj.email,obj_serialized);

    nam.value='';
    email.value='';
    phone_no.value='';

    //showOnScreen(user_obj,str);
        //adding data as an object to local storage

   /* const user_obj={
        name: name,
        email: email,
        phone_no: phone_no
    };
    */

}

//Function of update button
function updateDetails(user_obj)
{
    var btnUpdate=document.getElementById("update");
    btnUpdate.addEventListener('click',(e) => {
    user_obj.name=nam.value;
    user_obj.email=email.value;
    user_obj.phone_no=phone_no.value;
    axios.put(`https://crudcrud.com/api/4d2fe7a4e6f741699d45f3cabf86c4f1/AppointmentApp/${user_obj._id}`,user_obj)
        .then((response) => showOnScreen(response.data))
        .catch((err) => alert(err));
})
}


function newUser(name,email,phone_no)
{
    this.name=name;
    this.email=email;
    this.phone_no=phone_no;
}

function showOnScreen(user_obj)
{

    var str=user_obj.name+" - "+user_obj.email+" - "+user_obj.phone_no;
    //creating li attribute
    var data=document.getElementById('users');
    var li=document.createElement('li');
    li.appendChild(document.createTextNode(str));

    //create delete button
    var btn=document.createElement('button');
    btn.appendChild(document.createTextNode('Delete'));
    li.append(btn);

    //added delete request
    btn.addEventListener('click',(e) =>
    {
        e.preventDefault();
        axios.delete(`https://crudcrud.com/api/4d2fe7a4e6f741699d45f3cabf86c4f1/AppointmentApp/${user_obj._id}`)
            .then((response) => alert("Successful"))
            .catch((err) => alert(err))
        li.remove();
        // localStorage.removeItem(user_obj.email);
    });

    //create edit button
    var editbtn=document.createElement('button');
    editbtn.appendChild(document.createTextNode('Edit'));
    li.append(editbtn);
    editbtn.addEventListener('click',(e)=>
    {
        e.preventDefault();
        li.remove();
        //localStorage.removeItem(user_obj.email);
        nam.value=user_obj.name;
        email.value=user_obj.email;
        phone_no.value=user_obj.phone_no;
        updateDetails(user_obj);
    });


    data.appendChild(li);


}