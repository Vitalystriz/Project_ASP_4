import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [displayName, setDisplayName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [picture, setPicture] = useState(null);
    const [picturePreview, setPicturePreview] = useState(null);
    const [error, setError] = useState('');
    
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const handlePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPicture(file);
            setPicturePreview(URL.createObjectURL(file));
        }
    };

    const validateForm = () => {

       if (!displayName.trim() || !username.trim() || !password || !verifyPassword || !picture) {
            return "All fields are required, including a profile picture.";
        }

        if (username.includes(' ')) {
            return "Username cannot contain spaces.";
        }
        if (password.length < 8) {
            return "Password must be at least 8 characters long.";
        }
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            return "Password must contain a combination of letters and numbers.";
        }
        if (password !== verifyPassword) {
            return "Passwords do not match.";
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            const formData = new FormData();
            formData.append('displayName', displayName);
            formData.append('username', username);
            formData.append('password', password);
            formData.append('picture', picture);

            const response = await fetch('http://localhost:5000/api/users', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                navigate('/login');
            } else {
                const data = await response.json();
                setError(data.message || 'Registration failed. Username might already exist.');
            }
        } catch (err) {
            setError('Network error. Make sure the backend is running on port 5000.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card shadow border-0">
                        <div className="card-body p-4">
                            <h2 className="text-center mb-4 fw-bold">Sign Up for Volt</h2>
                            
                            {error && <div className="alert alert-danger p-2 text-center">{error}</div>}

                            <form onSubmit={handleSubmit}>
                                <div className="text-center mb-4">
                                    <div 
                                        className="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto mb-2"
                                        style={{ width: '100px', height: '100px', cursor: 'pointer', overflow: 'hidden', border: '2px dashed #ccc' }}
                                        onClick={() => fileInputRef.current.click()}
                                    >
                                        {picturePreview ? (
                                            <img src={picturePreview} alt="Profile Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            <span className="text-muted small">Upload<br/>Picture</span>
                                        )}
                                    </div>
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        className="d-none" 
                                        ref={fileInputRef} 
                                        onChange={handlePictureChange} 
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Display Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={displayName}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                        required 
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Username</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required 
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Password <small className="text-muted">(Min 8 chars, letters & numbers)</small></label>
                                    <input 
                                        type="password" 
                                        className="form-control" 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required 
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">Verify Password</label>
                                    <input 
                                        type="password" 
                                        className="form-control" 
                                        value={verifyPassword}
                                        onChange={(e) => setVerifyPassword(e.target.value)}
                                        required 
                                    />
                                </div>

                                <button type="submit" className="btn btn-success w-100 fw-bold py-2">
                                    Create Account
                                </button>
                            </form>

                            <div className="text-center mt-3">
                                <small className="text-muted">
                                    Already have an account? <a href="/login" className="text-decoration-none">Login</a>
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;