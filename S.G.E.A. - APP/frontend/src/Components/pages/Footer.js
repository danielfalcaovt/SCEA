import { useEffect, useState } from "react";

export default function Footer() {
  const [copyright, setCopy] = useState();
  function reloadCopyright() {
    const year = new Date().getFullYear();
    setCopy(`Copyright ${year}.`);
  };
  useEffect(()=>{
    reloadCopyright();
  })
  return(
    <footer>
      <div className="copyright">{copyright}</div>
    </footer>
  )
};
