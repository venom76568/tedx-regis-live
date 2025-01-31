import React, { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import client from "./apolloClient"; // Import Apollo Client

const GET_FORMS = gql`
  query {
    getForms {
      id
      name
      email
      phone
      affiliation
      college
      id_type
      others
    }
  }
`;

const FormTable = () => {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await client.query({ query: GET_FORMS });
        console.log("Fetched Data:", data.getForms);
        setFormData(data.getForms);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const convertToCSV = (data) => {
    const header = [
      "Name",
      "Email",
      "Phone",
      "Affiliation",
      "College",
      "ID Type",
      "Others",
    ];

    const rows = data.map((form) => [
      form.name,
      form.email,
      form.phone,
      form.affiliation,
      form.college || "N/A",
      form.id_type,
      form.others || "N/A",
    ]);

    const csvContent = [
      header.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    return csvContent;
  };

  const downloadCSV = () => {
    const csvData = convertToCSV(formData);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "form_data.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}
      >
        Form Submissions
      </h2>
      <button
        onClick={downloadCSV}
        style={{
          marginBottom: "10px",
          padding: "10px 15px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Download CSV
      </button>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "10px",
          border: "1px solid #ddd",
        }}
      >
        <thead style={{ backgroundColor: "#f4f4f4" }}>
          <tr>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Name</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Email</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Phone</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Affiliation
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              College
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              ID Type
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Others
            </th>
          </tr>
        </thead>
        <tbody>
          {formData && formData.length > 0 ? (
            formData.map((form, index) => (
              <tr key={index}>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {form.name}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {form.email}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {form.phone}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {form.affiliation}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {form.college || "N/A"}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {form.id_type}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {form.others || "N/A"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="7"
                style={{
                  padding: "10px",
                  textAlign: "center",
                  border: "1px solid #ddd",
                }}
              >
                No form submissions available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FormTable;
