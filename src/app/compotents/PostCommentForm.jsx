
import { useState } from "react";

const CreateCommentForm = ({ postId }) => {
  const [authorName, setAuthorName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!authorName.trim() || !email.trim() || !comment.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://staging.bhaktiras.in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            mutation AddComment($postId: Int!, $content: String!, $author: String!, $authorEmail: String!) {
              createComment(input: { commentOn: $postId, content: $content, author: $author, authorEmail: $authorEmail }) {
                comment {
                  id
                  content
                }
              }
            }
          `,
          variables: { postId: postId, content: comment, author: authorName, authorEmail: email },
        }),
      });

      const result = await response.json();
      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      setAuthorName("");
      setEmail("");
      setComment("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5">
      <input
        type="text"
        value={authorName}
        onChange={(e) => setAuthorName(e.target.value)}
        placeholder="Your Name"
        required={true}

      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your Email"

      />
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your comment..."

      />
      {error && <p className="text-base text-red-light mb-2">{error}</p>}
      <button type="submit" disabled={!authorName.trim() || !email.trim() || !comment.trim() || loading} className="button fill">
        {loading ? "Submitting..." : "Submit Comment"}
      </button>
    </form>
  );
};

export default CreateCommentForm;