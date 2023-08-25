import bgImage from '@/assets/mainbg.jpg';
import Footer from './Footer';
import TopMenu from './TopMenu';



type Props = {
    children: JSX.Element
}
const BodyFramer = ({children}:Props) => {
  return (
    <div className='relative min-h-[100vh] max-h-full w-full'>
      <div className='bg-primary-100/70 h-[100%] w-full absolute'></div>
      <img src={bgImage} className='h-[100%] w-full object-cover absolute -z-10 blur-md' alt="" />

      <div className='relative md:mx-10 mx-3 h-full'>
        <TopMenu/>
        {children}
        <Footer/>
      </div>
    </div>
  )
}

export default BodyFramer