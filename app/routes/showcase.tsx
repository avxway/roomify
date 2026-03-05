import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { getPublicProjects } from "../../lib/puter.action";
import { Clock, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router";

export default function Showcase() {
    const [projects, setProjects] = useState<DesignItem[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const items = await getPublicProjects();
                setProjects(items);
            } catch (error) {
                console.error("Failed to fetch public projects:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className="home">
            <Navbar />
            
            <section className="hero">
                <div className="announce">
                    <div className="dot">
                        <div className="pulse"></div>
                    </div>
                    <p>Community Showcase</p>
                </div>

                <h1>Discover beautiful spaces created by our community</h1>
                
                <p className="subtitle">
                    Explore architectural projects rendered with Roomify AI. 
                    Get inspired by what others are building.
                </p>
            </section>

            <section className="projects" style={{ marginTop: 0 }}>
                <div className="section-inner">
                    {loading ? (
                        <div className="flex justify-center p-20">
                            <p>Loading projects...</p>
                        </div>
                    ) : projects.length > 0 ? (
                        <div className="projects-grid">
                            {projects.map(({ id, name, renderedImage, sourceImage, timestamp }) => (
                                <div key={id} className="project-card group" onClick={() => navigate(`/visualizer/${id}`)}>
                                    <div className="preview">
                                        <img src={renderedImage || sourceImage} alt={name} />
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
                        <div className="flex flex-col items-center justify-center p-20 text-center">
                            <h3 className="text-xl font-semibold mb-2">No public projects yet</h3>
                            <p className="text-slate-500">Be the first to share your creation with the community!</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
