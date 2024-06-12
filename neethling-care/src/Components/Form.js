import React, { useState } from "react";
import "../Styles/Style.css";
import stage1 from "./stage1.png";
import stage2 from "./stage2.jpg";
import stage3 from "./stage3.jpg";

const LSDForm = () => {
  const [formData, setFormData] = useState({
    incubationWeeks: "",
    fever: false,
    bodyTemperature: "",
    nodulesPresent: false,
    nodulesLocation: "",
    nodulesUlcerated: false,
    additionalInfo: "",
    overallCondition: "",
    milkProduction: "",
    bodyTempChange: false,
  });

  const [results, setResults] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.incubationWeeks)
      newErrors.incubationWeeks = "This field is required";
    if (!formData.bodyTemperature)
      newErrors.bodyTemperature = "This field is required";
    if (!formData.nodulesLocation && formData.nodulesPresent)
      newErrors.nodulesLocation = "This field is required";
    if (!formData.additionalInfo)
      newErrors.additionalInfo = "This field is required";
    if (!formData.overallCondition)
      newErrors.overallCondition = "This field is required";
    if (!formData.milkProduction)
      newErrors.milkProduction = "This field is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const assessLSD = () => {
    if (!validateForm()) {
      return;
    }

    const {
      incubationWeeks,
      fever,
      bodyTemperature,
      nodulesPresent,
      nodulesLocation,
      nodulesUlcerated,
      additionalInfo,
      overallCondition,
      milkProduction,
      bodyTempChange,
    } = formData;

    let stage;
    let recommendedMedicine;
    let medicineImg;
    let medicineDescription;

    if (parseFloat(incubationWeeks) < 2) {
      stage = "Incubation";
      recommendedMedicine =
        "Lumpy Skin Disease Virus Vaccine, For Clinical, Packaging Type: Vial";
      medicineImg = stage1;
      medicineDescription = "Monitor the animal for symptoms.";
    } else if (fever || nodulesPresent) {
      stage = "Nodular";
      recommendedMedicine =
        "REFIT ANIMAL CARE Lumpy Skin Disease Treatment Medicine Supplement for Cows, 1 LTR, Lumpy-Hit";
      medicineImg = stage2;
      medicineDescription =
        "Administer anti-inflammatory drugs and antibiotics to prevent secondary infections.";
    } else {
      stage = "Prodromal";
      recommendedMedicine = "Lumpy Skin Disease (OBP) and Supportive care";
      medicineImg = stage3;
      medicineDescription =
        "Provide supportive care and monitor for progression to the nodular stage.";
    }

    const resultHtml = `
      <p>Stage of LSD: ${stage}</p>
      <p>Recommended Medicine: ${recommendedMedicine}</p>
      <div class="medicine">
          <img src=${medicineImg} alt="${recommendedMedicine}">
          <p>${medicineDescription}</p>
      </div>
      <p>Additional Information: ${additionalInfo}</p>
    `;
    setResults(resultHtml);
  };

  return (
    <div>
      <h1>Check Neethling Virus/LSD Stage</h1>
      <div className="form-group">
        <label>
          1. How long ago was the potential exposure to LSD (in weeks)?
        </label>
        <input
        className='basic-input'
          type="number"
          id="incubationWeeks"
          step="0.1"
          value={formData.incubationWeeks}
          onChange={handleChange}
        />
        {errors.incubationWeeks && (
          <p className="error">{errors.incubationWeeks}</p>
        )}
      </div>

      <div className="section-title">Prodromal Stage:</div>
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            id="fever"
            checked={formData.fever}
            onChange={handleChange}
          />{" "}
          2. Is the animal showing fever?
        </label>
        <div className="form-group">
          <label>
            {" "}
            - What is the approximate body temperature? (in Celsius):
          </label>
          <input
            className="basic-input"
            type="number"
            id="bodyTemperature"
            step="0.1"
            value={formData.bodyTemperature}
            onChange={handleChange}
          />
          {errors.bodyTemperature && (
            <p className="error">{errors.bodyTemperature}</p>
          )}
        </div>
      </div>

      <div className="section-title">Nodular Stage:</div>
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            id="nodulesPresent"
            checked={formData.nodulesPresent}
            onChange={handleChange}
          />{" "}
          4. Are there any skin nodules or papules?
        </label>
        <div className="form-group">
          <label> - Describe the location and size of the nodules:</label>
          <input
            type="text"
            id="nodulesLocation"
            value={formData.nodulesLocation}
            onChange={handleChange}
          />
          {errors.nodulesLocation && (
            <p className="error">{errors.nodulesLocation}</p>
          )}
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              id="nodulesUlcerated"
              checked={formData.nodulesUlcerated}
              onChange={handleChange}
            />{" "}
            - Have any nodules ulcerated or formed crusts?
          </label>
        </div>
      </div>

      <div className="section-title">Additional Information:</div>
      <div className="form-group">
        <label>Any other relevant observations or details?</label>
        <input
          type="text"
          id="additionalInfo"
          value={formData.additionalInfo}
          onChange={handleChange}
        />
        {errors.additionalInfo && (
          <p className="error">{errors.additionalInfo}</p>
        )}
      </div>

      <div className="section-title">Health and Well-being:</div>
      <div className="form-group">
        <label>
          8. How is the animal's overall condition? (normal/reduced/severe):
        </label>
        <input
          type="text"
          id="overallCondition"
          value={formData.overallCondition}
          onChange={handleChange}
        />
        {errors.overallCondition && (
          <p className="error">{errors.overallCondition}</p>
        )}
      </div>
      <div className="form-group">
        <label>
          9. Is there any impact on milk production? (normal/reduced/none):
        </label>
        <input
          type="text"
          id="milkProduction"
          value={formData.milkProduction}
          onChange={handleChange}
        />
        {errors.milkProduction && (
          <p className="error">{errors.milkProduction}</p>
        )}
      </div>
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            id="bodyTempChange"
            checked={formData.bodyTempChange}
            onChange={handleChange}
          />{" "}
          10. Has the animal's body temperature changed significantly?
        </label>
      </div>

      <button className="text-appointment-btn" onClick={assessLSD}>
        Submit
      </button>

      <div className="section-title">Assessment Results:</div>
      <div id="results" dangerouslySetInnerHTML={{ __html: results }}></div>
    </div>
  );
};

export default LSDForm;
