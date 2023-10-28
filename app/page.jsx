import Feed from "@components/Feed";

const Home = () => (
  <section className='w-full flex-center flex-col'>
    <h1 className='head_text text-center'>
      Use Modern AI to 
      <br className='max-md:hidden' />
      <span className='orange_gradient text-center'> Take Back Control from Alzheimers</span>
    </h1>
    <p className='desc text-center'>
      Where your brain falters, we pick up the slack. Live your life and make memories, let us worry about remembering them. 
    </p>

    <Feed />
  </section>
);

export default Home;