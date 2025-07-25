import React from "react";

// This is the card component. Adjust props as needed.
export default function ExperienceCard({
  title,
  company,
  period,
  summary,
  details,
  icon,
  color,
  shape,
}) {
  return (
    <div
      style={{
        background: color || "#fff",
        borderRadius: 16,
        boxShadow: "0 2px 12px rgba(21,82,99,0.08)",
        padding: 20,
        minWidth: 220,
        minHeight: 180,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ fontSize: 32, marginBottom: 8 }}>{icon}</div>
      <div style={{ fontWeight: 700, fontSize: 18, color: "#155263" }}>
        {title}
      </div>
      <div
        style={{
          fontWeight: 500,
          fontSize: 15,
          color: "#333",
          marginBottom: 4,
        }}
      >
        {company}
      </div>
      <div style={{ fontSize: 13, color: "#666", marginBottom: 8 }}>
        {period}
      </div>
      <div style={{ fontSize: 14, color: "#444", marginBottom: 8 }}>
        {summary}
      </div>
      {details && (
        <div style={{ fontSize: 13, color: "#555", opacity: 0.8 }}>
          {details}
        </div>
      )}
    </div>
  );
}
