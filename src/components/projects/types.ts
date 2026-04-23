export type ProjectFeature = {
  category: string;
  icon?: string;
  svgIcon?: string;
  items: string[];
};

export type Project = {
  id: number;
  title: string;
  description: string;
  fullDescription?: string;
  tag?: string;
  icon?: string;
  span?: string;
  delay?: string;
  video?: string;
  technologies?: string[];
  features?: ProjectFeature[];
  screenshots?: string[];
  telegramLink?: string;
  repoLink?: string;
  siteLink?: string;
  useCDNImages?: boolean;
  isMinimal?: boolean;
  isLarge?: boolean;
  isArchive?: boolean;
  drawerId?: string;
};
