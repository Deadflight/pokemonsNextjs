import Image from 'next/image';
import Link from 'next/Link'
import { useRouter } from 'next/router';

const Pokemon = ({ data }) => {
  //console.log(data)

  //Usarlo si ponemos el fallback a true, pero ya tenemos el blocking asi que se comenta el router
  //const router = useRouter()
  //console.log(router)

  // if(router.isFallback){
  //   return <p>Cargando</p>
  // }
  return (
    <div>
      <h1>{data.name} #{data.id}</h1>
      <Image src={data.sprites.front_default} width={400} height={400} alt={data.name}/>
      <Link href="/">Volver al Inicio</Link>
    </div>
  )
}

export default Pokemon

export const getStaticProps = async ({ params }) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
  const data = await response.json();
  return {
    props: {
      data
    }
  }
}

export const getStaticPaths = async () => {

  const paths = [
    { params: { id: '1' } },
    { params: { id: '2' } }
  ]

  return{
    paths,

    //false, si ya tenemos nuestros paths completamente definidos, 
    //true, si son muchas paginas que generar y asi por ejemplo poner un loading,
    //blocking si solo queremos devolverle la pagina una ves el html haya sido generado por Next
    fallback: 'blocking'
  }
}
