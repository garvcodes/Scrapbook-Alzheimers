import Link from 'next/link'

const Form = ({ type, post, setPost, submitting, handleSubmit  }) => {
  return (
    <section className = "w-full max-w-full flex-start flex-col">
      <h1 className = "head_text text-left">
      <span className = "orange_gradient">{type} Post </span>
      </h1>

      <p className = "desc text-left max-w-md">
        {type} and share amazing prompts with whatever
      </p>

      <form
        onSubmit = {handleSubmit}
        className = "mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorhphism">
          <label>
            <span className = "font-satoshi font-semibold text-base text-gray-700 ">
              Your Memory
            </span>

            <textarea 
              value = {post.prompt}
              onChage = {(e) => setPost({...post, prompt: e.target.value})}
              placeholder = "Write your memory here..."
              required className = "form_textarea"/>
          </label>
        </form>
    </section>

  )
}

export default Form