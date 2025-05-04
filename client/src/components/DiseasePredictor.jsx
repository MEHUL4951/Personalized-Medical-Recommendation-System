import React, { use } from 'react'
import { useState } from 'react'

export const DiseasePredictor = () => {

    const [symptoms, setSymptoms] = useState("")
    const [result, setResult] = useState("")
    const [loading, setLoading] = useState(false)
    const [popupType, setPopupType] = useState(null);
    const handleOpenPopup = (type) => setPopupType(type);
    const handleClosePopup = () => setPopupType(null);
    const handlePredict = async () => {
        try {
            setLoading(true)
            const res = await fetch("http://localhost:5000/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ symptoms })
            })
            const data = await res.json()

            setResult(data)
            setLoading(false)

        } catch (err) {
            console.error(err)
        }
    }


    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Disease Predictor</h1>
            <input
                type="text"
                placeholder="Enter symptoms (comma separated)"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                className="w-full border border-gray-400 rounded px-4 py-2 mb-4"
            />
            <button
                onClick={handlePredict}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Predict
            </button>

            {result && (
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-2">
                        Predicted Disease: {result.Disease}
                    </h2>
                    <p className="mb-4">{result.description}</p>

                    <div className="flex flex-wrap gap-3">
                        {["precautions", "medications", "diet", "workout"].map((type) => (
                            <button
                                key={type}
                                onClick={() => handleOpenPopup(type)}
                                className="bg-green-500 text-white px-4 py-2 rounded capitalize"
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Popup Modal */}
            {popupType && result && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white p-6 rounded-lg w-96 max-h-[70vh] overflow-y-auto">
                        <h3 className="text-lg font-bold mb-3 capitalize">
                            {popupType} for {result.Disease}
                        </h3>
                        <ul className="list-disc ml-5">
                            {result[popupType]?.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                        <button
                            onClick={handleClosePopup}
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
