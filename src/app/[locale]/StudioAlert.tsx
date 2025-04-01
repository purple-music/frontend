"use client";

import { useQuery } from "@tanstack/react-query";

const fetchStudios = async () => {
  const response = await fetch("http://localhost:3000/studios");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const StudioAlert = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["studios"],
    queryFn: fetchStudios,
  });

  const handleClick = () => {
    if (error) {
      alert("Error fetching studios: " + error.message);
    } else if (data) {
      alert("Studios: " + JSON.stringify(data, null, 2));
    }
  };

  return (
    <div>
      <h1>Welcome to the Studio Booking App</h1>
      <button onClick={handleClick}>
        {isLoading ? "Loading..." : "Get Studios"}
      </button>
    </div>
  );
};
