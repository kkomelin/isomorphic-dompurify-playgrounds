import DOMPurify from "isomorphic-dompurify";

const IsomorphicDompurifyTest = () => {
  return (
    <div>
      {DOMPurify.sanitize(`<a onclick="javascript:alert('test')" href="https://github.com/kkomelin/isomorphic-dompurify-playground">Test</a>`)}
    </div>
  );
};

export default IsomorphicDompurifyTest;
