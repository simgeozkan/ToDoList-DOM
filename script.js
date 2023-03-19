
let gorevListesi = [
     {"id":14, "gorevAdi":"gorev-1","durum":"pending"},
     {"id":5, "gorevAdi":"gorev-2","durum":"completed"},
     {"id":8, "gorevAdi":"gorev-3","durum":"pending"},
     {"id":7, "gorevAdi":"gorev-4","durum":"completed"}, ];


     let editId;

     let isEditTask=false;

     const taskInput=document.querySelector("#txtTaskName");

     const btnClear=document.querySelector("#btnClear");

     const filters=document.querySelectorAll("span"); // span etiketleri filters objesine alınıyor.idleri ile beraber

  
     displayTask(document.querySelector("span.active").id); // span id display Task fonksiyonuna gönderiliyor.


function displayTask(filter){  

      let ul = document.getElementById("task-list"); 
      
      ul.innerHTML="";

      if(gorevListesi.length==0){
            ul.innerHTML="<p class='p-3 m-0'>görev listeniz boştur...</p>";
      }

      else{

    

      for (let gorev of gorevListesi) {

            let kontrol ;

            if(gorev.durum=="completed")

            {kontrol="checked";}

            else

            kontrol="";

            if(filter==gorev.durum||filter=="all")
            {

         
          let li = `
                      <li class="task list-group-item">
                            <div class="form-check">
                                <input type="checkbox" onclick="updateStatus(this)" id="${gorev.id}" class="form-check-input" ${kontrol} ></form>
                                
                                <label for="${ gorev.id }" class="form-check-label ${kontrol}">${gorev.gorevAdi} </label>
                              </div>  

                              <div class="dropdown">
                                    <button class="btn btn-link dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fa-solid fa-ellipsis"></i>
                                    </button>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                          <li><a onclick="deleteTask(${ gorev.id })" class="dropdown-item" href="#"><i class="fa-solid fa-trash"></i>Delete</a></li>
                                          <li><a onclick='editTask("${ gorev.id }","${gorev.gorevAdi}")' class="dropdown-item" href="#"><i class="fa-solid fa-pen"></i>Edit</a></li>
                                        
                                         
                                    </ul>
                              </div>
                      </li>           
                `;      
                
            
          ul.insertAdjacentHTML("beforeend", li);}
      }

}}


      document.querySelector("#btnAddNewTask").addEventListener("click",newTask);


      document.querySelector("#txtTaskName").addEventListener("keypress",function(event){
            
            if(event.key=="Enter"){
                  event.preventDefault();
                  document.getElementById("btnAddNewTask").click();
            }
            });

            for(let span of filters){   // gelen span etiketleri döngü yardımıyla dolaşılıyot.ve span etiketlerine click eventlistener satesinde çalışan bir fonksiyon ekleniyor.
                  span.addEventListener("click",function(){ // spana tıkladığında bir fonksiyon çağırılıyor
                  document.querySelector("span.active").classList.remove("active");  // fonksiyon span etiketinin active classını kontrol edip var ise siliyor
                  span.classList.add("active"); // active classı ekleniyor
                  displayTask(span.id); // active classının bulunduğu span id si(all-pending-completed) filters parametresine  gönderiliyor.
                  })
            }

function newTask(event) {

    

      if(taskInput.value=="")
      {
            alert("görev girmelisiniz");
      }
      else{

            if(!isEditTask){
                  //ekleme
                  gorevListesi.push({"id":gorevListesi.length+1,"gorevAdi":taskInput.value,"durum":"pending"});
                  
                  console.log(gorevListesi);

            }
            else{
                  for(let gorev of gorevListesi){
                        if(gorev.id==editId){
                              gorev.gorevAdi=taskInput.value;
                        }

                        isEditTask=false;
                  }
            }
            
         
            
            taskInput.value="";

            displayTask(document.querySelector("span.active").id);

      }

      event.preventDefault();
 
};


function deleteTask(id){

      let deletedId;

      for(let index in gorevListesi)
      {
            if(gorevListesi[index].id==id)
            {
                  deletedId=index;

            }
      }


      gorevListesi.splice(deletedId,1);

      displayTask(document.querySelector("span.active").id); // active classına sahip olan yani clicklenen spanın id si displayTask fonksiyonunun filter parametresine gönderiliyor.
};

          
function editTask(taskId,taskName){

      editId=taskId;

      isEditTask=true;

      taskInput.value=taskName;

      taskInput.focus();

      taskInput.classList.add("active"); //etrafı maviye boyar focuslanıp

}

      btnClear.addEventListener("click",function(){

            gorevListesi.splice(0,gorevListesi.length);

            displayTask(document.querySelector("span.active").id);



      })


function updateStatus(selectedTask)
{


      let durum;


      let label=selectedTask.nextElementSibling;

      if(selectedTask.checked){
            label.classList.add("checked");
            durum="completed";
      }
      else{
            label.classList.remove("checked");
            durum="pending";
      }

      for(let gorev of gorevListesi){
            if(gorev.id==selectedTask.id)
                 {gorev.durum=durum;
                  
                 } 
            }
   
}
   



