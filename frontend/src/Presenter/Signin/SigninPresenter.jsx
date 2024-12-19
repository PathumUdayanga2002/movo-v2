import React from "react";
import sbg from "../../assets/signbg.png";
import simage from "../../assets/simage.png";
const SigninPresenter = () => {
  return (
    <div
      className="min-h-screen font-poppins flex flex-col items-center bg-gray-100 bg-no-repeat w-full"
      style={{
        backgroundImage: `url(${sbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className=" flex items-center justify-center mt-[50px]">
        <div className=" bg-white flex justify-between p-10 w-[1000px] h-[550px] rounded-xl">
          {/* image side */}
          <div className="flex flex-col ">
            <h1 className=" text-4xl font-bold space-y-5 text-orange-500 ">welcome to the <br/> MOVO</h1>
            {/* image */}
            <img className=" h-[400px] w-[400px]" src={simage} alt="image here" />
          </div>
          {/* from side */}
          <div>
            <h1 className=" text-3xl font-semibold">Sign In as a presenter</h1>
            <form className=" mt-5" action="submit">
              <div className="flex flex-col p- gap-3">
                <label htmlFor=""> Id</label>
                <input className=" border-b border-black p-2" type="text" placeholder="enter the id" />
                <label htmlFor=""> Name</label>
                <input className=" border-b border-black p-2" type="text" placeholder="enter the name" />
                <label htmlFor="">Email</label>
                <input className=" border-b border-black p-2" type="text" placeholder="enter the email" />
                <label htmlFor="">Password</label>
                <input className=" border-b border-black p-2" type="text" placeholder="enter the password" />
              </div>
              <button className="px-4 py-2 bg-orange-500 text-white rounded-lg items-center text-center mt-5">
              Sign Up
            </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninPresenter;
