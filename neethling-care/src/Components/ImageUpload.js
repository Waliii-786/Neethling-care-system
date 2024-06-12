import React, { useState } from 'react';
import axios from 'axios';
import "../Styles/ImageUpload.css";
import { useNavigate } from "react-router-dom";

const ImageUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [result, setResult] = useState(null);
    const [precautions, setPrecautions] = useState(null);
    const [showForm, setShowForm] = useState(false); // State to control the visibility of the form

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFile) return;

        const data = new FormData();
        data.append('file', selectedFile);

        try {
            const response = await axios.post('http://localhost:5000/predict', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setResult(response.data);
            if (response.data.class === 'Lumpy Skin') {
                setPrecautions([
                    "Biosecurity: This is the foundation. Implement strict measures like disinfecting equipment, restricting animal movement, and controlling insects to minimize the virus's spread.",
                    "Vaccination: Vaccinate your livestock according to a veterinarian's recommended schedule. This significantly reduces the risk of infection.",
                    "Surveillance: Regularly monitor your animals for signs of LSD (fever, skin nodules, discharge). Report any suspected cases immediately to veterinary authorities.",
                    "Isolate & Manage: Isolate sick animals and provide supportive care (fluids, pain medication, nutrition). Dispose of infected carcasses properly to prevent further transmission."
                ]);
                setShowForm(true); // Show the form to input cattle condition
            } else {
                setPrecautions(null);
                setShowForm(false); // Hide the form if the class is not Lumpy Skin
            }
        } catch (error) {
            console.error('Error uploading the file:', error);
        }
    };

    const navigate = useNavigate();

    const handleClick = () => {
        if (showForm) {
            navigate("/check-stage");
        }
    };

    return (
        <div className="hero-section">
            <div className="text-section">
                <h1 className="text-title">Upload an Image</h1>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="file" 
                        accept="image/*" 
                        capture="environment" 
                        onChange={handleFileChange} 
                        className="text-appointment-btn" 
                    />
                    <button type="submit" className="text-appointment-btn">Submit</button>
                </form>
                {result && (
                    <div>
                        <h2>Prediction Result</h2>
                        <p>Class: {result.class}</p>
                        <p>Confidence: {result.confidence}%</p>
                    </div>
                )}
                {precautions && (
                    <div>
                        <h2>Precautionary Measures</h2>
                        <ul>
                            {precautions.map((precaution, index) => (
                                <li key={index}>{precaution}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Show the form only if the class is Lumpy Skin */}
                {showForm && (
                    <button type="button" onClick={handleClick} className="text-appointment-btn">Check Stage</button>
                )}
            </div>
            {/* Add your image section here if needed */}
        </div>
    );
};

export default ImageUpload;
