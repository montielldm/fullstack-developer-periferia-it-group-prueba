import Container from '../../components/Container'
import SignInForm from './components/SignInForm'

export default function SignInPage() {
  return (
    <Container>
      <div>
        <div className='space-y-1 mb-4'>
          <div>
            <h1 className='text-2xl font-semibold'>Iniciar Sesión</h1>
            <p className='text-muted-foreground font-light text-sm'>¡Bienvenido de nuevo! Por favor, ingresa tus datos.</p>
          </div>
        </div>
        <SignInForm />
      </div>
    </Container>
  )
}
