import { ScrollHeader } from "@/components/ScrollHeader";
import { KickstarterSideIndex } from "@/components/kickstarter/KickstarterSideIndex";
import { KickstarterHero } from "@/components/kickstarter/KickstarterHero";
import { KickstarterStory } from "@/components/kickstarter/KickstarterStory";
import { DoxVideoSection } from "@/components/DoxVideoSection";
import { KickstarterLifestyle } from "@/components/kickstarter/KickstarterLifestyle";
import { KickstarterFeatures } from "@/components/kickstarter/KickstarterFeatures";
import { KickstarterGallery } from "@/components/kickstarter/KickstarterGallery";
import { KickstarterRewards } from "@/components/kickstarter/KickstarterRewards";
import { KickstarterFAQ } from "@/components/kickstarter/KickstarterFAQ";
import { KickstarterFooterCTA } from "@/components/kickstarter/KickstarterFooterCTA";
import { SEO } from "@/components/SEO";

const VellviiKickstarter = () => {
  return (
    <>
      <SEO
        title="Vellvii DOX — Kickstarter Campaign"
        description="Back the world's first biometric luxury storage system. The Vellvii DOX: privacy refined, beautifully crafted, launching on Kickstarter."
      />
      <div className="min-h-screen bg-background">
        <ScrollHeader />
        <KickstarterSideIndex />

        <KickstarterHero />
        <KickstarterStory />

        <div id="video">
          <DoxVideoSection />
        </div>

        <KickstarterLifestyle />
        <KickstarterFeatures />
        <KickstarterGallery />
        <KickstarterRewards />
        <KickstarterFAQ />
        <KickstarterFooterCTA />
      </div>
    </>
  );
};

export default VellviiKickstarter;
