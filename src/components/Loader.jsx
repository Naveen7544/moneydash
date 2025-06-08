import React from "react";

export default function Loader() {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-emerald-400 border-opacity-50"></div>
    </div>
  );
}
