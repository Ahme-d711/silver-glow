import Image from 'next/image'

export default function RightSide() {
  return (
          <div className="h-screen w-1/2 hidden lg:flex object-center justify-center bg-primary rounded-bl-[150px]">
      <div className="flex flex-col items-center justify-center gap-4">

        <Image 
          src="/logo.svg" 
          alt="login image" 
          width={266}
          height={365}
          className="object-contain"
          priority
          />
        <div className="space-y-2">
        <h1 className="text-white text-[40px]">Silver Glow</h1>
        <p className="text-xl text-center text-secondary">Since 2007</p>
        </div>
      </div>
      </div>
  )
}
