import React from "react";

const InfoField = ({ icon, label, value }) => (
  <div className="space-y-1.5">
    <div className="text-sm text-zinc-500 flex items-center gap-2">
      {icon}
      {label}
    </div>
    <p className="px-4 py-2.5 bg-base-100 rounded-lg border border-zinc-600 shadow-inner">
      {value}
    </p>
  </div>
);

export default InfoField;