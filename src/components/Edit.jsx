import { useState } from "react";
import "./Edit.css";
import Papa from "papaparse";
import axios from "axios";
import BASE_URL from "../baseUrl";

function Edit(props) {
  //const BASE_URL = "http://localhost:5000";

  const [fileChange, setFileChange] = useState(false);

  const { _id_root, patients, patientId } = props;

  const [patient, setPatient] = useState(patients);

  const handlePatientChange = (event) => {
    setPatient({ ...patient, [event.target.name]: event.target.value });
  };

  function handleFileChange(event) {
    setPatient({ ...patient, file: event.target.files[0] });
    setFileChange(true);
  }

  function handleSubmit(event) {
    event.preventDefault();
    // handle form submission here
    if (fileChange) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const csvData = event.target.result;
        Papa.parse(csvData, {
          header: true,
          complete: async function (results) {
            const nonEmptyResults = results.data.filter((row) =>
              Object.values(row).some((value) => value !== "")
            );
            let file = JSON.stringify(nonEmptyResults);
            
            file === "[]" && (file = patient.file);
            
            window.location.reload();
            
            axios
              .put(
                `${BASE_URL}/user/patients/edit/${_id_root}/${patientId}`,
                {
                  patient,
                  file,
                }
              )
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });


          },
        });
      };
      reader.readAsText(patient.file);
    } else {
 

      axios
        .put(
          `${BASE_URL}/user/patients/edit/${_id_root}/${patientId}`,
          {
            patient,
            file: patient.file,
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

        window.location.reload();
    }
  }

  return (
    <div className="patients">
      <h2>Edit Patient</h2>
      <form onSubmit={handleSubmit} className="input">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={patient.name}
            name="name"
            onChange={handlePatientChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            value={patient.address}
            name="address"
            onChange={handlePatientChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="text"
            value={patient.phone}
            name="phone"
            onChange={handlePatientChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="text"
            value={patient.email}
            name="email"
            onChange={handlePatientChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Upload CSV/XLSX file:</label>
          <input type="file" accept=".csv" onChange={handleFileChange} />
        </div>
        <button type="submit">Edit</button>
      </form>
    </div>
  );
}

export default Edit;
