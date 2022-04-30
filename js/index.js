const firtName = document.getElementById("name");
const tax = document.getElementById("tax");
const securety = document.getElementById("Securety");
let netSalay = document.getElementById("total");
const salary = document.getElementById("Salary");
const department = document.getElementById("department");
const btnSave = document.getElementById("save");
const tbody = document.getElementById("tbody");
const deleteAll = document.getElementById("delete-data");

let n;

// Events Delete and Save Create New Record

btnSave.addEventListener("click", (e) => {
  e.preventDefault();
  const em = {
    name: firtName.value,
    netSalay: netSalay.value,
    department: department.value,
    tax: tax.value,
    securety: securety.value,
    salary: salary.value,
  };
  if (btnSave.innerHTML === "save") {
    employee.push(em);
  } else {
    employee[n] = em;
    btnSave.innerHTML = "save";
  }
  localStorage.setItem("employee", JSON.stringify(employee));
  showData();

  // window.scrollTo(0, document.body.scrollHeight);
  // show();
  clearData();
});
deleteAll.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.clear();
  employee.splice(0);
  deleteData();
  showData();
});

let employee = [];
if (localStorage.employee != null) {
  employee = JSON.parse(localStorage.employee);
} else {
  employee = [];
}

function calcSalary() {
  netSalay.value = salary.value - tax.value - securety.value;
}

// Show all data

function showData() {
  let table = "";

  for (let i = 0; i < employee.length; i++) {
    table += `
    <tr>
      <td>${employee[i].name}</td>
      <td>${employee[i].department}</td>
      <td>${employee[i].salary}</td>
      <td>${employee[i].securety}</td>
      <td>${employee[i].tax}</td>
      <td>${employee[i].netSalay}</td>
      <td><button class="btn btn-success Update" onclick="updateData(${i})">Update</button></td>
      <td><button class="btn btn-danger delete-one">Delete</button></td>
    </tr>

    `;
    // });
  }
  tbody.innerHTML = table;

  // delete one record

  const btnDeleteOne = document.querySelectorAll(".delete-one");
  const update = document.querySelectorAll(".Update");

  for (let i = 0; i < update.length; i++) {
    update[i].addEventListener("click", () => {
      updateData(i);
      scroll({
        top: 0,
        behavior: "smooth",
      });
    });
  }
  for (let i = 0; i < btnDeleteOne.length; i++) {
    btnDeleteOne[i].addEventListener("click", (e) => {
      employee.splice(i, 1);
      localStorage.employee = JSON.stringify(employee);
      showData();
    });
  }
}

// Clear Inputs

function clearData() {
  firtName.value =
    salary.value =
    department.value =
    securety.value =
    tax.value =
    netSalay.value =
      "";
}

showData();

//  Delete All Data

function deleteData() {
  localStorage.clear();
  employee.splice(0);
  showData();
}
function updateData(i) {
  firtName.value = employee[i].name;
  salary.value = employee[i].salary;
  department.value = employee[i].department;
  securety.value = employee[i].securety;
  tax.value = employee[i].tax;
  netSalay.value = employee[i].netSalay;

  btnSave.innerHTML = "Update";
  n = i;
}
