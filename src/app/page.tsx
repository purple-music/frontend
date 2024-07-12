import Image from "next/image";

function ServiceCard({
  imageSrc,
  altText,
  title,
  description,
}: {
  imageSrc: string;
  altText: string;
  title: string;
  description: string;
}) {
  return (
    <div className="card bg-base-200 shadow-xl">
      <figure>
        <img
          src={imageSrc}
          alt={altText}
          className="h-64 w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <a className="btn btn-primary">Learn More</a>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/*TODO: remove extra div*/}
      <div
        className="flex min-h-screen min-w-full flex-col"
        style={{
          backgroundImage:
            "url(https://avatars.mds.yandex.net/get-altay/10830675/2a0000018af9aed91d6ebad7c684dea1929e/XXXL)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <header className="hero h-full min-h-full flex-grow">
          <div className="hero-overlay p-4">
            <nav className="container navbar sticky top-4 z-10 mx-auto rounded-full bg-primary-content bg-opacity-50 backdrop-blur">
              <div className="navbar-start">
                <a className="btn btn-ghost text-xl normal-case">
                  Purple Studio
                </a>
              </div>
              <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal">
                  <li>
                    <a>Home</a>
                  </li>
                  <li>
                    <a>About</a>
                  </li>
                  <li>
                    <a>Services</a>
                  </li>
                  <li>
                    <a>Contact</a>
                  </li>
                </ul>
              </div>
              <div className="navbar-end">
                <a className="btn btn-primary rounded-full">+7(922)123-12-12</a>
              </div>
            </nav>
          </div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
              <p className="mb-5">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>
              <button className="btn btn-primary">Get Started</button>
            </div>
          </div>
        </header>
      </div>

      {/* Main Content */}
      <main className="flex-grow bg-base-100">
        <div className="container mx-auto px-4 py-12 md:px-0">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-4">
            <ServiceCard
              imageSrc="https://avatars.mds.yandex.net/get-altay/10830675/2a0000018af9aed91d6ebad7c684dea1929e/XXXL"
              altText="Blue"
              title="Blue"
              description="State-of-the-art recording facilities to capture your sound."
            />
            <ServiceCard
              imageSrc="https://avatars.mds.yandex.net/get-altay/10830675/2a0000018af9aed91d6ebad7c684dea1929e/XXXL"
              altText="Orange"
              title="Orange"
              description="State-of-the-art recording facilities to capture your sound."
            />
            <ServiceCard
              imageSrc="https://avatars.mds.yandex.net/get-altay/10830675/2a0000018af9aed91d6ebad7c684dea1929e/XXXL"
              altText="Purple"
              title="Purple"
              description="State-of-the-art recording facilities to capture your sound."
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer footer-center bg-base-200 p-10 text-base-content">
        <div>
          <p>&copy; 2024 Purple Studio. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
