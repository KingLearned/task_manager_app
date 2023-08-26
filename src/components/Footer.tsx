import { Logo } from "./useimg"

const Footer = () => {
  return (
    <footer className='relative py-5 mt-10 text-center font-bold text-white border-t-2'>
      <span>Design and Developed by <a href="https://twitter.com/nez_Dking" target="_blanck">Mr. Learned</a> &copy; {new Date().getFullYear()} All rights reserved.</span>
    </footer>
  )
}

export default Footer