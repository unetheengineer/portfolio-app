import type { LocalizedPortfolioData } from './types';

// Mock data for development - all languages
export const mockPortfolioData: LocalizedPortfolioData = {
    en: {
        hero: {
            label: 'A Fullstack Developer',
            name: 'Mustafa Fatih HAFIF',
            description: 'As-salamu Alaykum! I am a Computer Engineer and Fullstack Developer specializing in .NET technologies. My focus is not just on making code work, but on ensuring it is clean, sustainable, and aesthetic. I enjoy transforming complex structures into simple solutions. Please feel free to get in touch to learn together or to bring your projects to life!',
            longdescription: "As-salamu Alaykum, Welcome to my Portfolio! I am Mustafa Fatih, a Fullstack Developer aiming to merge the foundations of computer engineering with the dynamics of the modern software world. I primarily focus on the .NET ecosystem and build my projects on this robust framework. For me, software is not just a job; it is a craft. That is why my biggest motivation is to solve complex problems without compromising on Clean Code principles. I constantly research software architectures and strive to ensure that every line of code I write is readable, testable, and scalable. I believe that investing in a project's future, not just its present, is only possible through 'clean code.' Beyond engineering discipline, I am mindful that knowledge grows as it is shared. On this journey, I endeavor to learn something new every day, share what I have learned, and carve out a solid path for myself. If you would like to bring your projects to life or learn together, please do not hesitate to reach out!",
            href: '#'
        },
        socialLinks: [
            { id: '1', name: 'GitHub', href: 'https://github.com/unetheengineer', iconType: 'github' },
            { id: '2', name: 'Mail', href: 'mailto:mfatihhafif27@gmail.com', iconType: 'mail' },
            { id: '3', name: 'LinkedIn', href: 'https://www.linkedin.com/in/mustafa-fatih-hafif/', iconType: 'linkedin' },
            { id: '4', name: 'YouTube', href: 'https://youtube.com', iconType: 'youtube' },
        ],
        tagline: {
            text: 'And that there is not for man except that [good] for which he strives.',
            gradient: true
        },
        skills: [
            { id: '1', name: '.net core', iconUrl: 'https://cdn.simpleicons.org/.net' },
            { id: '2', name: 'C#', iconUrl: 'https://cdn.simpleicons.org/csharp/239120' },
            { id: '3', name: 'Tailwind', iconUrl: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
            { id: '4', name: 'React', iconUrl: 'https://cdn.simpleicons.org/react/61DAFB' },
            { id: '5', name: 'Vite', iconUrl: 'https://cdn.simpleicons.org/vite/646CFF' },
            { id: '6', name: 'TypeScript', iconUrl: 'https://cdn.simpleicons.org/typescript/3178C6' },
            { id: '7', name: 'Firebase', iconUrl: 'https://cdn.simpleicons.org/firebase/FFCA28' },
            { id: '8', name: 'HTML5', iconUrl: 'https://cdn.simpleicons.org/html5/E34F26' },
            { id: '9', name: 'CSS3', iconUrl: 'https://cdn.simpleicons.org/css3/1572B6' },
            { id: '10', name: 'JavaScript', iconUrl: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
            { id: '11', name: 'GitHub', iconUrl: 'https://cdn.simpleicons.org/github/white' },
        ],
        projects: [
            {
                id: '1',
                title: 'Coming Soon...',
                description: 'Coming Soon...',
                imageUrl: 'https://img.freepik.com/free-vector/abstract-grunge-style-coming-soon-with-black-splatter_1017-26690.jpg',
                href: '#'
            },
        ],
        blogs: [
            {
                id: '1',
                title: 'Coming Soon...',
                description: 'Coming Soon...',
                label: 'Blogs',
                imageUrl: 'https://img.freepik.com/free-vector/abstract-grunge-style-coming-soon-with-black-splatter_1017-26690.jpg',
                href: '#'
            }
        ]
    },
    tr: {
        hero: {
            label: 'Fullstack Geliştirici',
            name: 'Mustafa Fatih HAFIF',
            description: 'Selamun Aleyküm! Ben, .NET teknolojileri üzerine uzmanlaşan, kodun sadece çalışmasına değil; temiz, sürdürülebilir ve estetik olmasına odaklanan bir Bilgisayar Mühendisiyim. Karmaşık yapıları sade çözümlere dönüştürmeyi seviyorum. Birlikte öğrenmek yada Projelerinizi birlikte hayata geçirmek için lütfen iletişim kurmaktan çekinmeyin!',
            longdescription: "Selamun Aleyküm, Portfolyoma Hoş Geldin! Ben Mustafa Fatih, bilgisayar mühendisliği temellerini modern yazılım dünyasının dinamikleriyle birleştirmeyi hedefleyen bir Fullstack Developer’ım. Geliştirme sürecinde ağırlıklı olarak .NET ekosistemine odaklanıyor ve projelerimi bu güçlü yapıyla inşa ediyorum. Benim için yazılım; sadece bir iş değil, bir zanaat. Bu yüzden kod yazarken en büyük motivasyonum, karmaşık problemleri Clean Code prensiplerinden ödün vermeden çözmek. Yazılım mimarileri üzerine sürekli araştırmalar yapıyor; yazdığım her satırın okunabilir, test edilebilir ve ölçeklenebilir olması için gayret gösteriyorum. Bir projenin sadece bugününe değil, geleceğine de yatırım yapmanın 'temiz koddan' geçtiğine inanıyorum. Mühendislik disiplininin yanı sıra, öğrenmenin ve bilginin paylaştıkça çoğaldığının bilincindeyim. Bu yolculukta her gün yeni bir şeyler öğrenmeye, öğrendiklerimi paylaşmaya çalışıyor ve kendime sağlam bir yol çizmeye gayret ediyorum. Bu konularda aklınızdaki projeyi hayata geçirmek ya da birlikte öğrenmek isterseniz, bana ulaşmaktan çekinmeyin!",
            href: '#'
        },
        socialLinks: [
            { id: '1', name: 'GitHub', href: 'https://github.com/unetheengineer', iconType: 'github' },
            { id: '2', name: 'E-posta', href: 'mailto:mfatihhafif27@gmail.com', iconType: 'mail' },
            { id: '3', name: 'LinkedIn', href: 'https://www.linkedin.com/in/mustafa-fatih-hafif/', iconType: 'linkedin' },
            { id: '4', name: 'YouTube', href: 'https://youtube.com', iconType: 'youtube' },
        ],
        tagline: {
            text: 'İnsan için yalnız kendi çalıştığının karşılığı vardır.',
            gradient: true
        },
        skills: [
            { id: '1', name: '.net', iconUrl: 'https://cdn.simpleicons.org/.net' },
            { id: '2', name: 'C#', iconUrl: 'https://cdn.simpleicons.org/csharp/239120' },
            { id: '3', name: 'Tailwind', iconUrl: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
            { id: '4', name: 'React', iconUrl: 'https://cdn.simpleicons.org/react/61DAFB' },
            { id: '5', name: 'Vite', iconUrl: 'https://cdn.simpleicons.org/vite/646CFF' },
            { id: '6', name: 'TypeScript', iconUrl: 'https://cdn.simpleicons.org/typescript/3178C6' },
            { id: '7', name: 'Firebase', iconUrl: 'https://cdn.simpleicons.org/firebase/FFCA28' },
            { id: '8', name: 'HTML5', iconUrl: 'https://cdn.simpleicons.org/html5/E34F26' },
            { id: '9', name: 'CSS3', iconUrl: 'https://cdn.simpleicons.org/css3/1572B6' },
            { id: '10', name: 'JavaScript', iconUrl: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
            { id: '11', name: 'GitHub', iconUrl: 'https://cdn.simpleicons.org/github/white' },
        ],
        projects: [
            {
                id: '1',
                title: '',
                description: 'Coming Soon...',
                imageUrl: 'https://img.freepik.com/free-vector/abstract-grunge-style-coming-soon-with-black-splatter_1017-26690.jpg',
                href: '#'
            },
        ],
        blogs: [
            {
                id: '1',
                title: 'Coming Soon...',
                description: 'Coming Soon...',
                label: 'Blog',
                imageUrl: 'https://img.freepik.com/free-vector/abstract-grunge-style-coming-soon-with-black-splatter_1017-26690.jpg',
                href: '#'
            }
        ]
    }
};
