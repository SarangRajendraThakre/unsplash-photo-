import axios from "axios";
import React, { useEffect, useState } from "react";

const UnsplashImageGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topic, setTopic] = useState("nature"); // Default topic, can be changed

  useEffect(() => {
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
  }, [topic]); // Trigger API call when the topic changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching images!</p>;

  return (
    <div>
      <h1>Unsplash Image Gallery</h1>
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



