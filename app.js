'use strict'

function randomAge(min,max)
{
    return Math.floor(Math.random() * (max - min + 1) ) + min;

}

// console.log(randomAge(20,60));

function Donations(name,age,amount)
{
   this.name=name;
   this.age=age;
   this.amount=amount;
   
   Donations.all.push(this);
   

}

Donations.all=[];

let form=document.getElementById('form');
const table=document.getElementById('table');
let Button=document.getElementById('submit');

Button.addEventListener('click',submitQuery);



function  submitQuery(event)
{
   event.preventDefault();
   let donatorName=document.getElementById('name').value;
   let donatorAge=randomAge(20,60);
   let donationAmount=document.getElementById('list').value;

   //new object
   let  newDonations= new Donations(donatorName,donatorAge,donationAmount);
   console.log(newDonations);
   saveDonations();
   newDonations.render();
}

Donations.prototype.render= function ()
{
   table.textContent='';
   let tBody=document.createElement('tbody');
   table.appendChild(tBody);

   let headerRow=document.createElement('tr');
   tBody.appendChild(headerRow);

   let name=document.createElement('th');
   name.textContent="Donator Name";
   headerRow.appendChild(name);

   let amount=document.createElement('th');
   amount.textContent="Donation Amount";
   headerRow.appendChild(amount);
   
   let age=document.createElement('th');
   age.textContent="Age";
   headerRow.appendChild(age);
   

   for (let i = 0; i < Donations.all.length; i++) {
      let infoRow=document.createElement('tr');
      tBody.appendChild(infoRow);
      
      let firstElem=document.createElement('td');
      firstElem.textContent=Donations.all[i].name;

      let secondElem=document.createElement('td');
      secondElem.textContent=Donations.all[i].amount;

      let thirdElem=document.createElement('td');
      thirdElem.textContent=Donations.all[i].age;
    
      infoRow.appendChild(firstElem);
      infoRow.appendChild(secondElem);
      infoRow.appendChild(thirdElem);
 
       
   }

   
   let clear=document.createElement('button');
   clear.textContent="clearAll";
   table.appendChild(clear);

   clear.addEventListener('click',removeTable);


}



function removeTable(event)
{
  if(event.target.id!==null)
  {
   localStorage.clear();
   table.textContent='';
  }

}


function saveDonations()
{

    let data=JSON.stringify(Donations.all);
    localStorage.setItem('donation',data);
}

function getDonations()
{
   let data=localStorage.getItem('donation');
   let stringArr=JSON.parse(data);
   if(stringArr!=null)
   {
    //  Donations.all=stringArr;

    for (let i = 0; i < stringArr.length; i++) {
        let newobj= new Donations(stringArr[i].name,stringArr[i].age,stringArr[i].amount);
        newobj.render();
        
    }


   }




}
getDonations();