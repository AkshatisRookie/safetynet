"use client"

import { Pie, PieChart, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { name: "Theft", value: 35, color: "#adfa1d" },
  { name: "Assault", value: 15, color: "#f43f5e" },
  { name: "Vandalism", value: 20, color: "#3b82f6" },
  { name: "Fraud", value: 10, color: "#a855f7" },
  { name: "Suspicious Activity", value: 20, color: "#f59e0b" },
]

export function CrimeFilters() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

