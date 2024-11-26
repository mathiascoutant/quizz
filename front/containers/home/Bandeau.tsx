'use client';

import { useSessionStore } from '@/store/session.store';

export const Bandeau = () => {
    const session = useSessionStore((state) => state.session);

    return (
        session ? null : (
            <div className="bg-purple-600 text-white py-16">
                <div className="container mx-auto px-4 md:px-8 lg:px-16 text-center">
                    <h2 className="text-3xl font-bold mb-6">
                        Prêt à vous régaler de connaissances ?
                    </h2>
                    <p className="text-xl mb-8">
                        Rejoignez QuizzGo dès maintenant et commencez à accumuler des
                        Miams !
                    </p>
                    <button className="bg-white text-purple-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300">
                        S&apos;inscrire gratuitement
                    </button>
                </div>
            </div>
        )
    );
};