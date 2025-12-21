import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface BreadcrumbItem {
    label: string;
    path: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
    // Generate Schema
    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://handwrittensignaturegenerator.org"
            },
            ...items.map((item, index) => ({
                "@type": "ListItem",
                "position": index + 2,
                "name": item.label,
                "item": `https://handwrittensignaturegenerator.org${item.path}`
            }))
        ]
    };

    return (
        <nav aria-label="Breadcrumb" className="mb-6 animate-fade-in">
            <Helmet>
                <script type="application/ld+json">{JSON.stringify(schema)}</script>
            </Helmet>
            <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <li>
                    <Link to="/" className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <Home size={14} />
                        <span className="sr-only">Home</span>
                    </Link>
                </li>
                {items.map((item, index) => (
                    <li key={item.path} className="flex items-center gap-2">
                        <ChevronRight size={14} className="text-slate-300" />
                        {index === items.length - 1 ? (
                            <span className="font-medium text-slate-900 dark:text-white truncate max-w-[200px] md:max-w-none" aria-current="page">
                                {item.label}
                            </span>
                        ) : (
                            <Link to={item.path} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                {item.label}
                            </Link>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;