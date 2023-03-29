import { useState } from "react";
import "./Exam.css";
import Papa from "papaparse";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Exam(props) {
  const BASE_URL = "http://localhost:5000";

  const navigate = useNavigate();

  const { _id } = props;
  const [patient, setPatient] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    file: null,
  });

  const handlePatientChange = (event) => {
    setPatient({ ...patient, [event.target.name]: event.target.value });
  };

  function handleFileChange(event) {
    setPatient({ ...patient, file: event.target.files[0] });
  }

  const handleSubmit = (event) => {
    //event.preventDefault();
    // handle form submission here
    const reader = new FileReader();
    reader.onload = function (event) {
      const csvData = event.target.result;
      Papa.parse(csvData, {
        header: true,
        complete: async function (results) {
          const nonEmptyResults = results.data.filter((row) =>
            Object.values(row).some((value) => value !== "")
          );
          const file = JSON.stringify(nonEmptyResults);

          navigate("/user/exam");

          await axios
            .post(`${BASE_URL}/user/exam`, { _id, patient, file })
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
  };

  return (
    <div className="patients">
      <h2>Add New Patient</h2>
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
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Exam;
