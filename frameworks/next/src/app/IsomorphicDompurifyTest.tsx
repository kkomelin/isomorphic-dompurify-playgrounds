import DOMPurify from "isomorphic-dompurify";

const IsomorphicDompurifyTest = () => {
  return (
    <div>
      {DOMPurify.sanitize(
        `<a onclick="javascript:alert('test')" href="https://next">Test</a>`
      )}
    </div>
  );
};

export default IsomorphicDompurifyTest;
