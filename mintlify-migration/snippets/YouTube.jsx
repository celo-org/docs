export const YouTube = ({ videoId }) => {
  return (
    <div className="relative w-full flex justify-center">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        className="w-full h-[65vh] max-h-[440px] rounded-lg shadow-lg"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
};
