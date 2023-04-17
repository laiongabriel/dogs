import React from "react";

interface Types {
   [key: string]: {
      regex: RegExp;
      errorMessage: string;
   };
}

const types: Types = {
   email: {
      regex: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      errorMessage: "Please enter a valid email.",
   },
   number: {
      regex: /^\d+$/,
      errorMessage: "Please enter numbers only.",
   },
};

const useForm = (type: string) => {
   const [value, setValue] = React.useState("");
   const [error, setError] = React.useState<string | null>(null);

   function validate(value: string) {
      if (value.length === 0) {
         setError("Please fill in a value.");
         return false;
      } else if (types[type] && !types[type].regex.test(value)) {
         setError(types[type].errorMessage);
         return false;
      } else {
         setError(null);
         return true;
      }
   }

   function onChange({ target }: React.ChangeEvent<HTMLInputElement>) {
      setValue(target.value);
      if (error) validate(target.value);
   }

   return {
      value,
      setValue,
      onChange,
      error,
      validate: () => validate(value),
      onBlur: () => validate(value),
   };
};

export default useForm;
