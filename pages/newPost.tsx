import { useRef } from "react";

// page where users make posts
// TODO: Down the line, add image uploading instead of just pasting a link
export default function NewPost() {
  const link = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!link.current || ! description.current) return;

    const enteredLink = description.current.value;
    const enteredDescription = description.current.value;

    if (enteredLink.length === 0) return;

    try {
      const res = await fetch('/api/newPost', {
        method: 'POST',
        body: JSON.stringify({ url: enteredLink, description: enteredDescription }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error creating new post");
      }

      // TODO: redirect to post on success
      console.log(data);

    } catch(error) {
      console.error(error);
    }

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