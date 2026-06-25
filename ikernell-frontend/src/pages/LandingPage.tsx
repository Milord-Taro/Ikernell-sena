import { useState } from "react";

import { Hero } from "../app/components/Hero";
import { StatsBar } from "../app/components/StatsBar";
import { Services } from "../app/components/Services";
import { Lineamientos } from "../app/components/Lineamientos";
import { News } from "../app/components/News";
import { FAQ } from "../app/components/FAQ";
import { LinksInteres } from "../app/components/LinksInteres";
import { Contact } from "../app/components/Contact";
import { Navbar } from "../app/components/Navbar";
import { Footer } from "../app/components/Footer";

import { AuthModal } from "../app/components/AuthModal";

export default function LandingPage() {
  const [mostrarLogin, setMostrarLogin] = useState(false);

  return (
    <>
      <Navbar onSignIn={() => setMostrarLogin(true)} />

      <Hero
        onGetStarted={() =>
          document.querySelector("#contacto")?.scrollIntoView({
            behavior: "smooth",
          })
        }
      />

      <StatsBar />
      <Services />
      <Lineamientos />
      <News />
      <LinksInteres />
      <FAQ />
      <Contact />
      <Footer />
      
      {mostrarLogin && <AuthModal onClose={() => setMostrarLogin(false)} />}
    </>
  );
}
