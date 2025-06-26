"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Jan",
    theft: 12,
    assault: 5,
    vandalism: 8,
    fraud: 3,
  },
  {
    name: "Feb",
    theft: 18,
    assault: 7,
    vandalism: 10,
    fraud: 5,
  },
  {
    name: "Mar",
    theft: 15,
    assault: 6,
    vandalism: 12,
    fraud: 8,
  },
  {
    name: "Apr",
    theft: 10,
    assault: 4,
    vandalism: 7,
    fraud: 6,
  },
  {
    name: "May",
    theft: 14,
    assault: 8,
    vandalism: 9,
    fraud: 4,
  },
  {
    name: "Jun",
    theft: 20,
    assault: 10,
    vandalism: 15,
    fraud: 9,
  },
  {
    name: "Jul",
    theft: 18,
    assault: 12,
    vandalism: 17,
    fraud: 7,
  },
]

export function CrimeStatistics() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Bar dataKey="theft" fill="#adfa1d" radius={[4, 4, 0, 0]} />
        <Bar dataKey="assault" fill="#f43f5e" radius={[4, 4, 0, 0]} />
        <Bar dataKey="vandalism" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        <Bar dataKey="fraud" fill="#a855f7" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

