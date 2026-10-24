import Image from "next/image";
import addisNight from "../../public/images/addis-night.jpg";
import addisSunset from "../../public/images/addis-sunset.jpg";
import addisView from "../../public/images/addis-view.jpg";

export default function DetailImageCollage() {
  return (
    <div className="relative mx-auto h-[400px] w-full max-w-[340px]">
      <div className="absolute top-0 right-0 aspect-square w-[58%] overflow-hidden rounded-full shadow-xl ring-4 ring-white">
        <Image
          src={addisSunset}
          alt="Addis Ababa at sunset"
          fill
          placeholder="blur"
          sizes="250px"
          className="object-cover"
        />
      </div>
      <div className="absolute bottom-[12%] left-0 aspect-square w-[44%] overflow-hidden rounded-full shadow-xl ring-4 ring-white">
        <Image
          src={addisNight}
          alt="Addis Ababa skyline at night"
          fill
          placeholder="blur"
          sizes="190px"
          className="object-cover"
        />
      </div>
      <div className="absolute right-[4%] bottom-0 aspect-square w-[34%] overflow-hidden rounded-full shadow-xl ring-4 ring-white">
        <Image
          src={addisView}
          alt="View of Addis Ababa"
          fill
          placeholder="blur"
          sizes="140px"
          className="object-cover"
        />
      </div>
    </div>
  );
}
