const Loading = ({ isLoading, fullScreen = false }) => {
    if (!isLoading) return null;
  
    return (
      <div
        className={`flex items-center justify-center ${
          fullScreen ? "fixed inset-0 z-50 backdrop-blur-md" : "w-full"
        }`}
      >
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  };
  
  export default Loading;
  