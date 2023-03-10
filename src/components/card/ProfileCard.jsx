import { computeAge } from "../../helpers/utilities";

const ProfileCard = (props) => {
  const { data } = props;

  return (
    <section className="border rounded-lg overflow-clip">
      <div className="flex flex-col gap-5 p-5 justify-between items-center">
        <div className="w-48 sm:w-60 aspect-square border-8 rounded-full overflow-clip grid place-items-center bg-yellow-500">
          {data.image_url ? (
            <img
              src={data.image_url}
              alt="profile picture"
              className="h-full object-cover"
            />
          ) : (
            <span className="font-black text-7xl sm:text-8xl text-white">
              {data.first_name[0]}
              {data.last_name[0]}
            </span>
          )}
        </div>
        <p className="text-2xl sm:text-3xl font-bold">Overview</p>
      </div>
      <div className="grid sm:grid-cols-2 sm:p-5">
        <div className="p-5 sm:p-10">
          <span className="uppercase tracking-widest text-sm">Full Name</span>
          <p className="my-2 font-bold text-xl sm:text-2xl">
            {data.first_name} {data.last_name}
          </p>
        </div>

        <div className="p-5 sm:p-10">
          <span className="uppercase tracking-widest text-sm">
            Age - Sex - Blood Type
          </span>
          <p className="my-2 font-bold text-xl sm:text-2xl">
            {computeAge(data.birth_date)} - {data.sex} - {data.blood_type}
          </p>
        </div>

        <div className="p-5 sm:p-10">
          <span className="uppercase tracking-widest text-sm">Address</span>
          <p className="my-2 font-bold text-xl sm:text-2xl">{data.address}</p>
        </div>

        <div className="p-5 sm:p-10">
          <span className="uppercase tracking-widest text-sm">Nationality</span>
          <p className="my-2 font-bold text-xl sm:text-2xl">
            {data.nationality}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProfileCard;
