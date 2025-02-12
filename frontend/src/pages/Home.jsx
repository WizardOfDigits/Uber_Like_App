import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div
        className="h-screen pt-5 flex flex-col justify-end bg-cover bg-center relative"
        style={{
          backgroundImage: `url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F1.bp.blogspot.com%2F-natOQCwqNmI%2FXt4nHc8mgBI%2FAAAAAAAAHyo%2Fcf8Xw4XR7FkvKS4Q_v6dqje-2OTy10d4gCK4BGAsYHg%2Fs1920%2FAnime%252BSky%252BBackground%252B36.jpg&f=1&nofb=1&ipt=d796682978514872d65fcd53792aea89cb2c31022d3f523dfbc3d8aa55107dc2&ipo=images)`,
        }}
      >
        <img
          className="w-16 absolute left-5 top-5"
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fclipartcraft.com%2Fimages%2Fuber-logo-png-white-7.png&f=1&nofb=1&ipt=95bd7e4dcc98971a1b0333b0527c8310fa5b45b7ae148d3411e8a7717f35807d&ipo=images"
          alt=""
        />
        <div className="bg-white pb-7 py-4 px-4">
          <h2 className="text-3xl font-bold">Get Started with Uber</h2>
          <Link
            to="/login"
            className="flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
