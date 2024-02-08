import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: data.labels,
        datasets: [
          {
            data: data.values,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
            ],
          },
        ],
      },
    });

    return () => {
      myChart.destroy();
    };
  }, [data]);

  return (
    <div style={{height:'250px', display:'flex', justifyContent:'center'}}>
      <canvas ref={chartRef} width={400} height={300}></canvas>
    </div>
  );
};

export default PieChart;