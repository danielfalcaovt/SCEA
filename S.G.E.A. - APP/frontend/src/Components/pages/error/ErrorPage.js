import { useRouteError } from "react-router-dom"

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  function upperCase(targetToUpper) {
    return targetToUpper.toUpperCase();
  }

  return(
    <div id="errorPage">
      <i>{`ERROR ${error.status} ${upperCase(error.statusText || error.message)}`}</i>
    </div>
    )
}
