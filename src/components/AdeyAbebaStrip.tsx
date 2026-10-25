import adeyAbebaPattern from "../../public/images/adey-abeba-pattern.png";

export default function AdeyAbebaStrip() {
  return (
    <div className="relative h-11 w-full shadow-[0_2px_6px_rgba(0,0,0,0.15)] md:h-14">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${adeyAbebaPattern.src})`,
          backgroundRepeat: "repeat",
          backgroundSize: "56px 56px",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-cop-mint via-[#f2c230] to-cop-mint" />
      <div className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-cop-mint via-[#f2c230] to-cop-mint" />
    </div>
  );
}
