export default function ErrorCard() {
  return (
    <div className='border p-4 text-center flex flex-col items-center justify-center space-y-2'>
        <h1>Error al cargar los posts :( </h1>
        <p className='text-muted-foreground'>Por favor, intenta recargar la página.</p>
    </div>
  )
}
