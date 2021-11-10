import React, { useEffect, useState } from "react";

export interface LoadingProps<T> {
  promise?: Promise<T>;
  children: (value?: T) => React.ReactNode;
}

export default function Loader<T>(props: LoadingProps<T>) {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [value, setValue] = useState<T>();

  useEffect(() => {
    if (props.promise !== undefined) {
      setIsLoading(true);
      setErrorMessage(null);

      props.promise
        .then((response) => {
          setValue(response);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setErrorMessage(err.toString());
          setIsLoading(false);
        });
    }
  }, [props.promise]);

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  return isLoading ? (
    <img
      width={200}
      src="https://www.grandecoreia.com.br/assets/img/ajax-loader_big.gif"
      alt="loader"
    />
  ) : (
    <>{errorMessage || props.children(value)}</>
  );
}
