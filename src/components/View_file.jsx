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

  // Build one combined array
  const allData = record ? [
    ["VCC No", record.vccNo || "N/A"],
    ["VCC Status", record.vccStatus || "N/A"],
    ["VCC Generation date", record.vccDate ? new Date(record.vccDate).toLocaleDateString() : "N/A"],
    ["Chasis No", record.chasisNo || "N/A"],
    ["Engine Number", record.engineNo || "N/A"],
    ["Year of build", record.buildYear || "N/A"],
    ["Vehicle Driver", record.driver || "N/A"],
    ["Country of origin", record.origin || "N/A"],
    ["Engine capacity", record.engineCapacity || "N/A"],
    ["Carriage capacity", record.carriageCapacity || "N/A"],
    ["Passenger capacity", record.passengerCapacity || "N/A"],
    ["Vehicle Modal", record.vehicleModal || "N/A"],
    ["Vehicle Brand Name", record.brandName || "N/A"],
    ["Vehicle Type", record.vehicleType || "N/A"],
    ["Vehicle Color", record.color || "N/A"],
    ["Specification Standard Name", record.specification || "N/A"],
    ["Declaration Number", record.declarationNo || "N/A"],
    ["Declaration Date", record.declarationDate ? new Date(record.declarationDate).toLocaleDateString() : "N/A"],
    ["Owner Code", record.ownerCode || "N/A"],
    ["Owner Name", record.ownerName || "N/A"],
    ["Print Remark", record.printRemark || "N/A"],
  ] : [
    ["VCC No", "N/A"],
    ["VCC Status", "N/A"],
    ["VCC Generation date", "N/A"],
    ["Chasis No", "N/A"],
    ["Engine Number", "N/A"],
    ["Year of build", "N/A"],
    ["Vehicle Driver", "N/A"],
    ["Country of origin", "N/A"],
    ["Engine capacity", "N/A"],
    ["Carriage capacity", "N/A"],
    ["Passenger capacity", "N/A"],
    ["Vehicle Modal", "N/A"],
    ["Vehicle Brand Name", "N/A"],
    ["Vehicle Type", "N/A"],
    ["Vehicle Color", "N/A"],
    ["Specification Standard Name", "N/A"],
    ["Declaration Number", "N/A"],
    ["Declaration Date", "N/A"],
    ["Owner Code", "N/A"],
    ["Owner Name", "N/A"],
    ["Print Remark", "N/A"],
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
