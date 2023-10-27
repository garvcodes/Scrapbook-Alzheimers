import Feed from "@components/Feed";

const Home = () => (
  <section className='w-full flex-center flex-col'>
    <h1 className='head_text text-center'>
      Use Modern AI to 
      <br className='max-md:hidden' />
      <span className='orange_gradient text-center'> Take Back Control from Alzheimers</span>
    </h1>
    <p className='desc text-center'>
      Gone are the days of searching through files manually. Simply upload, then ask Scrapbook to find what you're looking for. 
    </p>

    <Feed />
  </section>
);

export default Home;