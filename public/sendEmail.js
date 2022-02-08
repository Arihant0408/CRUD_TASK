
console.log("ok");

let ids=[];
document.getElementById('submitEmail').onclick = function(e) {  
  e.preventDefault();
  var markedCheckbox = document.querySelectorAll('input[type="checkbox"]:checked');  
  for (var checkbox of markedCheckbox) {  
    //console.log(checkbox.value + ' '); 
    ids.push(checkbox.value) ;

  }
  console.log(ids); 
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
// $.ajax({
//   type: "POST",
//   url: "http://localhost:3000/send-email",
//   data: ({detailsArr : ids }),
//   success: function(html){
//     alert( "Submitted");
//       }
// });  