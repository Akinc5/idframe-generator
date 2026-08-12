export const GoaBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden">
      {/* The actual beach photo — full bleed */}
      <img
        src="/sea-beach.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      {/* Warm cream overlay so the content on top stays readable */}
      <div className="absolute inset-0 bg-[#FDF6E3]/55 pointer-events-none"></div>
      {/* Paper texture on top for the scrapbook feel */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/paper.png')` }}
      ></div>
    </div>
  );
};
