export type AboutPageDict = {
  siteName: string;
  nav: {
    converter: string;
    trending: string;
    about: string;
  };
  about: {
    title: string;
    description: string;
  };
  aboutPage: {
    missionTitle: string;
    missionText: string;
    highlightsTitle: string;
    highlights: string[];
    dataTitle: string;
    dataText: string;
    methodologyTitle: string;
    methodologyPoints: string[];
    disclaimerTitle: string;
    disclaimerText: string;
  };
};

export type AboutPageProps = {
  lang: string;
  dict: AboutPageDict;
};

export type AboutHeroSectionProps = {
  title: string;
  description: string;
};

export type AboutInfoSectionProps = {
  title: string;
  description?: string;
  points?: string[];
  tone?: "default" | "accent";
};
