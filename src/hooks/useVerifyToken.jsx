// useVerifyToken.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UseVerifyToken() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
     async function verify(){
      try {
       const response= await axios.post('https://booking-hotels-back-end-api.vercel.app/api/Auth/veryfayToken', {},{
          withCredentials: true
        });
            console.log('Token is valid:', response.data.message);

        setLoading(false);
      } catch (error) {
        console.error('Token verification failed:', error.response ? error.response.data.message : error.message);

        try {
          await axios.post('https://booking-hotels-back-end-api.vercel.app/api/Auth/refresh', {}, {
            withCredentials: true
          });

          await axios.post('https://booking-hotels-back-end-api.vercel.app/api/Auth/veryfayToken', {
            withCredentials: true
          });

          setLoading(false);
        } catch (refreshErr) {
          console.error("Refresh failed, redirect to login", refreshErr);
          navigate('/admin/login');
        }
      }
    };

    verify();
  }, [navigate]);

  return { loading };
}
