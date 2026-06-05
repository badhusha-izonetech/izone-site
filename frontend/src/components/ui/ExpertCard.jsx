import { motion } from "framer-motion";
import { Github, Linkedin, Instagram } from "lucide-react";
import { useState } from "react";

export default function ExpertCard({ name, role, avatar, bio, image, social = {} }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const imageUrl = image || `https://api.dicebear.com/7.x/personas/svg?seed=${name.replace(/\s/g, "")}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="expert-social-card group relative h-[18rem] w-full text-left"
      style={{ perspective: "1000px" }}
    >
      <div
        className={`expert-social-card-inner ${isFlipped ? "expert-social-card-inner-flipped" : ""}`}
        onClick={() => setIsFlipped(!isFlipped)}
        style={{ cursor: "pointer" }}
      >
        {/* Front Face */}
        <div className="expert-social-face expert-social-face-front">
          <div className="expert-social-background" />

          <div className="expert-social-front-head">
            <div className="expert-social-front-copy">
              <h3 className="expert-social-name">{name}</h3>
              <p className="expert-social-role">{role}</p>
            </div>
            <div className="expert-social-profile-wrap">
              <img src={imageUrl} alt={name} className="expert-social-profile" />
            </div>
          </div>

          <div className="expert-social-layers" aria-hidden="true">
            <div className="expert-social-box expert-social-box-1">
              <a 
                href={social.linkedin || "#"} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="expert-social-icon-wrap"
                onClick={(e) => {
                  if (!social.linkedin) e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <Linkedin className="expert-social-icon" />
              </a>
            </div>
            <div className="expert-social-box expert-social-box-2">
              <a 
                href={social.github || "#"} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="expert-social-icon-wrap"
                onClick={(e) => {
                  if (!social.github) e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <Github className="expert-social-icon" />
              </a>
            </div>
            <div className="expert-social-box expert-social-box-3">
              <a 
                href={social.instagram || "#"} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="expert-social-icon-wrap"
                onClick={(e) => {
                  if (!social.instagram) e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <Instagram className="expert-social-icon" />
              </a>
            </div>
          </div>
        </div>

        {/* Back Face */}
        <div className="expert-social-face expert-social-face-back">
          <div className="expert-social-back-card">
            <div className="expert-social-back-head">
              <div>
                <h3 className="expert-social-name">{name}</h3>
                <p className="expert-social-role">{role}</p>
              </div>
              <div className="expert-social-avatar-badge">{avatar || name.charAt(0)}</div>
            </div>

            <p className="expert-social-bio">{bio || "Passionate professional dedicated to excellence and innovation."}</p>

            <div className="expert-social-links">
              {social.linkedin && (
                <a 
                  href={social.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="expert-social-link-pill"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              )}
              {social.github && (
                <a 
                  href={social.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="expert-social-link-pill"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="h-4 w-4" />
                </a>
              )}
              {social.instagram && (
                <a 
                  href={social.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="expert-social-link-pill"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Instagram className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
