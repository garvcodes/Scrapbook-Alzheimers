import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {

  const saveToLocalStorage = () => {
    // Get current list of memories from local storage
    const memories = JSON.parse(localStorage.getItem("memories") || "[]");
    memories.push({ prompt: post.prompt, tag: post.tag });
    localStorage.setItem("memories", JSON.stringify(memories));
  };

  const downloadTxtFile = () => {
    const memories = JSON.parse(localStorage.getItem("memories") || "[]");
    const fileContent = memories.map(mem => `Memory: ${mem.prompt}\nTag: ${mem.tag}\n`).join('\n');

    const element = document.createElement("a");
    const file = new Blob([fileContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "/Users/yashjain/Documents/Zoom/myMemories.txt";
    document.body.appendChild(element);
    element.click();
  };

  const enhancedHandleSubmit = (e) => {
    e.preventDefault();
    handleSubmit();
    saveToLocalStorage();
    downloadTxtFile();
  }

  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='orange_gradient'>{type} Memory</span>
      </h1>
      <p className='desc text-left max-w-md'>
        {type} memories within your database to make it available to our AI 
      </p>

      <form
        onSubmit={enhancedHandleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Your Memory
          </span>

          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder='Write your memory here'
            required
            className='form_textarea '
          />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            What is your memory about?{" "}
            <span className='font-normal'>
              (#family, #friends, #life, etc.)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            type='text'
            placeholder='#Tag'
            required
            className='form_input'
          />
        </label>

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className='text-gray-500 text-sm'>
            Cancel
          </Link>

          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
