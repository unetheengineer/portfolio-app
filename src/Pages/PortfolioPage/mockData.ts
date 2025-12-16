import type { LocalizedPortfolioData } from './types';

// Mock data for development - all languages
export const mockPortfolioData: LocalizedPortfolioData = {
    en: {
        hero: {
            label: 'A Web Developer',
            name: 'Joed Something',
            description: 'a B.Tech IT student passionate about full-stack development, game design, and UI/UX. I enjoy creating interactive experiences and building innovative web applications.',
            href: '#'
        },
        socialLinks: [
            { id: '1', name: 'GitHub', href: 'https://github.com', iconType: 'github' },
            { id: '2', name: 'Mail', href: 'mailto:hello@example.com', iconType: 'mail' },
            { id: '3', name: 'LinkedIn', href: 'https://linkedin.com', iconType: 'linkedin' },
            { id: '4', name: 'Figma', href: 'https://figma.com', iconType: 'figma' },
        ],
        tagline: {
            text: 'Building Skills For Future.',
            gradient: true
        },
        skills: [
            { id: '1', name: 'Express', iconUrl: 'https://cdn.simpleicons.org/express/white' },
            { id: '2', name: 'Firebase', iconUrl: 'https://cdn.simpleicons.org/firebase/FFCA28' },
            { id: '3', name: 'Tailwind', iconUrl: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
            { id: '4', name: 'React', iconUrl: 'https://cdn.simpleicons.org/react/61DAFB' },
            { id: '5', name: 'C#', iconUrl: 'https://cdn.simpleicons.org/csharp/239120' },
            { id: '6', name: 'TypeScript', iconUrl: 'https://cdn.simpleicons.org/typescript/3178C6' },
            { id: '7', name: 'Vite', iconUrl: 'https://cdn.simpleicons.org/vite/646CFF' },
            { id: '8', name: 'HTML5', iconUrl: 'https://cdn.simpleicons.org/html5/E34F26' },
            { id: '9', name: 'CSS3', iconUrl: 'https://cdn.simpleicons.org/css3/1572B6' },
            { id: '10', name: 'JavaScript', iconUrl: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
            { id: '11', name: 'GitHub', iconUrl: 'https://cdn.simpleicons.org/github/white' },
            { id: '12', name: 'Blender', iconUrl: 'https://cdn.simpleicons.org/blender/E87D0D' },
        ],
        projects: [
            {
                id: '1',
                title: 'Meditation Course',
                description: 'A calming meditation app with guided sessions and ambient sounds for mindfulness practice.',
                imageUrl: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=400&h=300&fit=crop',
                href: '#'
            },
            {
                id: '2',
                title: 'Yoga Studio',
                description: 'Online yoga platform featuring live classes and personalized workout plans.',
                imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop',
                href: '#'
            },
        ],
        blogs: [
            {
                id: '1',
                title: 'My First Blog Post',
                description: 'An introduction to my journey in web development.',
                label: 'Blogs',
                imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
                href: '#'
            }
        ]
    },
    tr: {
        hero: {
            label: 'Web Geliştirici',
            name: 'Joed Something',
            description: 'Full-stack geliştirme, oyun tasarımı ve UI/UX konularında tutkulu bir B.Tech BT öğrencisi. Etkileşimli deneyimler oluşturmaktan ve yenilikçi web uygulamaları geliştirmekten keyif alıyorum.',
            href: '#'
        },
        socialLinks: [
            { id: '1', name: 'GitHub', href: 'https://github.com', iconType: 'github' },
            { id: '2', name: 'E-posta', href: 'mailto:hello@example.com', iconType: 'mail' },
            { id: '3', name: 'LinkedIn', href: 'https://linkedin.com', iconType: 'linkedin' },
            { id: '4', name: 'Figma', href: 'https://figma.com', iconType: 'figma' },
        ],
        tagline: {
            text: 'Gelecek İçin Yetenekler İnşa Ediyorum.',
            gradient: true
        },
        skills: [
            { id: '1', name: 'Express', iconUrl: 'https://cdn.simpleicons.org/express/white' },
            { id: '2', name: 'Firebase', iconUrl: 'https://cdn.simpleicons.org/firebase/FFCA28' },
            { id: '3', name: 'Tailwind', iconUrl: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
            { id: '4', name: 'React', iconUrl: 'https://cdn.simpleicons.org/react/61DAFB' },
            { id: '5', name: 'C#', iconUrl: 'https://cdn.simpleicons.org/csharp/239120' },
            { id: '6', name: 'TypeScript', iconUrl: 'https://cdn.simpleicons.org/typescript/3178C6' },
            { id: '7', name: 'Vite', iconUrl: 'https://cdn.simpleicons.org/vite/646CFF' },
            { id: '8', name: 'HTML5', iconUrl: 'https://cdn.simpleicons.org/html5/E34F26' },
            { id: '9', name: 'CSS3', iconUrl: 'https://cdn.simpleicons.org/css3/1572B6' },
            { id: '10', name: 'JavaScript', iconUrl: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
            { id: '11', name: 'GitHub', iconUrl: 'https://cdn.simpleicons.org/github/white' },
            { id: '12', name: 'Blender', iconUrl: 'https://cdn.simpleicons.org/blender/E87D0D' },
        ],
        projects: [
            {
                id: '1',
                title: 'Meditasyon Kursu',
                description: 'Farkındalık pratiği için rehberli seanslar ve ortam sesleri içeren sakinleştirici bir meditasyon uygulaması.',
                imageUrl: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=400&h=300&fit=crop',
                href: '#'
            },
            {
                id: '2',
                title: 'Yoga Stüdyosu',
                description: 'Canlı dersler ve kişiselleştirilmiş antrenman planları sunan online yoga platformu.',
                imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop',
                href: '#'
            },
        ],
        blogs: [
            {
                id: '1',
                title: 'İlk Blog Yazım',
                description: 'Web geliştirme yolculuğuma giriş.',
                label: 'Blog',
                imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
                href: '#'
            }
        ]
    }
};
