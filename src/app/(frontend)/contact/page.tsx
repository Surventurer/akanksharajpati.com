import { fetchContactPage } from '@/lib/cms';
import ContactClient from './ContactClient';

// Force dynamic rendering to always fetch fresh CMS data
export const dynamic = 'force-dynamic'

export const metadata = {
    title: 'Contact | Akanksha Rajpati',
    description: 'Get in touch with me for collaborations, questions, or just to say hello.',
};

export default async function ContactPage() {
    const data = await fetchContactPage();

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-900">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4 text-white">Contact</h1>
                    <p className="text-stone-400">Page content is being configured. Please check back later.</p>
                </div>
            </div>
        );
    }

    // Serialize the data to ensure it's safe to pass to Client Component
    const serializedData = JSON.parse(JSON.stringify(data));

    return <ContactClient data={serializedData} />;
}