import DOMPurify from "isomorphic-dompurify";

const IsomorphicDompurifyTest = () => {
  return (
    <div>
      {DOMPurify.sanitize(
        `<a onclick="javascript:alert('test')" href="https://react">Test</a>`
      )}
    </div>
  );
};

export default IsomorphicDompurifyTest;
