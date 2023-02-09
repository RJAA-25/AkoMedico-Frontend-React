const Banner = (props) => {
  const { title, imageSrc } = props;
  return (
    <div className="border rounded-lg shadow-lg flex overflow-clip items-center">
      <h1 className="grow px-10 text-2xl sm:text-3xl font-bold">{title}</h1>
      <img src={imageSrc} alt="profile" className="w-36 scale-150" />
    </div>
  );
};

export default Banner;
