import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

function View_file() {
  const { vccNo } = useParams();
  const [record, setRecord] = useState(null);
  const contentRef = useRef(null);

  // Fetch Firestore record by vccNo
  useEffect(() => {
    const fetchRecord = async () => {
      try {
        console.log("Fetching record for vccNo:", vccNo); // Debug log
        const q = query(collection(db, "submissions"), where("vccNo", "==", vccNo));
        const querySnapshot = await getDocs(q);
        console.log("Query snapshot size:", querySnapshot.size); // Debug log
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0]; // Assume vccNo is unique, take first match
          setRecord({ id: doc.id, ...doc.data() });
        } else {
          console.error("No record found for vccNo:", vccNo);
          alert("Record not found.");
        }
      } catch (error) {
        console.error("Error fetching record: ", error);
        alert(`Error fetching record: ${error.message}`);
      }
    };
    fetchRecord();
  }, [vccNo]);

  // Define left and right data, using Firestore data or fallbacks
  const leftData = record ? [
    ["VCC No", record.vccNo || "N/A"],
    ["VCC Generation date", record.vccDate ? new Date(record.vccDate).toLocaleDateString() : "N/A"],
    ["Engine Number", record.engineNo || "N/A"],
    ["Vehicle Driver", record.driver || "N/A"],
    ["Engine capacity", record.engineCapacity || "N/A"],
    ["Passenger capacity", record.passengerCapacity || "N/A"],
    ["Vehicle Brand Name", record.brandName || "N/A"],
    ["Vehicle Color", record.color || "N/A"],
    ["Declaration Number", record.declarationNo || "N/A"],
    ["Owner Code", record.ownerCode || "N/A"],
    ["Print Remark", record.printRemark || "N/A"],
  ] : [
    ["VCC No", "N/A"],
    ["VCC Generation date", "N/A"],
    ["Engine Number", "N/A"],
    ["Vehicle Driver", "N/A"],
    ["Engine capacity", "N/A"],
    ["Passenger capacity", "N/A"],
    ["Vehicle Brand Name", "N/A"],
    ["Vehicle Color", "N/A"],
    ["Declaration Number", "N/A"],
    ["Owner Code", "N/A"],
    ["Print Remark", "N/A"],
  ];

  const rightData = record ? [
    ["Vcc Status", record.vccStatus || "N/A"],
    ["Chasis No", record.chasisNo || "N/A"],
    ["Year of build", record.buildYear || "N/A"],
    ["Country of origin", record.origin || "N/A"],
    ["Carriage capacity", record.carriageCapacity || "N/A"],
    ["Vehicle Modal", record.vehicleModal || "N/A"],
    ["Vehicle Type", record.vehicleType || "N/A"],
    ["Specification Standard", record.specification || "N/A"],
    ["Declaration Date", record.declarationDate ? new Date(record.declarationDate).toLocaleDateString() : "N/A"],
    ["Owner Name", record.ownerName || "N/A"],
  ] : [
    ["Vcc Status", "N/A"],
    ["Chasis No", "N/A"],
    ["Year of build", "N/A"],
    ["Country of origin", "N/A"],
    ["Carriage capacity", "N/A"],
    ["Vehicle Modal", "N/A"],
    ["Vehicle Type", "N/A"],
    ["Specification Standard", "N/A"],
    ["Declaration Date", "N/A"],
    ["Owner Name", "N/A"],
  ];

  return (
    <div className="bg-light">
      <div className="container min-vh-100" id="viewfile">
        <div className="text-white p-3 mb-0" style={{ backgroundColor: 'rgb(67, 67, 67)' }}>
          <h4 className="m-0">View VCC Details</h4>
        </div>
        <div className="border border-grey border-1 px-3 shadow-sm">
          <div className="">
          <p className="text-danger pt-2 border-bottom border-1" style={{fontWeight : "700"}}>VCC/Vehicle Detail</p>
          </div>
          <div className="d-none row d-md-flex flex-row justify-content-between" style={{backgroundColor: "#F2F2F2", fontSize: "14px"}}>
            <div className="col-md-4 small">
              {leftData.map(([label, value], index) => (
                <div key={index} className="d-flex justify-content-between align-items-start my-3">
                  <p className="me-2 m-0 p-0">{label}:</p>
                  <strong className="text-end">{value}</strong>
                </div>
              ))}
            </div>
            <div className="col-md-4 small">
              {rightData.map(([label, value], index) => (
                <div key={index} className="d-flex justify-content-between align-items-start my-3 ">
                  <p className="me-2 p-0 m-0">{label}:</p>
                  <strong className={`text-end ${label === "Vcc Status" ? "text-danger" : ""}`}>{value}</strong>
                </div>
              ))}
            </div>
          </div>
          
         <div className="d-md-none p-3" style={{ backgroundColor: "#F2F2F2", fontSize: "14px" }}>
              {[leftData[0], rightData[0], leftData[1], rightData[1], leftData[2], rightData[2], leftData[3], rightData[3], leftData[4], rightData[4], leftData[5], rightData[5], leftData[6], rightData[6], leftData[7], rightData[7], leftData[8], rightData[8], leftData[9], rightData[9], leftData[10]].map(
          ([label, value], index) => (
              <div
              key={index}
              className="d-flex justify-content-between align-items-start"
              >
                <p className="fw-semibold text-dark" style={{fontSize:'13px'}}>{label}:</p>
                <strong className={`text-end ${label === "Vcc Status" ? "text-danger" : ""}`}>{value}</strong>
               </div>
           )
           )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default View_file;