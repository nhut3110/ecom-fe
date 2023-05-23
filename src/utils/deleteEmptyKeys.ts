import React from "react";

export const deleteEmptyKeys = (data: object) => {
  return Object.fromEntries(Object.entries(data).filter(([_, v]) => v != ""));
};
