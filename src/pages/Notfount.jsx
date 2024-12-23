import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="w-[100%] h-[100vh] flex justify-center items-center">
      <div className="text-6xl font-mono font-bold">
        <h1>404</h1>
        <h2>Not Found</h2>
        <button
          onClick={goBack}
          className="flex space-x-1 items-center mt-7 px-2.5  py-1.5"
          size="sm"
        >
          <h1 className="text-xl">Go Back</h1>
        </button>
      </div>
    </div>
  );
}

export default NotFound;
