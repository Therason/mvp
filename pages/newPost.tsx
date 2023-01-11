import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRef } from "react";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid gray;
  border-radius: 5px;
  background: rgb(32, 30, 30);
  width: 30vw;
  min-width: 300px;
  height: 70vh;
  padding: 10px 20px;
  margin: 20px 50px;
  height: 70vh;
  display: flex;
  flex-direction: column;
  gap: 10px;

  form {
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
  }

  button {
    margin-top: auto;
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    width: fit-content;
    font-size: 1rem;
    padding: 5px 10px;
  }

  input, textarea {
    background: none;
    border: none;
    border-bottom: 1px solid gray;
    color: inherit;
  }

  input:focus, textarea:focus {
    outline-width: 0;
  }

  textarea {
    width: 100%;
    font-family: inherit;
  }

  button:hover {
    background: #3a3737;
    border-radius: 5px;
  }
`;

// page where users make posts
// TODO: Down the line, add image uploading instead of just pasting a link
export default function NewPost() {
  const link = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLTextAreaElement>(null);

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
    <Container>
      <h1>New Post</h1>
      <form onSubmit={handleSubmit}>
        <label>Paste Image URL
          <input type="text" ref={link} placeholder="URL"></input>
        </label>
        <label>Describe your post
          <textarea ref={description} placeholder="description"></textarea>
        </label>
        <button type="submit">Submit</button>
      </form>
    </Container>
  )
}