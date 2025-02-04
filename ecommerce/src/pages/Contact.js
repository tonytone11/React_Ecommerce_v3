import React, { useState } from 'react';
import '../styling/Contact.css';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';


const Contact = () => {
    // Initialize form data state with empty values for all fields
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        department: '',
        comments: ''
    });

    // Initialize state for storing validation errors
    const [errors, setErrors] = useState({});

    // Handler function for form input changes
    const handleChange = (e) => {
        // Destructure name and value from the event target (input element)
        const { name, value } = e.target;
        // Update form data state, spreading existing data and updating the changed field
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Form validation function
    const validate = () => {
        let formErrors = {};
        // Check if name is empty
        if (!formData.name) formErrors.name = 'Name is required';

        // Check if email is empty and valid format
        if (!formData.email) {
            formErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            /* So in plain English, this regex checks if a string:
            Has some non-whitespace characters
            Followed by an @ symbol
            Followed by more non-whitespace characters
            Followed by a dot
            Followed by more non-whitespace characters */
            // Test email against regex pattern for basic email validation
            formErrors.email = 'Email address is invalid';
        }

        // Check if department is empty
        if (!formData.department) formErrors.department = 'Department is required';

        return formErrors;
    };

    // Form submission handler
    const handleSubmit = (e) => {
        // Prevent default form submission behavior
        e.preventDefault();
        // Validate form and get any errors
        const formErrors = validate();
        // Check if there are any validation errors
        if (Object.keys(formErrors).length === 0) {
            // If no errors, log form data (placeholder for actual submission)
            console.log('Form submitted:', formData);
            // Note: Real form submission logic would go here
        } else {
            // If there are errors, update errors state
            setErrors(formErrors);
        }
    };
    return (
        <>
            <Header />
            <NavBar />
            <main className="contact-container">
                <h1 className='contact-header1'>Contact Us</h1>
                <form id="contact" onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input
                        className="name-container"
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors.name && <p className="error">{errors.name}</p>}

                    <label htmlFor="email">Email:</label>
                    <input
                        className="email-container"
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}

                    <label htmlFor="department">What Do You Need Help With?</label>
                    <select
                        className="department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                    >
                        <option value="" disabled>Select the Department</option>
                        <option value="console">Consoles</option>
                        <option value="controller">Controllers</option>
                        <option value="headset">Headset</option>
                        <option value="pc-accessories">PC Accessories</option>
                    </select>
                    {errors.department && <p className="error">{errors.department}</p>}

                    <label htmlFor="comments">Comments:</label>
                    <textarea
                        id="comments"
                        name="comments"
                        value={formData.comments}
                        onChange={handleChange}
                    ></textarea>

                    <input className="submit-button" type="submit" value="Send" />
                </form>
            </main>
            <Footer />
        </>
    );
};

export default Contact;