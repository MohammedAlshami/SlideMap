// submitFormData.tsx
import uploadToFirestore from "./Firebase";
interface SubmitFormDataProps {
  formData: any; // Type of formData object
}

const submitFormData = async ({ formData }: SubmitFormDataProps) => {
  try {
    const tableName = 'testing';
    const documentId = await uploadToFirestore({ formData, tableName });
    // alert(documentId);
    const response = await fetch("http://127.0.0.1:5000/report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      console.error("Error submitting report");
      // You can throw an error here if needed
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    // You can throw an error here if needed
    return null;
  }
};

export default submitFormData;
