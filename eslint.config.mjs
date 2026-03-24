import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...coreWebVitals,
  ...typescript,
  {
    rules: {
      // Modals intentionally reset state in effects when the open prop changes
      "react-hooks/set-state-in-effect": "off",
    },
  },
];

export default eslintConfig;
