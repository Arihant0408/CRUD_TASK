// array for all id's whose info is to be sent
let ids=[];

//check for all selected fields
document.getElementById('submitEmail').onclick = function(e) {  
  e.preventDefault();
  var markedCheckbox = document.querySelectorAll('input[type="checkbox"]:checked');  
  for (var checkbox of markedCheckbox) {  
    ids.push(checkbox.value) ;

  }

  
  //sending post request to send emails of selected data
  $.post("https://crud-taskapp.herokuapp.com/send-email",
  {
     ids
     
  },
  function (data, status) {
     console.log("data sent")
  });
  alert("Data sent via email to info@redpositive.in")
  $(".checkbox").prop("checked", false); 
  ids=[];
}
