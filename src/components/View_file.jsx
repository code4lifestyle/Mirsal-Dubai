 import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

// ✅ Inject external CSS only for this page
function usePageStyles() {
  useEffect(() => {
    const links = [
      "https://mirsal2new.dubaitrade.ae/common/2.0.6.0/css/bootstrap/bootstrap.min.css",
      "https://mirsal2new.dubaitrade.ae/common/2.0.6.0/css/ace-admin/ace.min.css",
      "https://mirsal2new.dubaitrade.ae/common/2.0.6.0/css/layout.min.css",
      "https://mirsal2new.dubaitrade.ae/common/2.0.6.0/css/layout-dt.min.css",
    ];

    const createdLinks = links.map(href => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
      return link;
    });

    // ✅ Add body class like your HTML
    document.body.classList.add("modal-page");

    return () => {
      createdLinks.forEach(link => {
        if (document.head.contains(link)) document.head.removeChild(link);
      });
      document.body.classList.remove("modal-page");
    };
  }, []);
}

function View_file() {
  const { vccNo } = useParams();
  const [record, setRecord] = useState(null);

  usePageStyles();

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const q = query(collection(db, "submissions"), where("vccNo", "==", vccNo));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
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
    return date.toLocaleDateString("en-GB"); // dd/mm/yyyy
  };

  const allData = record ? [
    ["VCC No", record.vccNo || ""],
    ["VCC Status", record.vccStatus || ""],
    ["VCC Generation Date", record.vccDate ? formatDate(record.vccDate) : ""],
    ["Chassis No", record.chasisNo || ""],
    ["Engine Number", record.engineNo || ""],
    ["Year of Built", record.buildYear || ""],
    ["Vehicle Drive", record.driver || ""],
    ["Country of Origin", record.origin || ""],
    ["Engine Capacity", record.engineCapacity || ""],
    ["Carriage Capacity", record.carriageCapacity || ""],
    ["Passenger Capacity", record.passengerCapacity || ""],
    ["Vehicle Model", record.vehicleModal || ""],
    ["Vehicle Brand Name", record.brandName || ""],
    ["Vehicle Type", record.vehicleType || ""],
    ["Vehicle Color", record.color || ""],
    ["Specification Standard Name", record.specification || ""],
    ["Declaration Number", record.declarationNo || ""],
    ["Declaration Date", record.declarationDate ? formatDate(record.declarationDate) : ""],
    ["Owner Code", record.ownerCode || ""],
    ["Owner Name", record.ownerName || ""],
    ["Print Remarks", record.printRemark || ""],
  ] : [];

  return (
    <div className="container p-0">
      <div className="modal-dialog modal-dialog-wide">
        <div className="modal-content">
          <div className="modal-header">
            <h4 id="modalTitle" className="modal-title">View VCC Details</h4>
          </div>

          <div className="modal-body">
            <form className="form-horizontal two-column-layout">
              <div className="row">
                <div className="col-xs-12">
                  <div className="widget-box">
                    <div className="widget-header" data-action="collapse">
                      <h4>VCC/Vehicle Details</h4>
                    </div>
                    <div className="widget-body">
                      <div className="widget-main">
                        <div className="item-information-container">
                          {allData.map(([label, value], idx) => (
                            <div className="item-information" key={idx}>
                              <label>{label} :</label>
                              <div>
                                <span
                                  style={
                                    label === "VCC Status"
                                      ? { color: "red", fontWeight: "bold" }
                                      : {}
                                  }
                                >
                                  {value}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default View_file;
