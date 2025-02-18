import Link from "next/link";

import { StudioAlert } from "@/app/[locale]/StudioAlert";
import initTranslations from "@/app/i18n";

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

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const awaitedParams = await params;
  const locale = awaitedParams.locale;
  const { t } = await initTranslations(locale, ["index", "common"]);

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
          <div className="hero-overlay">
            <div className="container sticky top-4 z-10 px-4 md:px-0">
              <nav className="navbar rounded-full bg-primary-content bg-opacity-50 backdrop-blur">
                <div className="navbar-start">
                  <a className="btn btn-ghost text-xl normal-case">
                    {t("common:company-name")}
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
                <div className="navbar-end flex flex-row gap-2">
                  <Link className="btn btn-primary rounded-full" href="/my">
                    {t("my-page")}
                  </Link>
                  <StudioAlert></StudioAlert>
                </div>
              </nav>
            </div>
          </div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              {/*<h1 className="mb-5 text-5xl font-bold">{t("index.hello")}</h1>*/}
              {/*<p className="mb-5">{t("index.hello-description")}</p>*/}
              <button className="btn btn-primary">{t("get-started")}</button>
            </div>
          </div>
        </header>
      </div>

      {/* Main Content */}
      <main className="flex-grow bg-base-100 px-4 md:px-0">
        <div className="container mx-auto py-12">
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
          <p>&copy; 2024 Purple Studio. {t("rights")}</p>
        </div>
      </footer>
    </main>
  );
}
