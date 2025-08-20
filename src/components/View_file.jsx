import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import "./style.css";
import "./default.css";
import "./all.css"

function View_file() {
  const { vccNo } = useParams();
  const [record, setRecord] = useState(null);
  const contentRef = useRef(null);

  // Fetch Firestore record by vccNo
  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const q = query(collection(db, "submissions"), where("vccNo", "==", vccNo));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0]; // Assume vccNo is unique
          setRecord({ id: doc.id, ...doc.data() });
        } else {
          alert("Record not found.");
        }
      } catch (error) {
        alert(`Error fetching record: ${error.message}`);
      }
    };
    fetchRecord();
  }, [vccNo]);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date)) return "";
  return date.toISOString().split("T")[0]; // returns YYYY-MM-DD
};


  // Build one combined array
  const allData = record ? [
    ["VCC No", record.vccNo || ""],
    ["VCC Status", record.vccStatus || ""],
    ["VCC Generation date", record.vccDate ? formatDate(record.vccDate) : ""],
    ["Chasis No", record.chasisNo || ""],
    ["Engine Number", record.engineNo || ""],
    ["Year of build", record.buildYear || ""],
    ["Vehicle Driver", record.driver || ""],
    ["Country of origin", record.origin || ""],
    ["Engine capacity", record.engineCapacity || ""],
    ["Carriage capacity", record.carriageCapacity || ""],
    ["Passenger capacity", record.passengerCapacity || ""],
    ["Vehicle Modal", record.vehicleModal || ""],
    ["Vehicle Brand Name", record.brandName || ""],
    ["Vehicle Type", record.vehicleType || ""],
    ["Vehicle Color", record.color || ""],
    ["Specification Standard Name", record.specification || ""],
    ["Declaration Number", record.declarationNo || ""],
    ["Declaration Date", record.declarationDate ? formatDate(record.declarationDate) : ""],
    ["Owner Code", record.ownerCode || ""],
    ["Owner Name", record.ownerName || ""],
    ["Print Remarks", record.printRemark || ""],
  ] : [
    ["VCC No", ""],
    ["VCC Status", ""],
    ["VCC Generation date", ""],
    ["Chasis No", ""],
    ["Engine Number", ""],
    ["Year of build", ""],
    ["Vehicle Driver", ""],
    ["Country of origin", ""],
    ["Engine capacity", ""],
    ["Carriage capacity", ""],
    ["Passenger capacity", ""],
    ["Vehicle Modal", ""],
    ["Vehicle Brand Name", ""],
    ["Vehicle Type", ""],
    ["Vehicle Color", ""],
    ["Specification Standard Name", ""],
    ["Declaration Number", ""],
    ["Declaration Date", ""],
    ["Owner Code", ""],
    ["Owner Name", ""],
    ["Print Remarks", ""],
  ];

  return (
    <div>
      <div className="details">
        <div className="details-header">
          <h className="m-0 fw-bold p-1" style={{ fontSize: '1.10571429rem' }}>View VCC Details</h>
        </div>
        <div className="body">
          <p className="mb-2 text-danger fw-bold">VCC/Vehicle Detail</p>
          <hr />
          <div className="features-grid">
            {allData.map(([label, value], index) => (
              <div key={index} className="feature">
                <div className="label">
                  <p className="color-secondary">{label}:</p>
                </div>
                <p className={`paragraph ${label === "VCC Status" ? "text-danger" : ""}`}>
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default View_file;
