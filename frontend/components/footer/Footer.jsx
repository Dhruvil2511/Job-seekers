import { FaSquareXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";



const Footer = () => {
  return ( 
  <div className="
  border-t-[1px]

  
  ">
     <div className=" flex justify-end p-4">
      <div className="px-4">
          <div className="flex flex-row cursor-pointer text-xl gap-8">
           <FaSquareXTwitter />
            <FaGithub />
            <FaSquareFacebook />
            <FaLinkedin />
          </div>
      </div>

     </div>
  </div>  );
}

export default Footer;