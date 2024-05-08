import React, { useContext, useMemo, useCallback } from "react";
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
import { OrderContext } from "../../context/OrderContext";

const NUMBER_OF_MONTHS = 3; // number of months from now back to past

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

const OrderChart = (): React.ReactElement => {
  const { orderState } = useContext(OrderContext);

  const orderDates = useMemo(() => {
    return orderState.orderList.map((order) => order.createdAt);
  }, [orderState.orderList]);

  const countOrdersByMonth = useCallback(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const months: string[] = [];
    const orderCounts: number[] = [];

    const getMonthName = (monthIndex: number): string => {
      return new Intl.DateTimeFormat("en-US", {
        month: "long",
      }).format(new Date(currentDate.getFullYear(), monthIndex));
    };

    const getOrdersCount = (monthIndex: number): number => {
      return orderDates.filter((date) => {
        const orderMonth = new Date(date).getMonth();
        return orderMonth === monthIndex;
      }).length;
    };

    Array.from({ length: NUMBER_OF_MONTHS }).forEach((_, i) => {
      const monthIndex = (currentMonth - i + 12) % 12;
      const monthName = getMonthName(monthIndex);
      months.unshift(monthName);

      const count = getOrdersCount(monthIndex);
      orderCounts.unshift(count);
    });

    return { months, counts: orderCounts };
  }, [orderDates]);

  const { months, counts } = countOrdersByMonth();

  const data = {
    labels: months,
    datasets: [
      {
        label: "Number of Orders",
        data: counts,
        backgroundColor: "rgba(106, 90, 205, 0.6)",
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
