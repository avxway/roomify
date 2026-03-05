import React, {type ChangeEvent, type DragEvent, useState, useEffect, useRef} from 'react'
import {useOutletContext} from "react-router";
import {CheckCircle2, ImageIcon, UploadIcon} from "lucide-react";
import {PROGRESS_INTERVAL_MS, PROGRESS_STEP, REDIRECT_DELAY_MS} from "../lib/constants";


interface UploadProps {
    onComplete?: (base64: string) => void;
}

const Upload = ({ onComplete }: UploadProps) => {
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [progress, setProgress] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const { isSignedIn } = useOutletContext<AuthContext>();

    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            intervalRef.current = null;
            timeoutRef.current = null;
        };
    }, []);

    const processFile = (file: File) => {
        if (!isSignedIn) return;

        setFile(file);
        setProgress(0);

        const reader = new FileReader();
        reader.onerror = () => {
            setFile(null);
            setProgress(0);
        }

        reader.onload = (e) => {
            const base64 = e.target?.result as string;
            let currentProgress = 0;

            intervalRef.current = setInterval(() => {
                currentProgress += PROGRESS_STEP;
                setProgress(currentProgress);

                if (currentProgress >= 100) {
                    if (intervalRef.current) clearInterval(intervalRef.current);
                    intervalRef.current = null;

                    timeoutRef.current = setTimeout(() => {
                        if (onComplete) {
                            onComplete(base64);
                        }
                        timeoutRef.current = null;
                    }, REDIRECT_DELAY_MS);
                }
            }, PROGRESS_INTERVAL_MS);
        };

        reader.readAsDataURL(file);
    };

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
        if (!isSignedIn) return;
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        if (!isSignedIn) return;

        const droppedFile = e.dataTransfer.files[0];
        const allowedTypes = ['image/jpeg', 'image/png'];
        if (droppedFile && allowedTypes.includes(droppedFile.type)) {
            processFile(droppedFile);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!isSignedIn) return;

        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            processFile(selectedFile);
        }
    };

    return (
        <div className="upload">
            {
                !file ? (
                    <div
                        className={`dropzone ${isDragging ? 'is-dragging' : ''}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <input
                            type="file" className="drop-input"
                            accept=".jpg,.jpeg,.png,.webp"
                            disabled={!isSignedIn}
                            onChange={handleChange}
                        />

                        <div className="drop-content">
                            <div className="drop-icon">
                                <UploadIcon size={20}/>
                            </div>
                            <p>
                                {isSignedIn ? (
                                    "Click to upload or drag and drop"
                                ) : ("Sign in or Sign up with Puter to upload")}
                            </p>
                            <p className="help">Maximum file size 50 MB</p>
                        </div>
                    </div>
                ) : (
                    <div className="upload-status">
                        <div className="status-content">
                            <div className="status-icon">
                                {progress === 100 ? (
                                    <CheckCircle2 className="check" />
                                ):(
                                    <ImageIcon className="image" />
                                )}
                            </div>

                            <h3>{file.name}</h3>

                            <div className="progress">
                                <div className="bar" style={{width: `${progress}%`}} />

                                <p className="status-text">
                                    {progress < 100 ? 'Analyzing Floor Plan...' : 'Redirecting...'}
                                </p>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
export default Upload
