import { Loader } from 'lucide-react'

export default function LoadingCard() {
  return (
    <div className='border p-4 text-center flex flex-col items-center justify-center space-y-2'>
        <Loader className='animate-spin' />
        <h1>Cargando posts...</h1>
        <p className='text-muted-foreground'>Por favor, espera mientras se cargan los posts.</p>
    </div>
  )
}
