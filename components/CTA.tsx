import Image from "next/image";
import config from "@/config";
import ButtonSignin from "@/components/ButtonSignin";

const CTA = () => {
  return (
    <section className="relative hero overflow-hidden ">
      {/* <Image
        src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80"
        alt="Background"
        className="object-cover w-full"
        fill
      /> */}
       <div className="relative hero-overlay bg-base-200 "></div>

      <div className="relative hero-content text-center text p-8">
        <div className="flex flex-col items-center max-w-xl p-8 md:p-0">
          <p className="text-lg opacity-90 mb-2 md:mb-4">
            Admins and Employees Sign In
          </p>

          <ButtonSignin extraStyle="btn btn-primary"/> 
         
         </div>
      </div>
    </section>
  );
};

export default CTA;
