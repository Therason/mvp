import { useRef } from "react";

// page where users make posts
// TODO: Down the line, add image uploading instead of just pasting a link
export default function NewPost() {
  const link = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault()

  }

  // TODO: setup submission form
  return (
    <>
      <h1>New Post</h1>
      <form onSubmit={handleSubmit}>
        <label>Paste Image URL
          <input type="text" ref={link} placeholder="URL"></input>
        </label>
        <label>Describe your post
          <input type="text" ref={description} placeholder="description"></input>
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  )
}