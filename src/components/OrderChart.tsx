import React, { useContext } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { OrderContext } from "../context/OrderContext";

const NUMBER_OF_MONTHS = 3;

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Number of orders last 3 months",
    },
  },
};

const OrderChart = () => {
  const { orderState } = useContext(OrderContext);
  const orderDates = orderState.orderList.map((order) => order.date);
  // comments just for review, will be removed later
  const countOrdersByMonth = () => {
    // this function is to count the number of orders in the recent 3 months from now
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const months = []; // Array to store month names
    const orderCounts = []; // Array to store order counts

    // Loop for three months starting from the current month
    for (let i = 0; i < NUMBER_OF_MONTHS; i++) {
      const monthIndex = (currentMonth - i + 12) % 12; // Calculate the month index with proper wrapping (12 equal to 12 months)
      const monthName = new Intl.DateTimeFormat("en-US", {
        month: "long",
      }).format(new Date(currentDate.getFullYear(), monthIndex));
      months.unshift(monthName); // Add the month name to the beginning of the array

      // Filter orders based on month and count the number of orders
      const count = orderDates.filter((date) => {
        const orderMonth = new Date(date).getMonth();
        return orderMonth === monthIndex;
      }).length;
      orderCounts.unshift(count); // Add the order count to the beginning of the array
    }

    return { months: months, counts: orderCounts };
  };

  const { months, counts } = countOrdersByMonth();

  const data = {
    labels: months,
    datasets: [
      {
        label: "Number of Orders",
        data: counts,
        backgroundColor: "rgba(75,192,192,0.6)",
      },
    ],
  };

  return (
    <div className="h-full w-full">
      <Bar data={data} options={options} />
    </div>
  );
};

export default OrderChart;
