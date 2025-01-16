import React, { useEffect, useState } from "react";
import axios from "axios";

const YouTubeSearch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "https://youtube342.p.rapidapi.com/search",
        params: {
          part: "snippet",
          q: "surfing",
          channelType: "any",
          eventType: "completed",
          safeSearch: "moderate",
          type: "channel",
          videoCaption: "any",
          videoDefinition: "any",
          videoDimension: "2d",
          videoDuration: "short",
          videoEmbeddable: "true",
          videoLicense: "creativeCommon",
          videoPaidProductPlacement: "true",
          videoSyndicated: "true",
          videoType: "episode",
        },
        headers: {
            'x-rapidapi-key': 'd178b8b4bfmshf0f62e88cef6855p17f238jsn75f9547b4a44',
            'x-rapidapi-host': 'youtube342.p.rapidapi.com'
          },
      };

      try {
        const response = await axios.request(options);
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs once on mount

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>YouTube Search Results</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default YouTubeSearch;




