import { Outlet } from "react-router-dom";

export default function Main() {
  return(
    <main>
      <div>
        <article className="send-area">
            <div>
              <Outlet />
           </div>
        </article>
        <article>
        </article>
      </div>
    </main>
  )
};
