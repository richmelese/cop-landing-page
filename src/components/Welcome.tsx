import Image from "next/image";
import Logo from "./Logo";

export default function Welcome() {
  return (
    <section
      id="welcome"
      className="mx-auto grid w-full max-w-[1200px] items-center gap-16 px-6 py-24 md:grid-cols-2 lg:px-[88px]"
    >
      <div className="relative h-[280px]">
        <Logo className="absolute -top-8 left-[150px] h-[190px] w-[190px] text-8xl text-slate-200" />
        <div className="group absolute top-0 left-0 h-[200px] w-[48%] overflow-hidden shadow-xl sm:h-[280px] sm:w-[190px]">
          <Image
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80"
            alt="Resort pool among palm trees"
            fill
            sizes="300px"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        <div className="group absolute right-0 bottom-0 h-[150px] w-[62%] overflow-hidden shadow-2xl sm:right-auto sm:bottom-auto sm:top-[143px] sm:left-[108px] sm:h-[137px] sm:w-[200px]">
          <Image
            src="https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80"
            alt="White terrace overlooking the sea"
            fill
            sizes="300px"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
      </div>

      <div>
        <span className="block h-0.5 w-11 bg-gold" />
        <p className="mt-5 text-[9px] font-bold tracking-[0.15em] text-navy uppercase">
          Raising comfort to the highest level
        </p>
        <h2 className="mt-2 font-serif text-[26px] text-slate-800">
          Welcome to COP Hotel Resort
        </h2>
        <div className="mt-5 space-y-4 text-[13px] leading-7 md:pl-8">
          <p>
            COP Hotel is the right choice for visitors who are searching for a combination
            of charm and a convenient position from where to explore surroundings.
          </p>
          <p>
            The rooms are arranged on the first, second and third floors. On the top floor, there is
            also a charming terrace or solarium available for the use of guests, from where you can
            enjoy the view.
          </p>
          <a
            href="https://catering.cop32ethiopia.et/hotels"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block rounded-full bg-gold px-7 py-3 text-[9px] font-bold tracking-[0.15em] text-white uppercase shadow-md shadow-gold/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy hover:shadow-lg hover:shadow-navy/30"
          >
            Book Accommodation
          </a>
        </div>
      </div>
    </section>
  );
}
