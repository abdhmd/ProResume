import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'ProResume | Professional Resume Builder',
        short_name: 'ProResume',
        description: 'Create stunning, professional resumes in minutes with our interactive builder.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#0066ff',
        icons: [
            {
                src: '/icon.png',
                sizes: '512x512',
                type: 'image/png',
            },
            {
                src: '/apple-icon.png',
                sizes: '512x512',
                type: 'image/png',
            },
            {
                src: '/icon.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable',
            },
        ],
    }
}
