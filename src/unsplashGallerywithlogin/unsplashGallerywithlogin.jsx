

import React, { useState, useEffect } from "react";
import { GoogleLogin } from '@react-oauth/google';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "../App.css";

const UnsplashImageGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topic, setTopic] = useState("nature"); // Default topic
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  // Check if the user is already logged in when the component mounts
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setIsLoggedIn(true); // User is logged in
    }
  }, []);

  const handleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential); // Decode the JWT token
    console.log(decoded);
    
    // Store the user data in localStorage for automatic sign-in next time
    localStorage.setItem('user', JSON.stringify(decoded));
    setIsLoggedIn(true); // Set login status to true
  };

  const handleLoginError = () => {
    console.log('Login Failed');
  };

  useEffect(() => {
    if (isLoggedIn) {
      const API_KEY = "1ljAsNkC9uoECNquxw7EAdG4OCUDiqK9mZoLQvME1ps";
      const fetchImages = async () => {
        try {
          const response = await axios.get("https://api.unsplash.com/search/photos", {
            params: {
              client_id: API_KEY,
              query: topic, // Topic-based search
              per_page: 20,
            },
          });
          setImages(response.data.results);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };
      fetchImages();
    }
  }, [topic, isLoggedIn]); // Fetch images only if logged in

  const handleLogout = () => {
    // Clear the user data from localStorage and set login status to false
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <div>
        <h1>Login with Google to access the gallery</h1>
        <div className="custom-google-login">
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
            useOneTap
            theme="filled_blue"
            shape="circle"
            width="50"
          />
        </div>
      </div>
    );
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching images!</p>;

  return (
    <div>
      <h1>Unsplash Image Gallery</h1>
      <button onClick={handleLogout}>Logout</button>
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Search for a topic"
      />
      <div>
        {images.map((image) => (
          <img key={image.id} src={image.urls.small} alt={image.alt_description} />
        ))}
      </div>
    </div>
  );
};

export default UnsplashImageGallery;
