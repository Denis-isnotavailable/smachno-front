import '../styles/globals.scss';
import { ReactNode } from 'react';
import { Footer, Header } from '@/layout';
import { marmelad, montserrat } from '@/styles/fonts';
import { ReduxProvider } from '@/store/provider';
import { GoogleAnalytics } from '@next/third-parties/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const GA_TAG = process.env.GA_TAG || '';
const IS_HIDDEN_FROM_SEARCH_ENGINES = process.env.IS_HIDDEN_FROM_SEARCH_ENGINES || false;

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang='en'>
            <head>
                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://batatfarm.com/" />
                <meta property="og:title" content="Смачно на селі" />
                <meta property="og:description" content="Домашня городина з Полтавщини. 🍅🥕🌽🍉🍈🍠 Смачні сорти, стиглі плоди. Все для своїх. 😇🙏❤️ Смачно! як в дитинстві" />
                <meta property="og:image" content="https://res.cloudinary.com/dri4ndedq/image/upload/v1723138529/d4te9xh2dbcbcgu8ttsw.png" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://batatfarm.com/" />
                <meta property="twitter:title" content="Смачно на селі" />
                <meta property="twitter:description" content="Домашня городина з Полтавщини. 🍅🥕🌽🍉🍈🍠 Смачні сорти, стиглі плоди. Все для своїх. 😇🙏❤️ Смачно! як в дитинстві" />
                <meta property="twitter:image" content="https://res.cloudinary.com/dri4ndedq/image/upload/v1723138529/d4te9xh2dbcbcgu8ttsw.png" />
                
                <link rel='icon' type='image/svg+xml' href='/assets/favicon/favicon.svg' />
                {IS_HIDDEN_FROM_SEARCH_ENGINES && <meta name='robots' content='noindex,nofollow' />}
                <link
                    rel='apple-touch-icon'
                    href='/assets/favicon/favicon.png'
                    type='image/svg+xml'
                />
                <link rel='icon' href='/assets/favicon/favicon.ico' />
            </head>

            <body className={`${marmelad.variable} ${montserrat.variable}`}>
                <GoogleOAuthProvider clientId='774305473034-uit2q78em9gl8acckf6m5udkv12i01gl.apps.googleusercontent.com'>
                    <ReduxProvider>
                        <ToastContainer autoClose={4000} />
                        <Header />
                        {children}
                        <Footer />
                        <div id='modal-root'></div>
                    </ReduxProvider>
                </GoogleOAuthProvider>
            </body>

            <GoogleAnalytics gaId={GA_TAG} />
        </html>
    );
}
