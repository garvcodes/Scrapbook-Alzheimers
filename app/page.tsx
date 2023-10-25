import Feed from '@components/Feed'

const Home = () => {
  return (
    <section className = "w-full flex-center flex-col">
      <h1 className = "head_text text-center">
        Store, Scan, and Remember
        <br className = "max-md:hidden" />
        <span className = "orange_gradient text-center">a Memory Solution for Alzheimers</span>
      </h1>
      <p className = "desc text-center">
        
      </p>

      <Feed />

    </section>
  )
}

export default Home