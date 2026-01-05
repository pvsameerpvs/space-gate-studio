import { Hero } from "@/components/sections/Hero";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { Different } from "@/components/sections/Different";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Vision } from "@/components/sections/Vision";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";

export default function Page() {
  return (
    <main>
      <Hero />
      <WhoWeAre />
      <Different />
      <Services />
      <Process />
      <Vision />
      <CTA />
      <Footer />
    </main>
  );
}
