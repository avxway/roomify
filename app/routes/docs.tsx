import { useEffect, useState, useRef } from "react";
import Navbar from "../../components/Navbar";
import { ChevronDown, ChevronUp, ArrowUp, Menu, X } from "lucide-react";

const sections = [
    {
        id: "getting-started",
        title: "Getting Started",
        content: (
            <div className="space-y-4">
                <p>Roomify is an AI-powered interior design and architectural visualization tool. It allows you to transform your 2D floor plans into realistic 3D-style renders in seconds.</p>
                <h4 className="font-semibold text-slate-900">Supported Formats:</h4>
                <ul className="list-disc pl-5 space-y-1">
                    <li>JPG, PNG</li>
                    <li>Maximum file size: 10MB</li>
                </ul>
                <h4 className="font-semibold text-slate-900">Quick Start:</h4>
                <ol className="list-decimal pl-5 space-y-1">
                    <li>Upload your floor plan image on the home page.</li>
                    <li>Wait for the AI to analyze your plan.</li>
                    <li>View your rendered visualization and share it with the world!</li>
                </ol>
            </div>
        )
    },
    {
        id: "uploading",
        title: "Uploading Your Floor Plan",
        content: (
            <div className="space-y-4">
                <p>For the best results, your upload should be clear and well-defined.</p>
                <h4 className="font-semibold text-slate-900">Best Practices:</h4>
                <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Good Lighting:</strong> Ensure the plan is evenly lit without harsh shadows.</li>
                    <li><strong>Straight Angle:</strong> Take the photo or scan directly from above.</li>
                    <li><strong>Clear Lines:</strong> High-contrast black and white plans work best.</li>
                </ul>
                <h4 className="font-semibold text-slate-900">Common Issues:</h4>
                <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Blurry Images:</strong> AI might misinterpret room boundaries.</li>
                    <li><strong>Skewed Perspective:</strong> Can lead to distorted room proportions.</li>
                    <li><strong>Too Small:</strong> Low resolution makes it hard for the AI to see details.</li>
                </ul>
            </div>
        )
    },
    {
        id: "using-ai",
        title: "Using the AI",
        content: (
            <div className="space-y-4">
                <p>Our AI uses advanced neural networks to understand the spatial layout of your 2D plans.</p>
                <h4 className="font-semibold text-slate-900">How it works:</h4>
                <p>The AI identifies walls, windows, doors, and furniture symbols, then generates a 3D perspective with realistic textures and lighting.</p>
                <h4 className="font-semibold text-slate-900">Tips for Best Output:</h4>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Use standard architectural symbols.</li>
                    <li>Keep the plan clean from excessive handwritten notes.</li>
                    <li>Ensure all room boundaries are closed loops.</li>
                </ul>
            </div>
        )
    },
    {
        id: "exporting",
        title: "Exporting & Sharing",
        content: (
            <div className="space-y-4">
                <h4 className="font-semibold text-slate-900">Exporting:</h4>
                <p>You can save your renders as high-quality JPG or PNG files directly from the visualizer page. PDF export is coming soon for pro plans.</p>
                <h4 className="font-semibold text-slate-900">Sharing:</h4>
                <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Share:</strong> Making a project public generates a unique link and adds it to the Showcase.</li>
                    <li><strong>Unshare:</strong> You can make a project private again at any time from your dashboard.</li>
                    <li><strong>Privacy:</strong> Public links are viewable by anyone with the URL.</li>
                </ul>
            </div>
        )
    },
    {
        id: "faq",
        title: "FAQ",
        content: <FAQ />
    }
];

function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        {
            q: "Is Roomify free to use?",
            a: "Yes! We offer a generous free tier for individuals and hobbyists. For advanced features and commercial use, check out our Pro plans."
        },
        {
            q: "Can I use Roomify for commercial projects?",
            a: "Commercial use is supported on our Pro and Enterprise plans."
        },
        {
            q: "How secure is my data?",
            a: "We take security seriously. Your private projects are only accessible by you, and we use industry-standard encryption."
        },
        {
            q: "What image formats does Roomify support?",
            a: "Currently, we support JPG and PNG files up to 10MB in size."
        },
        {
            q: "Why does my floor plan look different after AI rendering?",
            a: "The AI interprets 2D lines into 3D spaces. Variations can occur based on the clarity of the input and the stylistic choices made by the AI model."
        },
        {
            q: "Can I re-upload and re-render the same project?",
            a: "Absolutely! You can upload the same plan multiple times to get different render variations."
        }
    ];

    return (
        <div className="space-y-3">
            {faqs.map((faq, i) => (
                <div key={i} className="border border-slate-200 rounded-lg overflow-hidden">
                    <button
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
                        onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    >
                        <span className="font-medium text-slate-900">{faq.q}</span>
                        {openIndex === i ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                    </button>
                    {openIndex === i && (
                        <div className="p-4 bg-slate-50 border-t border-slate-200 text-slate-600">
                            {faq.a}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default function DocsPage() {
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 300);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
        setIsSidebarOpen(false);
    };

    return (
        <div className="docs-page min-h-screen bg-[#fdfcfb]">
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-12">
                {/* Mobile Sidebar Toggle */}
                <button 
                    className="md:hidden fixed bottom-6 right-6 z-50 bg-orange-500 text-white p-4 rounded-full shadow-lg"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    {isSidebarOpen ? <X /> : <Menu />}
                </button>

                {/* Sidebar */}
                <aside className={`
                    fixed inset-0 z-40 bg-white md:bg-transparent md:relative md:inset-auto md:z-auto
                    w-full md:w-64 shrink-0 transition-transform duration-300 transform
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                `}>
                    <div className="sticky top-24 p-8 md:p-0">
                        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Documentation</h2>
                        <nav className="space-y-2">
                            {sections.map((s) => (
                                <button
                                    key={s.id}
                                    onClick={() => scrollToSection(s.id)}
                                    className="block w-full text-left px-4 py-2 rounded-lg text-slate-600 hover:bg-orange-50 hover:text-orange-600 transition-colors font-medium"
                                >
                                    {s.title}
                                </button>
                            ))}
                        </nav>
                    </div>
                </aside>

                {/* Content */}
                <main className="flex-1 space-y-16 pb-24">
                    {sections.map((section) => (
                        <section key={section.id} id={section.id} className="scroll-mt-24">
                            <h2 className="text-3xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100">
                                {section.title}
                            </h2>
                            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                                {section.content}
                            </div>
                        </section>
                    ))}
                </main>
            </div>

            {/* Back to top */}
            {showBackToTop && (
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="fixed bottom-24 md:bottom-12 right-6 md:right-12 p-3 bg-white border border-slate-200 rounded-full shadow-md hover:shadow-lg transition-all text-slate-600 hover:text-orange-600 hover:-translate-y-1"
                >
                    <ArrowUp className="w-5 h-5" />
                </button>
            )}
        </div>
    );
}
