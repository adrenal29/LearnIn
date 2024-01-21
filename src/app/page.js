import Image from 'next/image'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
export default function Home() {
  return (
    <main className="p-4">
      <nav className="flex px-8">
        <h2 className="order-1 md:order-none text-3xl">Learn<span className='text-red-500'>IN</span></h2>
        <div className='flex items-center justify-end ml-auto'>
        <Link href='/Login'><h2 className="hidden md:block ml-8 text-xl text-red-400">Courses</h2></Link>
        <Link href='/Login'><h2 className="hidden md:block ml-8 text-xl text-red-400">Login</h2></Link>
        <Link href='/Register'><h2 className="hidden md:block ml-8 text-xl text-red-400">Register</h2></Link>
        </div>
      </nav>
      <img src="/Hero.png " className='h-80 mx-auto object-cover'></img>
      <h2 className='text-center text-6xl m-4 mt-10'>Welcome to <span className='text-red-500'>LearnIN</span>  </h2>
      <h4 className='text-center text-2xl'>A one stop solution for learning languages according to your skill level</h4>
      <div className='flex justify-center mt-10'>
        <Link className={buttonVariants({ variant: "destructive" })} href='/Login'>Login Now</Link>
      </div>
    </main>
  )
}
