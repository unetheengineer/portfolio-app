import { useState, useEffect } from 'react';
import './PortfolioPage.css';
import { HeroCard } from '../../components/HeroCard';
import { SocialCard } from '../../components/SocialCard';
import { TaglineCard } from '../../components/TaglineCard';
import { SkillsCard } from '../../components/SkillsCard';
import { ProjectCard } from '../../components/ProjectCard';
import { BlogCard } from '../../components/BlogCard';
import { DynamicWallpaper } from '../../components/DynamicWallpaper';
import { Navbar } from '../../components/Navbar';
import { Button } from '../../components/ui/Button';
import { usePortfolioData } from './usePortfolioData';
import { useLanguage } from './LanguageContext';
import { getSocialIcon, SkillIcon } from './icons';
import type { Language } from './i18n';

export interface PortfolioPageProps {
    className?: string;
    defaultLanguage?: Language;
}

// Logo icon for navbar
const LogoIcon = () => (
    <img src="/logo.svg" alt="Logo" width="32" height="32" />
);

export const PortfolioPage = ({
    className = '',
    defaultLanguage = 'en'
}: PortfolioPageProps) => {
    const { language, setLanguage, t } = useLanguage();
    const { data, loading, error } = usePortfolioData(language || defaultLanguage);
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
    const classes = ['portfolio-page', className].filter(Boolean).join(' ');

    // Apply theme to document
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    // Nav items
    const navItems = undefined;

    if (loading) {
        return (
            <div className={classes}>
                <DynamicWallpaper variant="mesh" opacity={0.6} speed={0.5} />
                <Navbar
                    logo={<LogoIcon />}
                    brandName="Portfolio"
                    variant="transparent"
                    showThemeToggle
                    theme={theme}
                    onThemeChange={setTheme}
                    showLanguageSwitcher
                    language={language}
                    onLanguageChange={(lang) => setLanguage(lang as Language)}
                />
                <div className="portfolio-page__loading">Loading...</div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className={classes}>
                <DynamicWallpaper variant="mesh" opacity={0.6} speed={0.5} />
                <Navbar
                    logo={<LogoIcon />}
                    brandName="Portfolio"
                    variant="transparent"
                    showThemeToggle
                    theme={theme}
                    onThemeChange={setTheme}
                    showLanguageSwitcher
                    language={language}
                    onLanguageChange={(lang) => setLanguage(lang as Language)}
                />
                <div className="portfolio-page__error">
                    {error || 'Failed to load portfolio data'}
                </div>
            </div>
        );
    }

    // Transform API data to component format
    const socialLinks = data.socialLinks.map(link => ({
        name: link.name,
        href: link.href,
        icon: getSocialIcon(link.iconType)
    }));

    const skills = data.skills.map(skill => ({
        name: skill.name,
        icon: <SkillIcon url={skill.iconUrl} name={skill.name} />
    }));

    const projects = data.projects.map(project => ({
        title: project.title,
        description: project.description,
        image: project.imageUrl,
        href: project.href
    }));

    const blog = data.blogs[0]; // Use first blog

    return (
        <div className={classes}>
            {/* Background Wallpaper */}
            <DynamicWallpaper variant="mesh" opacity={0.9} speed={0.5} />

            {/* Navbar */}
            <Navbar
                logo={<LogoIcon />}
                brandName={data.hero.name}
                items={navItems}
                variant="transparent"
                showThemeToggle
                theme={theme}
                onThemeChange={setTheme}
                showLanguageSwitcher
                language={language}
                onLanguageChange={(lang) => setLanguage(lang as Language)}
                actions={
                    <a href="#contact" >
                        <Button size="sm" variant="primary">
                            {t.labels.contact}
                        </Button>
                    </a>
                }
            />

            <div className="portfolio-page__grid">
                {/* Row 1 */}
                <div className="portfolio-page__hero">
                    <HeroCard
                        cardVariant="glass"
                        label={data.hero.label}
                        name={data.hero.name}
                        description={data.hero.description}
                        href={data.hero.href}
                    />
                </div>
                <div className="portfolio-page__social">

                    <SocialCard links={socialLinks} columns={2} noContainer cardVariant="glass" />
                </div>
                <div className="portfolio-page__tagline">
                    <TaglineCard
                        cardVariant="gradient"
                        text={data.tagline.text}
                        gradient={data.tagline.gradient}
                    />
                </div>

                {/* Row 2 */}
                <div className="portfolio-page__projects">
                    <ProjectCard
                        cardVariant="gradient"
                        label={t.labels.showcase}
                        title={t.labels.projects}
                        projects={projects}
                        carousel
                        autoRotateInterval={8000}
                        arrowLabel={t.labels.viewAll}
                        href="#"
                    />
                </div>
                <div className="portfolio-page__skills">
                    <SkillsCard
                        cardVariant="glass"
                        label={t.labels.mostUse}
                        title={t.labels.skills}
                        skills={skills}
                        variant="orbital"
                        href="#"
                    />
                </div>
                <div className="portfolio-page__blogs">
                    {blog && (
                        <BlogCard
                            cardVariant="glass"
                            title={blog.title}
                            description={blog.description}
                            label={t.labels.blogs}
                            image={blog.imageUrl}
                            arrowLabel={t.labels.readMore}
                            href={blog.href}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
