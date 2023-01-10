// page where users make posts
// TODO: protect this route, maybe through middleware
export default function NewPost() {
  const handleSubmit = async () => {
    try {
      // should only work if user is authenticated
      const res = await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({ message: 'hello!!' }),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Error with POST');
      }
      console.log(data);
    } catch(error) {
      console.error(error)
    }
  }

  // TODO: setup submission form
  return (
    <>
      <h1>New Post</h1>
      <button onClick={handleSubmit}>Submit</button>
    </>
  )
}