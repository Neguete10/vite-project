import axios from "axios";
import "./Patients.css";
import { useState, useEffect } from "react";
import Edit from "./Edit";

export default function Patients(props) {
  const BASE_URL = "http://localhost:5000";

  const { _id_root } = props;
  const [patients, setPatients] = useState([]);
  const [edit, setEdit] = useState({ boolean: false, id: "", patient: "" });

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(`${BASE_URL}/user/patients/${_id_root}`) // Do i need the header?
        .then((res) => {
          setPatients(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchData();
  }, [_id_root]);

  function handleEdit(id, patient) {
    setEdit({
      boolean: !edit.boolean, //IMPROVE THIS
      id: id,
      patient: patient,
    });
  }

  async function handleRemove(patientId) {
    
    setPatients(patients.filter((index) => index._id !== patientId));
    
    await axios
      .delete(
        `${BASE_URL}/user/patients/delete/${_id_root}/${patientId}`
      )
      .catch((error) => console.log(error));

    
  }

  return (
    <div className="patients">
      {Array.isArray(patients) && patients.length > 0 ? (
        <>
          <h2>All Patients</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Email</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {patients.map((index) => (
                <tr key={index._id}>
                  <td>{index["patient"].name}</td>
                  <td>{index["patient"].address}</td>
                  <td>{index["patient"].phone}</td>
                  <td>{index["patient"].email}</td>
                  <td>
                    <button
                      id="edit-btn"
                      onClick={() => handleEdit(index._id, index["patient"])}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      id="remove-btn"
                      onClick={() => handleRemove(index._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>No patients found.</p>
      )}

      {edit.boolean && (
        <Edit _id_root={_id_root} patientId={edit.id} patients={edit.patient} />
      )}
    </div>
  );
}
