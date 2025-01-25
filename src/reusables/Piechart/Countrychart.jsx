import React, { useState, useEffect } from 'react';
import {Pie} from 'react-chartjs-2';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import supabase from '../../config/superbaseClient'

ChartJS.register(ArcElement, Tooltip, Legend);

const Countrychart = ({ setuserCount }) => {
  const [countryData, setCountryData] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('country'); 

        if (error) throw error;

        // Counting the occurrences of each country
        const countryCounts = data.reduce((acc, user) => {
          acc[user.country] = (acc[user.country] || 0) + 1;
          return acc;
        }, {});

        setCountryData(countryCounts);
        setuserCount(data.length);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }

    fetchData();
  }, [setuserCount]);

  const chartData = {
    labels: Object.keys(countryData), 
    datasets: [
      {
        data: Object.values(countryData), 
        backgroundColor: Object.keys(countryData).map(
          () => "#" + Math.floor(Math.random() * 16777215).toString(16)
        ), 
        hoverBackgroundColor: Object.keys(countryData).map(
          () => "#" + Math.floor(Math.random() * 16777215).toString(16)
        ), 
      },
    ],
  };

  return (
    <div>
      <Pie data={chartData} />
    </div>
  );
};

export default Countrychart;
