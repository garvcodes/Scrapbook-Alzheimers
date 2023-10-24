import Feed from '@components/Feed'

const Home = () => {
  return (
    <section className = "w-full flex-center flex-col">
      <h1 className = "head_text text-center">
        Get rid of your gross ass nailfungus today
        <br className = "max-md:hidden" />
        <span className = "orange_gradient text-center">Cream for that fungus</span>
      </h1>
      <p className = "desc text-center">
        NailFungus is going to deplaque your nails boy
      </p>

      <Feed />

    </section>
  )
}

export default Home