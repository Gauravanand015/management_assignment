const byDashboard = document.getElementById("dashBoardForm");
const modalForm = document.getElementById("modalForm");
const closeModalButton = document
  .getElementById("close_modal")
  .addEventListener("click", closeModal);

byDashboard.addEventListener("submit", (event) => {
  event.preventDefault();
  addEmployee();
});

modalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  editEmployee();
});

// const editEmployee = async () => {
//   let obj = {
//     firstName: modalForm.firstname.value,
//     lastName: modalForm.lastname.value,
//     email: modalForm.employee_email.value,
//     department: modalForm.department.value,
//     salary: modalForm.employee_salary.value,
//   };
//   console.log(obj);
// };
const addEmployee = async () => {
  let obj = {
    firstName: byDashboard.firstname.value,
    lastName: byDashboard.lastname.value,
    email: byDashboard.employee_email.value,
    department: byDashboard.department.value,
    salary: byDashboard.employee_salary.value,
  };

  let res = await fetch("http://localhost:9090/dashboard/employees", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify(obj),
  });

  let data = await res.json();

  if (data.message == "Employee Registered") {
    alert(data.message);
    window.location.reload();
  } else {
    alert("Something went wrong while signup");
  }
};

const tbody = document.querySelector("tbody");

const getAllData = async () => {
  const res = await fetch(`http://localhost:9090/dashboard/employees`);
  const data = await res.json();
  renderToDom(data);
};
getAllData();

const renderToDom = (data) => {
  tbody.innerHTML = null;
  data.map((elem) => {
    const row = document.createElement("tr");

    const firstName = document.createElement("td");
    firstName.textContent = elem.firstName;

    const lastName = document.createElement("td");
    lastName.textContent = elem.lastName;

    const email = document.createElement("td");
    email.textContent = elem.email;

    const salary = document.createElement("td");
    salary.textContent = elem.salary;

    const editButton = document.createElement("button");
    editButton.textContent = "EDIT";

    editButton.addEventListener("click", openModal);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "DELETE";

    deleteButton.addEventListener("click", () => {
      // console.log(elem.email)
      deleteRow(elem.email);
    });

    row.append(firstName, lastName, email, salary, editButton, deleteButton);
    tbody.append(row);
  });
};

const deleteRow = async (email) => {
  const res = await fetch(
    `http://localhost:9090/dashboard/employeeDelete/${email}`,
    {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    }
  );
  const data = await res.json();
  console.log(data);
  if (data.message == "data deleted") {
    alert("Data Deleted");
    window.location.reload();
  } else {
    alert("something went wrong in delete");
  }
};

const sortBySalary = document.getElementById("sortbySalary");
sortBySalary.addEventListener("change", () => {
  sortingData(sortBySalary.value);
});

const sortingData = async (category) => {
  console.log(category);
  let res = await fetch(
    `http://localhost:9090/dashboard/sortEmployee/${category}`
  );
  let data = await res.json();

  renderToDom(data);
};

const filterBy = document.getElementById("filter");
filterBy.addEventListener("change", () => {
  console.log(filterBy.value);
  filterData(filterBy.value);
});

const filterData = async (category) => {
  console.log(category);
  let res = await fetch(
    `http://localhost:9090/dashboard/filterEmployee/${category}`
  );
  let data = await res.json();

  renderToDom(data);
};

function openModal() {
  let x = (document.getElementById("modal").style.display = "block");
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}
