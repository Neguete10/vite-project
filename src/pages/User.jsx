import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./User.css";
import SideNavMenu from "../components/SideNavMenu";
import Exam from "../components/Exam";
import UserHero from "../components/UserHero";
import Patients from "../components/Patients";
import { useLocation } from "react-router-dom";
import BASE_URL from "../baseUrl";

export default function User() {
  //const BASE_URL = "http://localhost:5000";

  const [isLogged, setIsLogged] = useState(false);
  const [data, setData] = useState({
    _id_root: "", //added theses lines
    laboratory: "",
  });

  const navigate = useNavigate();

  const location = useLocation();
  //const patientId = location.state?.patientId; // MIGHT NEED TO CHANGE THIS

  function authHeader() {
    try {
      const tokenLocalStorage = localStorage.getItem("token");
      return { "x-access-token": tokenLocalStorage };
    } catch (err) {
      return {};
    }
  }
  useEffect(() => {
    async function fetchData() {
      axios
        .get(`${BASE_URL}/user`, { headers: authHeader() })
        .then((res) => {
          setData(res.data);
          setIsLogged(true);
        })
        .catch((err) => {
          console.log(err);
          navigate("/login");
        });
    }
    fetchData();
  }, [navigate]); // changed from [navigate, data] to [navigate]

  return (
    <>
      {isLogged && (
        <div className="user-card">
          <SideNavMenu />

          {location.pathname === "/user" && (
            <UserHero laboratory={data.laboratory} />
          )}

          {location.pathname === "/user/patients" && (
            <Patients _id_root={data._id_root} /> // changed from patients={data.patients} to _id_root={data._id_root}
          )}

          {location.pathname === "/user/exam" && <Exam _id={data._id_root} />}

        </div>
      )}
    </>
  );
}
