import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../lib/AuthContext";

const Home = () => {
  const [fact, setFact] = useState("");
  const { currentUser } = useAuth();

  // for the request to our backend API. I suggest using ReactQuery. The normal fetch() method is
  // amazing, but it gets tedious when dealing with caching, retries, and so on. ReactQuery takes
  // care of that for us.
  
  useEffect(() => {
    const fetchFact = async () => {
      console.log("called");
      try {
        const token = await currentUser.getIdToken();

        const payloadHeader = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const res = await fetch("http://localhost:8080/data", payloadHeader);
        setFact(await res.text());
      } catch (err) {
        console.log(err);
      }
    };

    fetchFact();
  }, [currentUser]);

  return (
    <div>
      This is a React Firebase Auth template. Below is a fact from a protected route on the server.

      <p>{fact}</p>
      <br />
      <Link to="/profile">Profile</Link>
    </div>
  );
};

export default Home;
