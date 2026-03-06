/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './public/**/*.html'],
    theme: {
        extend: {
            fontSize: {
                xs: ['0.875rem', { lineHeight: '1.25', letterSpacing: '0.02em', fontWeight: '400' }],
                sm: ['1rem', { lineHeight: '1.5', letterSpacing: '0.01em', fontWeight: '400' }],
                base: ['1rem', { lineHeight: '1.5', letterSpacing: '0.01em', fontWeight: '700' }],
                lg: ['1.25rem', { lineHeight: '1.5', letterSpacing: '0.01em', fontWeight: '700' }],
                xl: ['1.5rem', { lineHeight: '1.3', letterSpacing: '0.01em', fontWeight: '700' }],
                '2xl': ['2rem', { lineHeight: '1.2', letterSpacing: '0.01em', fontWeight: '700' }],
                '3xl': ['2.5rem', { lineHeight: '1.1', letterSpacing: '0.01em', fontWeight: '700' }],
                '4xl': ['3rem', { lineHeight: '1.1', letterSpacing: '0.01em', fontWeight: '700' }],
                '5xl': ['3.5rem', { lineHeight: '1.1', letterSpacing: '0.01em', fontWeight: '700' }],
                '6xl': ['4rem', { lineHeight: '1.1', letterSpacing: '0.01em', fontWeight: '700' }],
                '7xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '0.01em', fontWeight: '700' }],
                '8xl': ['5rem', { lineHeight: '1.1', letterSpacing: '0.01em', fontWeight: '700' }],
                '9xl': ['6rem', { lineHeight: '1.1', letterSpacing: '0.01em', fontWeight: '700' }],
                md: ['1.125rem', { lineHeight: '1.5', letterSpacing: '0.01em', fontWeight: '700' }]
            },
            fontFamily: {
                heading: "rubik-v2",
                paragraph: "open sans"
            },
            colors: {
                destructive: '#EF4444',
                'destructive-foreground': '#FFFFFF',
                accent: '#10B981',
                'accent-foreground': '#FFFFFF',
                background: '#F9FAFB',
                secondary: '#4F46E5',
                foreground: '#111827',
                'secondary-foreground': '#FFFFFF',
                'primary-foreground': '#FFFFFF',
                primary: '#2563EB'
            },
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [require('@tailwindcss/container-queries'), require('@tailwindcss/typography')],
}
