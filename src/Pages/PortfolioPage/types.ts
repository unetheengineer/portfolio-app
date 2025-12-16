// API Data Types for Portfolio

// API Data Types for Portfolio

export interface HeroData {
    label: string;
    name: string;
    description: string;
    href?: string;
}

export interface SocialLinkData {
    id: string;
    name: string;
    href: string;
    iconType: 'github' | 'mail' | 'linkedin' | 'figma' | 'twitter' | 'instagram' | 'youtube' | 'dribbble';
}

export interface SkillData {
    id: string;
    name: string;
    iconUrl: string;
}

export interface ProjectData {
    id: string;
    title: string;
    description?: string;
    imageUrl: string;
    href?: string;
}

export interface TaglineData {
    text: string;
    gradient?: boolean;
}

export interface BlogData {
    id: string;
    title: string;
    description?: string;
    label: string;
    imageUrl: string;
    href?: string;
}

// Portfolio data for a single language
export interface PortfolioData {
    hero: HeroData;
    socialLinks: SocialLinkData[];
    tagline: TaglineData;
    skills: SkillData[];
    projects: ProjectData[];
    blogs: BlogData[];
}

// API returns data for all languages
export interface LocalizedPortfolioData {
    [key: string]: PortfolioData;
}

// API Response type
export interface ApiResponse<T> {
    data: T;
    success: boolean;
    error?: string;
}
