import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRef } from "react";

// page where users make posts
// TODO: Down the line, add image uploading instead of just pasting a link
export default function NewPost() {
  const link = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLInputElement>(null);

  const {data: session, status} = useSession();

  const router = useRouter();

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!session) return;
    console.log(session.user);

    if (!link.current || ! description.current) return;

    const enteredLink = link.current.value;
    const enteredDescription = description.current.value;

    if (enteredLink.length === 0) return;

    try {
      const res = await fetch('/api/newPost', {
        method: 'POST',
        body: JSON.stringify({ url: enteredLink, description: enteredDescription, username: session.user.username }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error creating new post");
      }

      // redirect to post on success, use data.insertedId
      router.push(`/posts/${data.insertedId}`);

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