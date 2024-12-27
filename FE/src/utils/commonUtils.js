"use client";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { createTheme } from "@mui/material/styles";
import slugify from "slugify";

export const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handleDebounce = setTimeout(() => setDebounceValue(value), delay);

    return () => clearTimeout(handleDebounce);
  }, [value, delay]);

  return debounceValue;
};

export const convertSlugUrl = (slug) => {
  if (!slug) return "";
  slug = slugify(slug, {
    lower: true,
    locale: "vi",
  });
  return slug;
};

export const generateOrderIdFromUUID = () => {
  const uuid = uuidv4().replace(/-/g, "");
  const orderId = uuid.substring(0, 17).toUpperCase();
  return orderId;
};

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
});

export default generateOrderIdFromUUID;
