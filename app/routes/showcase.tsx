import type { Route } from "./+types/showcase";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Clock, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router";
import { getPublicProjects } from "../../lib/puter.action";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Showcase - Roomify" },
        { name: "description", content: "Explore beautiful spaces created by the Roomify community." },
    ];
}

export default function Showcase() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState<DesignItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPublicProjects = async () => {
            setIsLoading(true);
            try {
                const items = await getPublicProjects();
                setProjects(items);
            } catch (error) {
                console.error("Failed to fetch public projects:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPublicProjects();
    }, []);

    return (
        <div className="home">
            <Navbar />

            <section className="projects showcase-section">
                <div className="section-inner">
                    <div className="section-head">
                        <div className="copy">
                            <h2>Community Showcase</h2>
                            <p>
                                Explore, get inspired, and see what's possible with Roomify AI.
                                All projects here were created and shared by our amazing community.
                            </p>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="loading">
                            <p>Loading amazing designs...</p>
                        </div>
                    ) : projects.length > 0 ? (
                        <div className="projects-grid">
                            {projects.map(({ id, name, renderedImage, sourceImage, timestamp }) => (
                                <div
                                    key={id}
                                    className="project-card group"
                                    onClick={() => navigate(`/visualizer/${id}`)}
                                >
                                    <div className="preview">
                                        <img
                                            src={renderedImage || sourceImage}
                                            alt={name}
                                        />
                                        <div className="badge">
                                            <span>Community</span>
                                        </div>
                                    </div>

                                    <div className="card-body">
                                        <div>
                                            <h3>{name}</h3>
                                            <div className="meta">
                                                <Clock size={12} />
                                                <span>{new Date(timestamp).toLocaleDateString()}</span>
                                                <span>BY ANMOL</span>
                                            </div>
                                        </div>
                                        <div className="arrow">
                                            <ArrowUpRight size={18} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="empty">
                            <h3>No public projects found</h3>
                            <p>Be the first to share your creation with the world!</p>
                            <div className="mt-6">
                                <button onClick={() => navigate('/')} className="cta">
                                    Create a Project
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
