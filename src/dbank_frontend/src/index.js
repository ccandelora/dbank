import { dbank_backend } from "../../declarations/dbank_backend";

window.addEventListener("load", async () => {
  getTotalAmount();
}); 

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const button =e.target.querySelector("#submit-btn");
  button.disabled = true;
  
  const depositAmount = parseFloat(document.getElementById("deposit-amount").value);
  const withdrawAmount = parseFloat(document.getElementById("withdrawal-amount").value);
  
  if (depositAmount.length > 0){
    await dbank_backend.deposit(depositAmount);
  }
  if (withdrawAmount.length > 0){
    await dbank_backend.withdraw(withdrawAmount);
  }

  await dbank_backend.compound();
  getTotalAmount();
  button.disabled = false;
  
  document.getElementById("deposit-amount").value = "";
  document.getElementById("withdrawal-amount").value = "";
});

async function getTotalAmount(){
  const currentAmount = await dbank_backend.getBalance();
  document.getElementById("currentAmount").innerHTML = currentAmount.toFixed(2);
};
