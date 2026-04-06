let patientRecords = [];
let currentPatient = null;

function calculateBMI() {
  const name = document.getElementById("patientName").value.trim();
  const age = document.getElementById("age").value.trim();
  const gender = document.getElementById("gender").value;
  const height = parseFloat(document.getElementById("height").value);
  const weight = parseFloat(document.getElementById("weight").value);

  if (!name || !age || !gender || isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    alert("Please complete all patient information correctly.");
    return;
  }

  const heightMeters = height / 100;
  const bmi = (weight / (heightMeters * heightMeters)).toFixed(2);

  let category = "";
  let interpretation = "";
  let badgeClass = "";

  if (bmi < 18.5) {
    category = "Underweight";
    interpretation = "Patient may require nutritional assessment and dietary support.";
    badgeClass = "underweight";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    category = "Normal Weight";
    interpretation = "Patient is within the normal and healthy BMI range.";
    badgeClass = "normal";
  } else if (bmi >= 25 && bmi <= 29.9) {
    category = "Overweight";
    interpretation = "Patient may benefit from lifestyle modification and weight monitoring.";
    badgeClass = "overweight";
  } else {
    category = "Obese";
    interpretation = "Patient may require further medical evaluation and health intervention.";
    badgeClass = "obese";
  }

  currentPatient = {
    name,
    age,
    gender,
    height,
    weight,
    bmi,
    category
  };

  document.getElementById("displayName").textContent = name;
  document.getElementById("displayAge").textContent = age;
  document.getElementById("displayGender").textContent = gender;
  document.getElementById("bmiValue").textContent = bmi;
  document.getElementById("bmiCategory").textContent = category;
  document.getElementById("bmiCategory").className = "status-badge " + badgeClass;
  document.getElementById("interpretation").textContent = interpretation;
  document.getElementById("resultBox").style.display = "block";
}

function saveRecord() {
  if (!currentPatient) {
    alert("Please calculate BMI first before saving the record.");
    return;
  }

  patientRecords.push(currentPatient);
  renderTable();
  alert("Patient record saved successfully.");
}

function renderTable() {
  const tableBody = document.getElementById("recordTable");

  if (patientRecords.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="8" class="empty-state">No patient records saved yet.</td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = patientRecords.map((record, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${record.name}</td>
      <td>${record.age}</td>
      <td>${record.gender}</td>
      <td>${record.height}</td>
      <td>${record.weight}</td>
      <td>${record.bmi}</td>
      <td>${record.category}</td>
    </tr>
  `).join("");
}

function resetForm() {
  document.getElementById("patientName").value = "";
  document.getElementById("age").value = "";
  document.getElementById("gender").value = "";
  document.getElementById("height").value = "";
  document.getElementById("weight").value = "";
  document.getElementById("resultBox").style.display = "none";
  currentPatient = null;
}

function printResult() {
  window.print();
}